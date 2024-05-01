require('dotenv').config({ path: `${__dirname}/../.env` });

// Default configuration for database connection
let connectionConfig = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 25
};

// For test environment
if (process.env.NODE_ENV === 'test') {
  connectionConfig = {
    ...connectionConfig,
    port: process.env.TEST_DB_PORT,
    host: process.env.TEST_DB_HOST,
    user: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME
  };
}

const redisConnectionConfig = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  user: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD
};

/**
 * Database configuration.
 */
module.exports = {
  connectionConfig,
  redisConnectionConfig
};
