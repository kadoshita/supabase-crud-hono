import { UserRepository } from '../../src/infrastructure/repository/userRepository';
import { UserUsecase } from '../../src/usecase/userUsecase';
import { deleteAllUsers } from '../utils';

describe('userUsecase', () => {
  beforeEach(async () => {
    await deleteAllUsers();
  });

  describe('createUser', () => {
    test('should create user', async () => {
      const userRepository = new UserRepository();
      const userUsecase = new UserUsecase(userRepository);
      const user = await userUsecase.create('test user');
      expect(user.name).toBe('test user');
      expect(user.id).toBeDefined();

      await userRepository.delete(user.id);
    });
  });

  describe('listUsers', () => {
    test('should return users', async () => {
      const userRepository = new UserRepository();
      const userUsecase = new UserUsecase(userRepository);

      const user1 = await userUsecase.create('John Doe 1');
      const user2 = await userUsecase.create('John Doe 2');

      const users = await userUsecase.list();
      expect(users).toMatchObject([user1, user2]);
    });
  });

  describe('getUser', () => {
    test('should return user', async () => {
      const userRepository = new UserRepository();
      const userUsecase = new UserUsecase(userRepository);

      const testUser = await userUsecase.create('test user');

      const user = await userUsecase.get(testUser.id);
      expect(user).toEqual({ id: testUser.id, name: 'test user' });
    });
  });

  describe('deleteUser', () => {
    test('should delete user', async () => {
      const userRepository = new UserRepository();
      const userUsecase = new UserUsecase(userRepository);

      const testUser = await userUsecase.create('test user');

      await userUsecase.delete(testUser.id);

      await expect(userUsecase.get(testUser.id)).resolves.not.toThrow();
    });
  });
});
