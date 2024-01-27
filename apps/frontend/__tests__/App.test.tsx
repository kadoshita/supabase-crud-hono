import { randomUUID } from 'crypto';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { render } from './utils';
import App from '../src/App';
import { MockInstance, vi } from 'vitest';

describe('App', () => {
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

  test('初回レンダー時にユーザー一覧取得APIを呼び出し、結果をtableに表示していること', async () => {
    render(<App></App>);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VITE_API_BASE_URL}/api/v1/users`
    );

    await waitFor(() => {
      expect(screen.getByText('test1')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('test2')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('test3')).toBeInTheDocument();
    });
  });
});
