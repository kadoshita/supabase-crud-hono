import { randomUUID } from 'crypto';
import { renderHook, waitFor } from '@testing-library/react';
import { MockInstance, vi } from 'vitest';
import { useFetchUsers } from '../../src/hooks/useFetchUsers';
import { act } from 'react-dom/test-utils';
import { ApiClient } from '../../src/libs/api';

describe('useFetchUsers', () => {
  let getUsersApiMock: MockInstance;

  beforeEach(() => {
    getUsersApiMock = vi
      .spyOn(ApiClient.prototype, 'getUsers')
      .mockImplementation(async () => {
        return [
          { id: randomUUID(), name: 'test1' },
          { id: randomUUID(), name: 'test2' },
          { id: randomUUID(), name: 'test3' },
        ];
      });
  });
  afterEach(() => {
    getUsersApiMock.mockRestore();
  });

  test('usersとfetchUsersの関数を返すこと', () => {
    const { result } = renderHook(() => useFetchUsers());

    expect(result.current[0]).toEqual([]);
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  test('fetchUsers関数を実行するとAPIを叩いてユーザー一覧を取得すること', async () => {
    const { result } = renderHook(() => useFetchUsers());

    expect(result.current[0]).toEqual([]);

    act(() => result.current[1]({ idToken: 'token' }));

    expect(getUsersApiMock).toHaveBeenCalled();

    await waitFor(() => expect(result.current[0].length).toBe(3));

    expect(result.current[0]).toStrictEqual([
      { id: expect.any(String), name: 'test1' },
      { id: expect.any(String), name: 'test2' },
      { id: expect.any(String), name: 'test3' },
    ]);
  });
});
