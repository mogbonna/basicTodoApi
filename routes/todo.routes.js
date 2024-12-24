const express = require("express");
const TodoController = require("../controllers/todo.controller");
const TodoValidator = require("../middleware/validators");

const router = express.Router();

router
  .route("/")
  .get(TodoController.getAllTodos)
  .post(TodoValidator.create, TodoController.createTodo);

router
  .route("/:id")
  .get(TodoController.getTodoById)
  .put(TodoValidator.update, TodoController.updateTodo)
  .delete(TodoController.deleteTodo);

module.exports = router;
