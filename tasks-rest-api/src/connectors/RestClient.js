import axios from 'axios';
import RestClientException from '../exceptions/RestClientException';
import { REST_CLIENT_EXCEPTION } from '../exceptions/exceptionCodes';

class RestClient {
  constructor(configs) {
    this.axiosInstance = axios.create(configs);
  }

  async makeRequest(type, url, data, headers, pageNumber, pageSize) {
    let URL = url;
    if (pageNumber && pageSize) {
      URL = `${url}?page=${pageNumber}&page_size=${pageSize}`;
    }
    try {
      return await this.axiosInstance({
        url: URL,
        data,
        method: type,
        headers
      });
    } catch (error) {
      throw new RestClientException(error, REST_CLIENT_EXCEPTION);
    }
  }
}

export default RestClient;
