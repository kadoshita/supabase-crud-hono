import { randomUUID } from 'crypto';
import { renderHook, waitFor } from '@testing-library/react';
import { MockInstance, vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import { useCreateUser } from '../../src/hooks/useCreateUser';

describe('useCreateUser', () => {
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

  test('usersとcreateUserの関数を返すこと', () => {
    const { result } = renderHook(() => useCreateUser());

    expect(result.current[0]).toBeUndefined();
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  test('createUser関数を実行するとAPIを叩いてユーザーを作成し、作成したユーザーを取得すること', async () => {
    const { result } = renderHook(() => useCreateUser());

    expect(result.current[0]).toBeUndefined();

    act(() => result.current[1]({ name: 'test', idToken: 'token' }));

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VITE_API_BASE_URL}/api/v1/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer token`,
        },
        body: JSON.stringify({ name: 'test' }),
      }
    );

    await waitFor(() => expect(result.current[0]).not.toBeUndefined());

    expect(result.current[0]).toStrictEqual({
      id: expect.any(String),
      name: 'test',
    });
  });
});
