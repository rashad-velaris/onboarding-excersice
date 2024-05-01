const store = {
  tasks: [
    { id: 1, title: 'hello' },
    { id: 2, title: 'world' },
    { id: 3, title: '!' }
  ]
};

export const getTaskCount = () => {
  return store.length;
};

export const getLastTaskId = () => {
  return store.tasks[store.tasks.length - 1].id;
};

export const addNewTask = (task) => {
  store.tasks.push(task);
};

export const getTasks = () => {
  return store.tasks;
};

export const getTaskById = (id) => {
  return store.tasks.filter((item) => item.id === id).pop();
};

export const removeTask = (id) => {
  store.tasks = store.tasks.filter((task) => {
    return task.id !== id;
  });
};

export const editTask = (task, id) => {
  const taskIndex = id - 1;
  store.tasks[taskIndex] = {
    ...store.tasks[taskIndex],
    ...task
  };
};
