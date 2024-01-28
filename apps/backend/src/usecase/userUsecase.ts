import { UserRepository } from '../infrastructure/repository/userRepository';

export class UserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async create(name: string) {
    return this.userRepository.create(name);
  }

  async list() {
    return this.userRepository.list();
  }

  async get(id: string) {
    return this.userRepository.get(id);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
