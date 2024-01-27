import { UserRepository } from './infrastructure/repository/userRepository';

export const deps = {
  userRepository: new UserRepository(),
};
