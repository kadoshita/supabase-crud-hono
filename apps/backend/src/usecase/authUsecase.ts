import { Auth } from '../domain/auth/auth';
import { AuthRepositoryInterface } from '../domain/auth/authRepositoryInterface';

export class AuthUsecase {
  constructor(private readonly authRepository: AuthRepositoryInterface) {}

  async authenticate(idToken: string): Promise<boolean> {
    const target = new Auth(idToken);
    return await this.authRepository.authenticate(target);
  }
}
