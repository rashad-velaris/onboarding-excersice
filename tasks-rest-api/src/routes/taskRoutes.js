import { Router } from 'express';
import * as taskController from '../controllers/taskController';
import { validateTask } from '../validators/taskValidator';

const tasksRouter = Router();
tasksRouter.put('/:id', taskController.updateTask);

tasksRouter.post('/', validateTask, taskController.createTask);

tasksRouter.delete('/:id', taskController.deleteTask);

tasksRouter.get('/', taskController.getTasks);

tasksRouter.get('/:id', taskController.getTaskById);

export default tasksRouter;
