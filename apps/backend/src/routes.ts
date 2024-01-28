import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import { createUser, deleteUser, getUser, getUsers } from './controller/users';
import { preHanderAuth } from './controller/common';
import { writeFile } from 'fs/promises';

export async function registerRoutes(server: FastifyInstance) {
  if (process.env.NODE_ENV !== 'production') {
    await server.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Supabase CURD',
          description: 'Supabase CURD sample API',
          version: '0.0.1',
        },
        servers: [
          {
            url: 'http://localhost:3000',
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: [
          {
            name: 'user',
            description: 'User related end-points',
          },
        ],
      },
    });
  }

  await server.addHook('preHandler', preHanderAuth);
  await server.register(v1ApiRoutes, { prefix: '/api/v1' });
  await server.ready();
  const docs = await server.swagger();
  await writeFile('docs/openapi.json', JSON.stringify(docs, null, 2), {
    encoding: 'utf-8',
  });
}

function v1ApiRoutes(
  server: FastifyInstance,
  _: FastifyRegisterOptions<{}>,
  done: (err?: Error) => void
) {
  server.get(
    '/users',
    {
      schema: {
        description: 'Get all users',
        tags: ['user'],
        response: {
          200: {
            description: 'Successful response',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
              },
              required: ['id', 'name'],
            },
          },
          401: {
            description: 'Unauthorized',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    getUsers
  );
  server.get(
    '/users/:id',
    {
      schema: {
        description: 'Get user by id',
        tags: ['user'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
            },
            required: ['id', 'name'],
          },
          401: {
            description: 'Unauthorized',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    getUser
  );
  server.post(
    '/users',
    {
      schema: {
        description: 'Create user',
        tags: ['user'],
        body: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
            },
            required: ['id', 'name'],
          },
          401: {
            description: 'Unauthorized',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    createUser
  );
  server.delete(
    '/users/:id',
    {
      schema: {
        description: 'Delete user',
        tags: ['user'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
          },
          401: {
            description: 'Unauthorized',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    deleteUser
  );

  done();
}
