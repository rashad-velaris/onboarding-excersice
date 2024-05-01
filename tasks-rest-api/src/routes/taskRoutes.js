import { Router } from 'express';
import * as taskController from '../controllers/taskController';
import { validateIfTaskExist, validateTask } from '../validators/taskValidator';

const tasksRouter = Router();
tasksRouter.put('/:id', validateIfTaskExist, taskController.updateTask);

tasksRouter.post('/', validateTask, taskController.createTask);

tasksRouter.delete('/:id', validateIfTaskExist, taskController.deleteTask);

tasksRouter.get('/', taskController.getTasks);

tasksRouter.get('/:id', validateIfTaskExist, taskController.getTaskById);

export default tasksRouter;
