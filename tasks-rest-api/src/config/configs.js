/**
 * Application Specific Configurations
 */
export const BASE_URL = '/csm/v1/task-api';
export const IMMEDIATE_LOG_FORMAT = '[Start Request] :method :url';
export const LOG_FORMAT = '[End Request] :method :url :status :res[content-length] - :response-time ms';
export const { ENV, ACCOUNT_ID, IS_LOCAL, CLUSTER_NAME, MS_NAME } = process.env;
export const APP_PORT =
  (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';
export const APP_HOST = process.env.APP_HOST || '0.0.0.0';
