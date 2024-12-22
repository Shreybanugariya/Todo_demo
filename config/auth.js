module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    JWT_EXPIRY: '1h',
    JWT_REFRESH_EXPIRY: '7d',
  };
  