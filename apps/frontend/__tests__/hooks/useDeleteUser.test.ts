import { randomUUID } from 'crypto';
import { renderHook, waitFor } from '@testing-library/react';
import { MockInstance, vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import { useDeleteUser } from '../../src/hooks/useDeleteUser';

describe('useDeleteUser', () => {
  let fetchMock: MockInstance;

  beforeEach(() => {
    fetchMock = vi
      .spyOn(global, 'fetch')
      .mockImplementation(
        async (
          input: Parameters<typeof fetch>[0],
          options: Parameters<typeof fetch>[1]
        ) => {
          if (options && options.method === 'POST') {
            if (options.body) {
              const body = JSON.parse(options.body.toString());
              return new Response(
                JSON.stringify({ id: randomUUID(), name: body.name ?? '' })
              );
            } else {
              return new Response(JSON.stringify({}));
            }
          } else if (options && options.method === 'DELETE') {
            return new Response();
          } else {
            return new Response(
              JSON.stringify([
                { id: randomUUID(), name: 'test1' },
                { id: randomUUID(), name: 'test2' },
                { id: randomUUID(), name: 'test3' },
              ])
            );
          }
        }
      );
  });
  afterEach(() => {
    fetchMock.mockRestore();
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

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VITE_API_BASE_URL}/api/v1/users/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer token`,
        },
        body: JSON.stringify({}),
      }
    );

    await waitFor(() => expect(result.current[0]).not.toBeUndefined());

    expect(result.current[0]).toBe(userId);
  });
});
