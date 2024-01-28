import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import UserInputForm from '../../../src/components/form/UserInputForm';
import { render } from '../../utils';

describe('UserInputForm', () => {
  test('submitボタンクリック時にハンドラー関数が実行されること', () => {
    const handleSubmit = vi.fn();
    render(<UserInputForm handleSubmit={handleSubmit}></UserInputForm>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('submitボタンクリック時にハンドラー関数に入力値が渡されること', () => {
    const handleSubmit = vi.fn();
    render(<UserInputForm handleSubmit={handleSubmit}></UserInputForm>);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test' },
    });
    fireEvent.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalledWith(
      { name: 'test' },
      expect.anything()
    );
  });
});
