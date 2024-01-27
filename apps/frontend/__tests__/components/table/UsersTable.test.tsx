import { randomUUID } from 'crypto';
import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../utils';
import UsersTable from '../../../src/components/table/UsersTable';
import { vi } from 'vitest';

describe('UsersTable', () => {
  test('渡されたデータがすべて表示されること', () => {
    const elements = [
      { id: randomUUID(), name: 'test1' },
      { id: randomUUID(), name: 'test2' },
      { id: randomUUID(), name: 'test3' },
    ];
    const handleDelete = vi.fn();
    render(
      <UsersTable elements={elements} handleDelete={handleDelete}></UsersTable>
    );
    expect(screen.getByText('test1')).toBeInTheDocument();
    expect(screen.getByText('test2')).toBeInTheDocument();
    expect(screen.getByText('test3')).toBeInTheDocument();
  });

  test('削除ボタンクリック時にハンドラー関数が実行されること', () => {
    const elements = [
      { id: randomUUID(), name: 'test1' },
      { id: randomUUID(), name: 'test2' },
      { id: randomUUID(), name: 'test3' },
    ];
    const handleDelete = vi.fn();
    render(
      <UsersTable elements={elements} handleDelete={handleDelete}></UsersTable>
    );
    screen.getAllByRole('button')[1].click();
    expect(handleDelete).toHaveBeenCalledWith(expect.any(String));
  });
});
