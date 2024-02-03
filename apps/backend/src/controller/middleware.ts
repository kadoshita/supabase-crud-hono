import { AuthUsecase } from '../usecase/authUsecase';
import { deps } from '../dependencies';
import { Context, MiddlewareHandler, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';

export const auth: () => MiddlewareHandler =
  () => async (c: Context, next: Next) => {
    if (c.req.method === 'OPTIONS') return await next();

    const authUsecase = new AuthUsecase(deps.authhRepository);
    const authorization = c.req.raw.headers.get('authorization') ?? '';
    if (!authorization) {
      throw new HTTPException(401, {
        message: 'Authorization header is not found',
      });
    }
    const [_, token] = authorization.split(' ');
    const result = await authUsecase.authenticate(token);
    if (!result) {
      throw new HTTPException(401, { message: 'Invalid token' });
    }

    return await next();
  };
