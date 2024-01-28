import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import { createUser, deleteUser, getUser, getUsers } from './controller/users';
import { preHanderAuth } from './controller/common';

export function registerRoutes(server: FastifyInstance) {
  server.addHook('preHandler', preHanderAuth);
  server.register(v1ApiRoutes, { prefix: '/api/v1' });
}

function v1ApiRoutes(
  server: FastifyInstance,
  _: FastifyRegisterOptions<{}>,
  done: (err?: Error) => void
) {
  server.get('/users', getUsers);
  server.get('/users/:id', getUser);
  server.post('/users', createUser);
  server.delete('/users/:id', deleteUser);

  done();
}
