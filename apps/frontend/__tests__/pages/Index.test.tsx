import { randomUUID } from 'crypto';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { render } from '../utils';
import { MockInstance, vi, expect } from 'vitest';
import Index from '../../src/pages/Index';
import * as useSession from '../../src/hooks/useSession';
import { Session } from '@supabase/supabase-js';
import { ApiClient } from '../../src/libs/api';

describe('Index', () => {
  let getUsersApiMock: MockInstance;
  let getSessionMock: MockInstance;

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

    getSessionMock = vi
      .spyOn(useSession, 'useSession')
      .mockImplementation(() => {
        return [
          {
            access_token: 'token',
          } as Session,
          async () => {
            return { access_token: 'token' } as Session;
          },
        ];
      });
  });
  afterEach(() => {
    getUsersApiMock.mockRestore();
    getSessionMock.mockRestore();
  });

  test('初回レンダー時にユーザー一覧取得APIを呼び出し、結果をtableに表示していること', async () => {
    render(<Index></Index>);

    await waitFor(() => {
      expect(screen.getByText('test1')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('test2')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('test3')).toBeInTheDocument();
    });

    expect(getUsersApiMock).toHaveBeenCalled();
  });
});
