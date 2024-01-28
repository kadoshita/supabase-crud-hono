import fastify from 'fastify';
import { registerRoutes } from '../../src/routes';
import { UserUsecase } from '../../src/usecase/userUsecase';
import { UserRepository } from '../../src/infrastructure/repository/userRepository';
import { randomUUID } from 'crypto';
import { User } from '../../src/domain/user/user';
import { vi, MockInstance } from 'vitest';
import { AuthRepository } from '../../src/infrastructure/repository/authRepository';

const app = fastify();
registerRoutes(app);

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
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/users',
        headers: {
          authorization: 'Bearer token',
        },
      });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toEqual([user1, user2]);
    });
  });

  describe('createUser', () => {
    test('should create user', async () => {
      const userName = randomUUID();
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/users',
        headers: {
          authorization: 'Bearer token',
        },
        payload: { name: userName },
      });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toEqual({
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
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/users/${user.id}`,
        headers: {
          authorization: 'Bearer token',
        },
      });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toEqual(user);
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
      const response = await app.inject({
        method: 'DELETE',
        url: `/api/v1/users/${user.id}`,
        headers: {
          authorization: 'Bearer token',
        },
      });
      expect(response.statusCode).toEqual(200);
    });
  });
});
