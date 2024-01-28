import { User } from './user';

export interface UserRepositoryInterface {
  create(name: string): Promise<User>;
  list(): Promise<User[]>;
  get(id: string): Promise<User | null>;
  delete(id: string): Promise<void>;
}
