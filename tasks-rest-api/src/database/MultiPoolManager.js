import pg from 'pg';
import Sequelize from 'sequelize';
import os from 'os';
import VelarisSSMClient from '../client/VelarisSSMClient';
import logger from '../utils/logger';
import { CLUSTER_NAME, ENV, IS_LOCAL, MS_NAME } from '../config/configs';
import { MASTER_CONNECTION_COUNT, POOL_TYPE, READER_CONNECTION_COUNT } from '../constants/dbConstants';

class MultiPoolManager {
  constructor() {
    logger.info('Initialising empty MultiPool');
    this.multiDbPool = {};
  }

  async getConnectionPool(dbIdentifier, isReader = POOL_TYPE.READ_WRITE_POOL) {
    const poolKey = isReader ? `${dbIdentifier}_reader` : dbIdentifier;

    if (!this.multiDbPool[poolKey]) {
      logger.info(`Creating connection for: ${poolKey}`);
      const dbConfig = await VelarisSSMClient.getDbCredentials(poolKey);
      const { host, name, user, password } = dbConfig;

      // enforce pg to parse timestamps without timezones as UTC
      // https://github.com/sequelize/sequelize/issues/3000
      pg.types.setTypeParser(1114, (str) => new Date(`${str.split(' ').join('T')}Z`));

      this.multiDbPool[poolKey] = new Sequelize(name, user, password, {
        host,
        dialect: 'postgres',
        dialectModule: pg,
        dialectOptions: {
          application_name: IS_LOCAL ? `${os.hostname()}-${MS_NAME}` : `${ENV}-${CLUSTER_NAME}-${MS_NAME}`
        },
        logging: (msg) => logger.debug(msg),
        operatorsAliases: 0,
        pool: {
          max: isReader ? READER_CONNECTION_COUNT.MAX_CONNECTION_COUNT : MASTER_CONNECTION_COUNT.MAX_CONNECTION_COUNT,
          min: isReader ? READER_CONNECTION_COUNT.MIN_CONNECTION_COUNT : MASTER_CONNECTION_COUNT.MIN_CONNECTION_COUNT,
          // acquire: 60000,
          idle: 10000
        }
      });
    }

    return this.multiDbPool[poolKey];
  }

  getAllPools() {
    return this.multiDbPool;
  }
}

export default new MultiPoolManager();
