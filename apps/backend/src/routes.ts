import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { z, OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { auth } from './controller/middleware';
import { deps } from './dependencies';
import { UserUsecase } from './usecase/userUsecase';
import { writeFileSync } from 'fs';
import { HTTPException } from 'hono/http-exception';

const userUsecase = new UserUsecase(deps.userRepository);

const ParamsSchema = z.object({
  id: z.string().openapi({
    param: {
      name: 'id',
      in: 'path',
    },
    format: 'uuid',
    example: '54e1a86f-d786-4f9b-adb6-289cc3d9b17f',
  }),
});

const UserSchema = z
  .object({
    id: z.string().openapi({
      format: 'uuid',
      example: '54e1a86f-d786-4f9b-adb6-289cc3d9b17f',
    }),
    name: z.string().openapi({
      example: 'John Doe',
    }),
  })
  .openapi('User');

const app = new OpenAPIHono();
app.use('/*', logger());
app.use('/*', auth());
app.use('/*', cors());

app.openAPIRegistry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

app
  .openapi(
    createRoute({
      method: 'get',
      path: '/api/v1/users',
      tags: ['user'],
      description: 'Get all users',
      responses: {
        200: {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: UserSchema.array(),
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {},
            },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    }),
    async (c) => {
      const users = await userUsecase.list();
      return c.json(users);
    }
  )
  .openapi(
    createRoute({
      method: 'post',
      path: '/api/v1/users',
      tags: ['user'],
      description: 'Create user',
      request: {
        body: {
          description: 'User name',
          content: {
            'application/json': {
              schema: z.object({
                name: z.string(),
              }),
            },
          },
          required: true,
        },
      },
      responses: {
        200: {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: UserSchema,
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {},
            },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    }),
    async (c) => {
      const body = await c.req.json();
      const user = await userUsecase.create(body.name);
      return c.json(user);
    }
  );

app
  .openapi(
    createRoute({
      method: 'get',
      path: '/api/v1/users/{id}',
      tags: ['user'],
      description: 'Get user by id',
      request: {
        params: ParamsSchema,
      },
      responses: {
        200: {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: UserSchema,
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {},
            },
          },
        },
        404: {
          description: 'Not found',
          content: {
            'application/json': {
              schema: {},
            },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    }),
    async (c) => {
      const user = await userUsecase.get(c.req.param('id'));
      if (user === null) {
        throw new HTTPException(404, { message: 'User Not Found' });
      }

      return c.json(user);
    }
  )
  .openapi(
    createRoute({
      method: 'delete',
      path: '/api/v1/users/{id}',
      tags: ['user'],
      description: 'Delete user',
      request: {
        params: ParamsSchema,
      },
      responses: {
        200: {
          description: 'Successful response',
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {},
            },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    }),
    async (c) => {
      await userUsecase.delete(c.req.param('id'));
      return c.json({});
    }
  );

const docs = app.getOpenAPIDocument({
  openapi: '3.0.3',
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
});
writeFileSync('docs/openapi.json', JSON.stringify(docs, null, 2), {
  encoding: 'utf-8',
});

export default app;
