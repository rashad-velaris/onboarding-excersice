import RestClient from './RestClient';
import { INTERNAL_ALB_EXCEPTION } from '../exceptions/exceptionCodes';
import RestClientException from '../exceptions/RestClientException';
import { getAuthorizationToken, getCorrelationId } from '../utils/contextUtils';

class InternalALB {
  constructor(_restClient) {
    ['get'].forEach((method) => {
      this[method] = async (url, headers, pageNumber, pageSize, isWithAuthorization = true) => {
        try {
          const _headers = {
            Accept: 'application/json',
            'accept-encoding': 'gzip',
            'correlation-id': getCorrelationId(),
            ...headers
          };
          if (isWithAuthorization && !headers?.authorization) {
            _headers.authorization = getAuthorizationToken();
          }
          return _restClient.makeRequest(method, url, null, _headers, pageNumber, pageSize);
        } catch (error) {
          if (error instanceof RestClientException) {
            error.setErrorCode(INTERNAL_ALB_EXCEPTION);
            throw error;
          }
          throw error;
        }
      };
    });

    ['post', 'put', 'delete', 'patch'].forEach((method) => {
      this[method] = async (url, data, headers, pageNumber, pageSize, isWithAuthorization = true) => {
        try {
          const _headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'accept-encoding': 'gzip',
            'correlation-id': getCorrelationId(),
            ...headers
          };
          if (isWithAuthorization && !headers?.authorization) {
            _headers.authorization = getAuthorizationToken();
          }

          return _restClient.makeRequest(method, url, JSON.stringify(data), _headers, pageNumber, pageSize);
        } catch (error) {
          if (error instanceof RestClientException) {
            error.setErrorCode(INTERNAL_ALB_EXCEPTION);
            throw error;
          }
          throw error;
        }
      };
    });
  }
}

const restClient = new RestClient();
export default new InternalALB(restClient);
