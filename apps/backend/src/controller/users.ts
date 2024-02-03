import { deps } from '../dependencies';
import { UserUsecase } from '../usecase/userUsecase';

export async function getUsers() {
  const userUsecase = new UserUsecase(deps.userRepository);
  const response = await userUsecase.list();
  return response;
}

export async function createUser(body: { name: string }) {
  const userUsecase = new UserUsecase(deps.userRepository);
  const { name } = body;
  const response = await userUsecase.create(name);
  return response;
}

export async function getUser(id: string) {
  const userUsecase = new UserUsecase(deps.userRepository);
  const response = await userUsecase.get(id);
  return response;
}

export async function deleteUser(id: string) {
  const userUsecase = new UserUsecase(deps.userRepository);
  const response = await userUsecase.delete(id);
  return response;
}
