import httpContext from 'express-http-context';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import compression from 'compression';

import './env';

import routes from './routes';
import logger, { logStream } from './utils/logger';
import correlation from './middlewares/correlation';
import requestContext from './middlewares/requestContext';
import errorLogger from './middlewares/errorLogger';
import errorHandler from './middlewares/errorHandler';
import $404Handler from './middlewares/404Handler';
import initializer from './initializer';

import { APP_HOST, APP_PORT, BASE_URL, IMMEDIATE_LOG_FORMAT, LOG_FORMAT } from './config/configs';
import { HEADERS_TIME_OUT, KEEP_ALIVE_TIME_OUT } from './constants/configConstants';

initializer().then(() => {
  const app = express();

  app.set('port', APP_PORT);
  app.set('host', APP_HOST);
  app.locals.title = process.env.APP_NAME;
  app.locals.version = process.env.APP_VERSION;

  // standard middleware
  app.use(cors());
  app.use(helmet());
  app.use(compression());

  app.use(httpContext.middleware);
  app.use(correlation());

  app.use(requestContext());
  // app.use(tokenHandler());

  app.use(express.json());
  // app.use(express.json({ limit: '50mb' }));

  app.use(
    morgan(IMMEDIATE_LOG_FORMAT, {
      immediate: true,
      stream: logStream,
      skip: (req) => req.originalUrl === '/csm/v1/task-api/health'
    })
  );
  app.use(
    morgan(LOG_FORMAT, {
      stream: logStream,
      skip: (req) => req.originalUrl === '/csm/v1/task-api/health'
    })
  );

  // API Routes
  app.use(BASE_URL, routes);

  // catch 404 and forward to error handler
  app.use($404Handler);

  // error logger
  app.use(errorLogger());

  // error handler
  app.use(errorHandler());

  const server = app.listen(app.get('port'), app.get('host'), () => {
    logger.info(`Server started at http://${app.get('host')}:${app.get('port')}${BASE_URL}`);
  });

  // connection time out and request time out
  server.keepAliveTimeout = KEEP_ALIVE_TIME_OUT; // TEST FOR 502 ISSUE
  server.headersTimeout = HEADERS_TIME_OUT; // TEST FOR 502 ISSUE

  server.on('timeout', (socket) => {
    logger.info(`Timeout reached for connection ${socket._peername.address}:${socket._peername.port}`);
  });

  // Catch unhandled rejections
  process.on('unhandledRejection', (err) => {
    logger.error('Unhandled rejection', err);
    process.exit(1);
  });

  // Catch uncaught exceptions
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception', err);
    process.exit(1);
  });
});
