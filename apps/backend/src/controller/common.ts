import type { FastifyRequest, FastifyReply } from 'fastify';
import { AuthUsecase } from '../usecase/authUsecase';
import { deps } from '../dependencies';

class ErrorResponse extends Error {
  statusCode: number;
  name: string;

  constructor(message: string) {
    super(message);
    this.statusCode = 500;
    this.name = 'ErrorResponse';
  }
}

export class UnauthorizedError extends ErrorResponse {
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(message: string) {
    super(message);
    this.statusCode = 403;
    this.name = 'ForbiddenError';
  }
}

export const preHanderAuth = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const authUsecase = new AuthUsecase(deps.authhRepository);
  const { authorization } = request.headers;
  if (!authorization) {
    throw new UnauthorizedError('No authorization header');
  }
  const [_, token] = authorization.split(' ');
  const result = await authUsecase.authenticate(token);
  if (!result) {
    throw new UnauthorizedError('Invalid token');
  }

  return;
};
