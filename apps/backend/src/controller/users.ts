import { FastifyRequest } from 'fastify';
import { deps } from '../dependencies';
import { UserUsecase } from '../usecase/userUsecase';

export async function getUsers() {
  const userUsecase = new UserUsecase(deps.userRepository);
  const response = await userUsecase.list();
  return response;
}

export async function createUser(
  req: FastifyRequest<{ Body: { name: string } }>
) {
  const userUsecase = new UserUsecase(deps.userRepository);
  const { name } = req.body;
  const response = await userUsecase.create(name);
  return response;
}

export async function getUser(req: FastifyRequest<{ Params: { id: string } }>) {
  const userUsecase = new UserUsecase(deps.userRepository);
  const { id } = req.params;
  const response = await userUsecase.get(id);
  return response;
}

export async function deleteUser(
  req: FastifyRequest<{ Params: { id: string } }>
) {
  const userUsecase = new UserUsecase(deps.userRepository);
  const { id } = req.params;
  const response = await userUsecase.delete(id);
  return response;
}
