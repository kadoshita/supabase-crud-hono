import { randomUUID } from 'crypto';
import { renderHook, waitFor } from '@testing-library/react';
import { MockInstance, vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import { useCreateUser } from '../../src/hooks/useCreateUser';
import { ApiClient } from '../../src/libs/api';

describe('useCreateUser', () => {
  let createUserApiMock: MockInstance;

  beforeEach(() => {
    createUserApiMock = vi
      .spyOn(ApiClient.prototype, 'createUser')
      .mockImplementation(
        async (params: Parameters<ApiClient['createUser']>[0]) => {
          return { id: randomUUID(), name: params.name ?? '' };
        }
      );
  });
  afterEach(() => {
    createUserApiMock.mockRestore();
  });

  test('usersとcreateUserの関数を返すこと', () => {
    const { result } = renderHook(() => useCreateUser());

    expect(result.current[0]).toBeUndefined();
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  test('createUser関数を実行するとAPIを叩いてユーザーを作成し、作成したユーザーを取得すること', async () => {
    const { result } = renderHook(() => useCreateUser());

    expect(result.current[0]).toBeUndefined();

    act(() => result.current[1]({ name: 'test', idToken: 'token' }));

    expect(createUserApiMock).toHaveBeenCalledWith({ name: 'test' });

    await waitFor(() => expect(result.current[0]).not.toBeUndefined());

    expect(result.current[0]).toStrictEqual({
      id: expect.any(String),
      name: 'test',
    });
  });
});
