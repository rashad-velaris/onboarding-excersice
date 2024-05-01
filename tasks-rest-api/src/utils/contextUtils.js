import httpContext from 'express-http-context';
import {
  AUTHORIZATION_CONTEXT_KEY,
  CORRELATION_ID_CONTEXT_KEY,
  DB_SCHEMA_SUFFIX,
  USER_DETAILS_CONTEXT_KEY
} from '../constants/configConstants';

export function getUserRoleId() {
  const userDetailsContext = httpContext.get(USER_DETAILS_CONTEXT_KEY);
  return userDetailsContext.user.roleId;
}

export function getUserId() {
  const userDetailsContext = httpContext.get(USER_DETAILS_CONTEXT_KEY);
  return userDetailsContext.user.id;
}

export function getUserRole() {
  const userDetailsContext = httpContext.get(USER_DETAILS_CONTEXT_KEY);
  return userDetailsContext.user.role;
}

export function getUserTenant() {
  const userDetailsContext = httpContext.get(USER_DETAILS_CONTEXT_KEY);
  return userDetailsContext.tenant;
}

export function getAuthorizationToken() {
  return httpContext.get(AUTHORIZATION_CONTEXT_KEY);
}

export function getCorrelationId() {
  return httpContext.get(CORRELATION_ID_CONTEXT_KEY);
}

/**
 * This is only used to identify which db to connect to.
 */
export function getDbIdentifier() {
  const { dbIdentifier } = getUserTenant();
  return dbIdentifier;
}

/**
 * This is used to identify the tenant. Including schema name.
 */
export function getSchemaName() {
  const { tenantIdentifier } = getUserTenant();
  return `${tenantIdentifier}${DB_SCHEMA_SUFFIX}`;
}
