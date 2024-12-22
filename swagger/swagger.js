// swagger.js

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-Do List API',
      version: '1.0.0',
      description: 'A simple API for managing users and todos with authentication and role-based access control.',
      contact: {
        name: 'Your Name',
        email: 'your.email@example.com',
        url: 'https://yourwebsite.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Local development server',
      },
    ],
    paths: {
      '/auth/register': {
        post: {
          summary: 'Register a new user',
          description: 'Create a new user by providing `username`, `email`, and `password`.',
          operationId: 'registerUser',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['username', 'email', 'password'],
                  properties: {
                    username: {
                      type: 'string',
                      example: 'john_doe',
                    },
                    email: {
                      type: 'string',
                      example: 'john.doe@example.com',
                    },
                    password: {
                      type: 'string',
                      example: 'password123',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'User created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'User registered successfully',
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Invalid input or email already in use',
            },
          },
        },
      },
      '/auth/login': {
        post: {
          summary: 'Login an existing user',
          description: 'Authenticate an existing user with `email` and `password`, and get a JWT access token and refresh token.',
          operationId: 'loginUser',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: {
                      type: 'string',
                      example: 'john.doe@example.com',
                    },
                    password: {
                      type: 'string',
                      example: 'password123',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'User logged in successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      accessToken: {
                        type: 'string',
                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                      },
                      refreshToken: {
                        type: 'string',
                        example: 'dGhpc2lzc3ViamVjdC1yZWZyZXNoYXRlZA==',
                      },
                    },
                  },
                },
              },
            },
            '401': {
              description: 'Invalid credentials',
            },
          },
        },
      },
      '/auth/refresh-token': {
        post: {
          summary: 'Refresh the JWT token',
          description: 'Use the refresh token to get a new access token.',
          operationId: 'refreshToken',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['refreshToken'],
                  properties: {
                    refreshToken: {
                      type: 'string',
                      example: 'dGhpc2lzc3ViamVjdC1yZWZyZXNoYXRlZA==',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Token refreshed successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      accessToken: {
                        type: 'string',
                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Invalid refresh token',
            },
          },
        },
      },
      '/todos': {
        post: {
          summary: 'Create a new todo',
          description: 'Create a new todo item with a title, description, and completion status.',
          operationId: 'createTodo',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['title'],
                  properties: {
                    title: {
                      type: 'string',
                      example: 'Finish Documentation',
                    },
                    description: {
                      type: 'string',
                      example: 'Complete the Swagger and Postman documentation for the project.',
                    },
                    completed: {
                      type: 'boolean',
                      example: false,
                    },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Todo created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Todo created successfully',
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Invalid input',
            },
          },
        },
      },
      '/todos/{todoId}': {
        put: {
          summary: 'Update an existing todo',
          description: 'Update the title, description, or completion status of an existing todo.',
          operationId: 'updateTodo',
          parameters: [
            {
              name: 'todoId',
              in: 'path',
              required: true,
              description: 'The ID of the todo item to be updated.',
              schema: {
                type: 'string',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string',
                      example: 'Finish Swagger Docs',
                    },
                    description: {
                      type: 'string',
                      example: 'Complete the API docs and test endpoints.',
                    },
                    completed: {
                      type: 'boolean',
                      example: true,
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Todo updated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Todo updated successfully',
                      },
                    },
                  },
                },
              },
            },
            '404': {
              description: 'Todo not found',
            },
            '400': {
              description: 'Invalid input',
            },
          },
        },
        delete: {
          summary: 'Delete a todo',
          description: 'Delete a specific todo by its ID.',
          operationId: 'deleteTodo',
          parameters: [
            {
              name: 'todoId',
              in: 'path',
              required: true,
              description: 'The ID of the todo item to be deleted.',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Todo deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Todo deleted successfully',
                      },
                    },
                  },
                },
              },
            },
            '404': {
              description: 'Todo not found',
            },
          },
        },
      },
    },
  },
  apis: ['./lib/**/*.js'], // Path to your API routes or controllers for additional documentation
};

const specs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, specs };
