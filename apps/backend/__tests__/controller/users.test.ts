import { UserUsecase } from '../../src/usecase/userUsecase';
import { UserRepository } from '../../src/infrastructure/repository/userRepository';
import { randomUUID } from 'crypto';
import { User } from '../../src/domain/user/user';
import { vi, MockInstance } from 'vitest';
import { AuthRepository } from '../../src/infrastructure/repository/authRepository';
import app from '../../src/routes';

describe('UsersController', () => {
  const userUsecase = new UserUsecase(new UserRepository());

  let authRepositoryAuthenticateSpy: MockInstance;

  beforeEach(async () => {
    authRepositoryAuthenticateSpy = vi
      .spyOn(AuthRepository.prototype, 'authenticate')
      .mockImplementation(async () => true);
  });

  afterEach(async () => {
    authRepositoryAuthenticateSpy.mockRestore();
  });

  describe('getUsers', () => {
    let user1: User;
    let user2: User;

    beforeEach(async () => {
      user1 = await userUsecase.create(randomUUID());
      user2 = await userUsecase.create(randomUUID());
    });

    afterEach(async () => {
      await userUsecase.delete(user1.id);
      await userUsecase.delete(user2.id);
    });

    test('should return users', async () => {
      const response = await app.request('/api/v1/users', {
        headers: { authorization: 'Bearer token' },
      });
      expect(response.status).toEqual(200);
      await expect(response.json()).resolves.toEqual([user1, user2]);
    });
  });

  describe('createUser', () => {
    test('should create user', async () => {
      const userName = randomUUID();
      const response = await app.request('/api/v1/users', {
        method: 'POST',
        headers: {
          authorization: 'Bearer token',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ name: userName }),
      });
      expect(response.status).toEqual(200);
      await expect(response.json()).resolves.toEqual({
        id: expect.any(String),
        name: userName,
      });
    });
  });

  describe('getUser', () => {
    let user: User;

    beforeEach(async () => {
      user = await userUsecase.create(randomUUID());
    });
    afterEach(async () => {
      await userUsecase.delete(user.id);
    });

    test('should return user', async () => {
      const response = await app.request(`/api/v1/users/${user.id}`, {
        headers: {
          authorization: 'Bearer token',
        },
      });
      expect(response.status).toEqual(200);
      await expect(response.json()).resolves.toEqual(user);
    });
  });

  describe('deleteUser', () => {
    let user: User;

    beforeEach(async () => {
      user = await userUsecase.create(randomUUID());
    });
    afterEach(async () => {
      await userUsecase.delete(user.id);
    });

    test('should delete user', async () => {
      const response = await app.request(`/api/v1/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          authorization: 'Bearer token',
        },
      });
      expect(response.status).toEqual(200);
    });
  });
});
