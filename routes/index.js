const authRoutes = require('./lib/auth.routes')
const todoRoutes = require('./lib/todo.routes')

module.exports = (app) => {
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/todos', todoRoutes)
}