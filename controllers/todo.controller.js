const Todo = require("../models/todo.model");
const { validationResult } = require("express-validator");

class TodoController {
  getAllTodos(req, res) {
    try {
      const todos = Todo.findAll();
      res.json(todos);
    } catch (error) {
      console.error("Error getting todos:", error);
      res.status(500).json({ error: "Internal server error!" });
    }
  }
  getTodoById(req, res) {
    try {
      const todo = Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: "Todo Not Found!" });
      }
      res.json(todo);
    } catch (error) {
      console.error("Error getting todo:", error);
      res.status(500).json({ error: "Internal server error!" });
    }
  }
  createTodo(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const todo = Todo.create(req.body);
      res.status(201).json(todo);
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({ error: "Internal server error!" });
    }
  }
  updateTodo(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const todo = Todo.update(req.params.id, req.body);
      if (!todo) {
        return res.status(404).json({ error: "Todo Not Found!" });
      }
      res.json(todo);
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ error: "Internal server error!" });
    }
  }
  deleteTodo(req, res) {
    try {
      const deleted = Todo.delete(req.params.id, req.body);
      if (!deleted) {
        return res.status(404).json({ error: "Todo Not Found!" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ error: "Internal server error!" });
    }
  }
}

module.exports = new TodoController();
