import * as taskService from '../services/taskService';
import { appendExceptionStack } from '../utils/exceptionUtils';
import { createResponse, createSuccessResponse } from '../utils/responseGenerator';

/**
 * Example for calling a service method without any parameters
 */
export const getTasks = (req, res, next) => {
  taskService
    .fetchTasks()
    .then((data) => res.json(createSuccessResponse(data)))
    .catch((err) => next(appendExceptionStack(err)));
};

/**
 * Example for passing path parameters to the service method
 */
export const getTaskById = (req, res, next) => {
  taskService
    .fetchTaskById(req.params.id)
    .then((data) => res.json(createSuccessResponse(data)))
    .catch((err) => next(appendExceptionStack(err)));
};

/**
 * Example for passing request body to the service method
 */
export const createTask = (req, res, next) => {
  taskService
    .createTask(req.body)
    .then((_) => res.json(createResponse('successfully created')))
    .catch((err) => next(appendExceptionStack(err)));
};

export const updateTask = (req, res, next) => {
  taskService
    .updateTask(req.body)
    .then((_) => res.json(createResponse('successfully updated')))
    .catch((err) => next(appendExceptionStack(err)));
};

export const deleteTask = (req, res, next) => {
  taskService
    .deleteTask(req.params.id)
    .then((_) => res.json(createResponse('successfully deleted')))
    .catch((err) => next(appendExceptionStack(err)));
};
