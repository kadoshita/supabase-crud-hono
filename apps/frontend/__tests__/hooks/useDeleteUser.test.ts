import { randomUUID } from 'crypto';
import { renderHook, waitFor } from '@testing-library/react';
import { MockInstance, vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import { useDeleteUser } from '../../src/hooks/useDeleteUser';
import { ApiClient } from '../../src/libs/api';

describe('useDeleteUser', () => {
  let deleteUserApiMock: MockInstance;

  beforeEach(() => {
    deleteUserApiMock = vi
      .spyOn(ApiClient.prototype, 'deleteUser')
      .mockImplementation(async (id: string) => {
        return {};
      });
  });
  afterEach(() => {
    deleteUserApiMock.mockRestore();
  });

  test('resultとdeleteUserの関数を返すこと', () => {
    const { result } = renderHook(() => useDeleteUser());

    expect(result.current[0]).toBeUndefined();
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  test('deleteUser関数を実行するとAPIを叩いてユーザーを削除すること', async () => {
    const { result } = renderHook(() => useDeleteUser());

    expect(result.current[0]).toBeUndefined();

    const userId = randomUUID();

    act(() => result.current[1]({ id: userId, idToken: 'token' }));

    expect(deleteUserApiMock).toHaveBeenCalledWith(expect.any(String));

    await waitFor(() => expect(result.current[0]).not.toBeUndefined());

    expect(result.current[0]).toBe(userId);
  });
});
