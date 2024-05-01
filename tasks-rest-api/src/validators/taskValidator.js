import InvalidRequestException from '../exceptions/InvalidRequestException';
import { fetchTaskById } from '../services/taskService';

export function validateTask(req, res, next) {
  try {
    const { body } = req;
    if (!body.title) {
      next(new InvalidRequestException('title is required', 403));
    }
    if (typeof body.title !== 'string') {
      next(new InvalidRequestException('title must be a string', 403));
    }

    next();
  } catch (err) {
    next(err);
  }
}

export async function validateIfTaskExist(req, res, next) {
  try {
    const { params } = req;
    const id = parseInt(params.id, 10);
    if (!id) {
      next(new InvalidRequestException('id must be a number', 403));
    }
    const task = await fetchTaskById(id);
    if (!task) {
      next(new InvalidRequestException(`there is no task with the id ${id}`, 403));
    }
    next();
  } catch (err) {
    next(err);
  }
}
