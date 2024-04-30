import store from '../database/store.js';

export const addTask = (task) => {
  let id = 1;
  if (store.Tasks.length > 0) {
    id = store.Tasks[store.Tasks.length - 1].id + 1;
  }
  task.id = id;
  store.Tasks.push(task);
};

export const getAllTasks = () => {
  return store.Tasks;
};

export const getTaskById = (id) => {
  return store.Tasks.filter((item) => item.id == id).pop();
};

export const deleteTask = (id) => {
  store.Tasks = store.Tasks.filter((task) => {
    return task.id != id;
  });
};

export const editTask = (task, id) => {
  let taskIndex = id - 1;
  store.Tasks[taskIndex] = {
    ...store.Tasks[taskIndex],
    ...task
  };
};
