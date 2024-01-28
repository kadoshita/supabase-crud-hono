import { Auth } from '../../domain/auth/auth';
import { AuthRepositoryInterface } from '../../domain/auth/authRepositoryInterface';
import { authClient } from '../external/supabase';

export class AuthRepository implements AuthRepositoryInterface {
  constructor() {}

  async authenticate(target: Auth): Promise<boolean> {
    const { data } = await authClient.getUser(target.idToken);
    if (data.user?.confirmed_at) {
      return true;
    }
    return false;
  }
}
