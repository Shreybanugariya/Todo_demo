const sanitizeMiddleware = (req, res, next) => {
    const obj = req.body
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        Object.keys(obj).forEach(key => {
          if (obj[key] === null || obj[key] === undefined || obj[key] === '' || (typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0)) {
            delete obj[key];
          } else if (typeof obj[key] === 'object') {
            sanitizeObject(obj[key]);
          }
        });
      }
    next();
};

module.exports = sanitizeMiddleware