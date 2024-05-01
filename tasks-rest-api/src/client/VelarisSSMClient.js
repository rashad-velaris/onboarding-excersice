import { GetParameterCommand, GetParametersByPathCommand, SSMClient } from '@aws-sdk/client-ssm';
import logger from '../utils/logger';
import { CLUSTER_NAME, ENV, IS_LOCAL } from '../config/configs';
import { connectionConfig, redisConnectionConfig } from '../config/dbConfig';
import { DEFAULT_REGION } from '../constants/configConstants';

class VelarisSSMClient {
  constructor() {
    this.env = ENV;
    this.cluster = CLUSTER_NAME;
    this.ssmClient = new SSMClient({ region: DEFAULT_REGION });
  }

  async getServiceRegistry() {
    try {
      const parameterName = `/csm/${this.env}/${this.cluster}/service-registry`;
      const input = { Name: parameterName };
      const command = new GetParameterCommand(input);
      const {
        Parameter: { Value: serviceRegistry }
      } = await this.ssmClient.send(command);

      return JSON.parse(serviceRegistry);
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to fetch service endpoints.');
    }
  }

  async getDbCredentials(dbIdentifier) {
    try {
      if (IS_LOCAL === '1') {
        return {
          ...connectionConfig,
          name: connectionConfig.database
        };
      }
      const credentialBasePath = `/csm/${this.env}/database/${dbIdentifier}/`;
      const input = { Path: credentialBasePath };
      const command = new GetParametersByPathCommand(input);
      const data = await this.ssmClient.send(command);
      const credentials = {};
      const PARAM_BASE_TO_REMOVE = `${credentialBasePath}db_`;

      data.Parameters.forEach(({ Name, Value }) => {
        credentials[Name.replace(PARAM_BASE_TO_REMOVE, '')] = Value;
      });

      // process data.
      return credentials;
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to fetch db credentials');
    }
  }

  async getRedisCredentials(tenantIdentifier) {
    try {
      if (IS_LOCAL === '1') {
        return {
          ...redisConnectionConfig
        };
      }
      const credentialBasePath = `/csm/${this.env}/redis/${tenantIdentifier}`;
      const input = { Path: credentialBasePath };
      const command = new GetParametersByPathCommand(input);
      const data = await this.ssmClient.send(command);

      if (data.Parameters.length === 0) {
        return null;
      }
      const PARAM_BASE_TO_REMOVE = `${credentialBasePath}/`;

      const credentials = {};

      data.Parameters.forEach(({ Name, Value }) => {
        credentials[Name.replace(PARAM_BASE_TO_REMOVE, '')] = Value;
      });

      // process data.
      return credentials;
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to fetch redis credentials');
    }
  }
}

export default new VelarisSSMClient();
