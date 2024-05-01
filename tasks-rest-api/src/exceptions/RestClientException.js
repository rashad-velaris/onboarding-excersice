export default class RestClientException extends Error {
  constructor(error, errorCode) {
    super(error.toString());
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.stack += `\nCaused By:\n${error.stack}`;
    this.errorCode = errorCode;
    this.errorDetails = {};
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      this.errorDetails.response = {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers
      };
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      this.errorDetails.request = { ...error.request };
    } else {
      /**
       * System Error
       */
      this.errorDetail = {
        address: error.address,
        code: error.code,
        dest: error.dest,
        errno: error.errno,
        info: error.info,
        path: error.path,
        port: error.port,
        syscall: error.syscall
      };
    }
    this.errorDetails.message = error.message;

    this.errorDetails.config = error.config;
  }

  setErrorCode(errorCode) {
    this.errorCode = errorCode;
  }

  getStatus() {
    if (this.errorDetails.response && this.errorDetails.response.status) {
      return this.errorDetails.response.status;
    }
    return -1;
  }

  getFaultCode() {
    if (
      this.errorDetails.response &&
      this.errorDetails.response.data &&
      this.errorDetails.response.data.fault &&
      this.errorDetails.response.data.fault.code
    ) {
      return this.errorDetails.response.data.fault.code;
    }
    return -1;
  }
}
