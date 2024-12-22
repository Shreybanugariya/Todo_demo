const request = require('supertest');
const app = require('../app');

describe('Auth API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });
});
