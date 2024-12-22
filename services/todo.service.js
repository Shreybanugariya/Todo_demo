const Todo = require('../models/todo.model');

const getTodos = async ({ page = 1, limit = 10, sort = 'createdAt', filter = {} }) => {
  const todos = await Todo.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ [sort]: 1 });
  return todos;
};

const getTodoStats = async (userId) => {
  const stats = await Todo.aggregate([
    { $match: { user: userId } },
    { $group: { _id: '$completed', count: { $sum: 1 } } },
  ]);
  return stats;
};

module.exports = { getTodos, getTodoStats };
