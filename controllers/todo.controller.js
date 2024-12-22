const Todo = require('../models/todo.model');
const TodoService = require('../services/todo.service');

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = new Todo({
      title,
      description,
      user: req.user.userId,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await TodoService.getTodos(req.query);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTodoStats = async (req, res) => {
  try {
    const stats = await TodoService.getTodoStats(req.user.userId);
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTodo, getTodos, getTodoStats };
