import { InvalidRequestException } from '@aws-sdk/client-secrets-manager';
import {
  addNewTask as addTask,
  editTask,
  getLastTaskId,
  getTaskById,
  getTaskCount,
  getTasks,
  removeTask
} from '../repositories/taskRepository';

export const createTask = async (newTask) => {
  let id = 1;
  if (getTaskCount() > 0) {
    id = getLastTaskId() + 1;
  }
  const task = { ...newTask, id };
  addTask(task);
};

export const fetchTasks = async () => {
  return getTasks();
};

export const fetchTaskById = async (id) => {
  const idInt = parseInt(id, 10);
  return getTaskById(idInt);
};

export const deleteTask = async (id) => {
  const idInt = parseInt(id, 10);
  const task = getTaskById(idInt);
  if (!task) {
    throw new InvalidRequestException(`no task with id ${id}`);
  }
  return removeTask(idInt);
};

export const updateTask = async (task, id) => {
  return editTask(task, id);
};
