const express = require('express');
const { createTodo, getTodos, getTodoStats } = require('../../controllers/todo.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const rateLimitMiddleware = require('../../middlewares/ratelimiter.middleware');
const sanitizeMiddleware = require('../../middlewares/sanitize.middleware');
const router = express.Router();

// Apply rate limiting and sanitization to all routes
router.use(rateLimitMiddleware);
router.use(sanitizeMiddleware);

// Todo routes
router.post('/', authMiddleware, createTodo);
router.get('/', authMiddleware, getTodos);
router.get('/stats', authMiddleware, getTodoStats);

module.exports = router;
