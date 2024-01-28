import { randomUUID } from 'crypto';
import { renderHook, waitFor } from '@testing-library/react';
import { MockInstance, vi } from 'vitest';
import { useFetchUsers } from '../../src/hooks/useFetchUsers';
import { act } from 'react-dom/test-utils';

describe('useFetchUsers', () => {
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

  test('usersとfetchUsersの関数を返すこと', () => {
    const { result } = renderHook(() => useFetchUsers());

    expect(result.current[0]).toEqual([]);
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  test('fetchUsers関数を実行するとAPIを叩いてユーザー一覧を取得すること', async () => {
    const { result } = renderHook(() => useFetchUsers());

    expect(result.current[0]).toEqual([]);

    act(() => result.current[1]({ idToken: 'token' }));

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VITE_API_BASE_URL}/api/v1/users`,
      {
        headers: {
          Authorization: `Bearer token`,
        },
      }
    );

    await waitFor(() => expect(result.current[0].length).toBe(3));

    expect(result.current[0]).toStrictEqual([
      { id: expect.any(String), name: 'test1' },
      { id: expect.any(String), name: 'test2' },
      { id: expect.any(String), name: 'test3' },
    ]);
  });
});
