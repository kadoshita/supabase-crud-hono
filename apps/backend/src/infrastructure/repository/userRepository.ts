import { randomUUID } from 'crypto';
import { User } from '../../domain/user';
import { UserRepositoryInterface } from '../../domain/userRepositoryInterface';
import { db } from '../external/postgres';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';

export class UserRepository implements UserRepositoryInterface {
  public static Table = 'users';

  async create(name: string): Promise<User> {
    const user = new User(randomUUID(), name);
    await db.insert(users).values(user);
    return user;
  }

  async list(): Promise<User[]> {
    const records = await db.select().from(users);
    return records.map((record) => new User(record.id, record.name));
  }

  async get(id: string): Promise<User | null> {
    const records = await db.select().from(users).where(eq(users.id, id));
    if (records.length === 0) {
      return null;
    }
    if (records.length > 1) {
      throw new Error('duplicate user');
    }
    const [record] = records;
    return new User(record.id, record.name);
  }

  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }
}
