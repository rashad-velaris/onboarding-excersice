let todo = [
  { id: 1, title: 'Hello', completed: false },
  { id: 2, title: 'Hello', completed: false },
  { id: 3, title: 'Hello', completed: false }
];

todo = todo.filter((t) => t.id !== 2);

console.log(todo.filter((item) => item.id == 3).pop());
