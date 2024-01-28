import { randomUUID } from 'crypto';
import { User } from '../../src/domain/user/user';

describe('user', () => {
  test('create', () => {
    expect(() => new User(randomUUID(), 'tset user')).not.toThrow();
  });
});
