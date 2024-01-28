import { Auth } from './auth';

export interface AuthRepositoryInterface {
  authenticate(target: Auth): Promise<boolean>;
}
