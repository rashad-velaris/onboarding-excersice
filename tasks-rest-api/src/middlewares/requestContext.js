import httpContext from 'express-http-context';

export default function requestContext() {
  return (req, res, next) => {
    let isTest = false;
    if (req.query.isTest === 'true') {
      isTest = true;
    }
    httpContext.set('isTest', isTest);
    next();
  };
}
