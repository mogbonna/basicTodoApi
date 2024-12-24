const { v4: uuidv4 } = require("uuid");

class TodoModel {
  constructor() {
    this.todos = [];
  }
  findAll() {
    return this.todos;
  }
  findById() {
    return this.todos.find((todo) => todo.id === id);
  }
  create(data) {
    const todo = {
      id: uuidv4(),
      title: data.title,
      description: data.description || "",
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.todos.push(todo);
    return todo;
  }
  update(id, data) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;
    const todo = this.todos[index];
    const updatedTodo = {
      ...todo,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.todos[index] = updatedTodo;
    return updatedTodo;
  }
  delete(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;

    this.todos.splice(index, 1);
    return true;
  }
}

module.exports = new TodoModel();
