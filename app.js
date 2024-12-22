const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/index');
const { swaggerUi, specs } = require('./swagger/swagger');
const connectDB = require('./config/db');
const helmet = require('helmet');

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.disable('x-powered-by');
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
app.use(helmet.xssFilter());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(cors());
const setCustomHeaders = (req, res, next) => {
    res.setHeader('X-Custom-Header', 'SecureHeaderValue');
    if (req.url.includes('/api/v1/')) {
      res.setHeader('Cache-Control', 'no-store');
    }
    next();
};
app.use(setCustomHeaders);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
routes(app); 

connectDB();

app.get('/', (req, res) => res.send('ToDo API is up and running!'));

module.exports = app;
