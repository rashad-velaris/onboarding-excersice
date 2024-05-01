import { Router } from 'express';
import { addTask, deleteTask, editTask, getAllTasks, getTaskById } from '../services/taskService.js';
import errorHandler from '../middlewears/errorHandler.js';
import { validateTask } from '../validators/taskValidator.js';

const router = Router();

router.put('/tasks/:id', validateTask, (req, res) => {
  let { body, params } = req;
  editTask(body, params.id);
  res.status(201).json(req.body);
});

router.post('/tasks', validateTask, (req, res) => {
  addTask(req.body);
  res.status(201).json(req.body);
});

router.delete('/tasks/:id', (req, res) => {
  let { params } = req;
  deleteTask(params.id);
  res.status(200).json();
});

router.get('/tasks', (_, res) => {
  res.json(getAllTasks());
});

router.get('/tasks/:id', (req, res) => {
  let { params } = req;
  res.json(getTaskById(params.id));
});

export default router;
