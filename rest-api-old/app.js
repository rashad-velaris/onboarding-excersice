import { Router } from 'express';
import bodyParser from 'body-parser';
import express from 'express';
import tasks from './controllers/tasks.js';
import errorHandler from './middlewears/errorHandler.js';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(5000, () => {
  console.log('server is listening on port 5000');
});

const router = Router();

app.use('/', router);
app.use(errorHandler());
router.use('/api', tasks);
