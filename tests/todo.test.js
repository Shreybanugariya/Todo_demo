const request = require('supertest');
const app = require('../app');

describe('Todo API', () => {
  let accessToken;

  beforeAll(async () => {
    // Register and login to get the token
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });
    accessToken = loginResponse.body.accessToken;
  });

  it('should create a new todo', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Test Todo',
        description: 'Test description',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should fetch todos with pagination', async () => {
    const response = await request(app)
      .get('/api/v1/todos')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, limit: 10 });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
