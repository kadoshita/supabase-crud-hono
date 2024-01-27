import { randomUUID } from 'crypto';
import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../utils';
import UsersTable from '../../../src/components/table/UsersTable';

describe('UsersTable', () => {
  test('渡されたデータがすべて表示されること', () => {
    const elements = [
      { id: randomUUID(), name: 'test1' },
      { id: randomUUID(), name: 'test2' },
      { id: randomUUID(), name: 'test3' },
    ];
    render(<UsersTable elements={elements}></UsersTable>);
    expect(screen.getByText('test1')).toBeInTheDocument();
    expect(screen.getByText('test2')).toBeInTheDocument();
    expect(screen.getByText('test3')).toBeInTheDocument();
  });
});
