import { AuthRepository } from './infrastructure/repository/authRepository';
import { UserRepository } from './infrastructure/repository/userRepository';

export const deps = {
  userRepository: new UserRepository(),
  authhRepository: new AuthRepository(),
};
