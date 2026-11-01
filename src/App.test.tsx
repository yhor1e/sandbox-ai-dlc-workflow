import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { TODO_STORAGE_KEY } from './storage';

const storedTodos = [
  { id: 'open-1', text: '洗濯する', completed: false },
  { id: 'done-1', text: '本を読む', completed: true }
];

describe('TodoApp', () => {
  it('adds a valid TODO and persists it', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('TODO の内容'), ' 散歩する ');
    await user.click(screen.getByRole('button', { name: '追加' }));

    expect(screen.getByLabelText('散歩する')).not.toBeChecked();
    expect(screen.getByText('TODO を追加しました。')).toBeInTheDocument();
    expect(
      JSON.parse(window.localStorage.getItem(TODO_STORAGE_KEY) ?? '[]')
    ).toMatchObject([{ text: '散歩する', completed: false }]);
  });

  it('retains a whitespace-only draft and shows a field-level validation error', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('TODO の内容'), '   ');
    await user.click(screen.getByRole('button', { name: '追加' }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      'TODO の内容を入力してください。'
    );
    expect(screen.getByLabelText('TODO の内容')).toHaveValue('   ');
  });

  it('rejects a draft longer than 500 characters', () => {
    render(<App />);
    const input = screen.getByLabelText('TODO の内容');

    fireEvent.change(input, { target: { value: 'あ'.repeat(501) } });
    fireEvent.submit(input.closest('form')!);

    expect(screen.getByRole('alert')).toHaveTextContent('500 文字以内');
    expect(screen.getByLabelText('TODO の内容')).toHaveValue('あ'.repeat(501));
  });

  it('restores valid TODOs while hiding completed items by default', () => {
    window.localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(storedTodos));
    render(<App />);

    expect(screen.getByLabelText('洗濯する')).toBeInTheDocument();
    expect(screen.queryByText('本を読む')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '完了済み TODO を表示する' })
    ).toBeInTheDocument();
  });

  it('updates completion and makes the completed section available', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(
      TODO_STORAGE_KEY,
      JSON.stringify([storedTodos[0]])
    );
    render(<App />);

    await user.click(screen.getByLabelText('洗濯する'));
    expect(screen.queryByLabelText('洗濯する')).not.toBeInTheDocument();
    expect(screen.getByText('TODO を完了にしました。')).toBeInTheDocument();
    await user.click(
      screen.getByRole('button', { name: '完了済み TODO を表示する' })
    );

    expect(
      screen.getByRole('heading', { name: '完了済み TODO' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('洗濯する')).toBeChecked();
  });

  it('enters a disabled read-failed state for unreadable storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage unavailable');
    });
    render(<App />);

    expect(screen.getByRole('alert')).toHaveTextContent('読み取れませんでした');
    expect(screen.getByLabelText('TODO の内容')).toBeDisabled();
    expect(screen.getByRole('button', { name: '追加' })).toBeDisabled();
  });

  it('keeps in-memory changes and retries a failed save', async () => {
    const user = userEvent.setup();
    const setItem = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementationOnce(() => {
        throw new DOMException('Quota exceeded');
      });
    render(<App />);

    await user.type(screen.getByLabelText('TODO の内容'), '保存を試す');
    await user.click(screen.getByRole('button', { name: '追加' }));

    expect(screen.getByLabelText('保存を試す')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent(
      'このページにのみあります'
    );
    await user.click(screen.getByRole('button', { name: '再試行して保存' }));

    expect(
      screen.queryByTestId('storage-retry-button')
    ).not.toBeInTheDocument();
    expect(setItem).toHaveBeenCalledTimes(2);
    expect(
      screen.getByText('TODO を保存しました。入力中の内容はそのままです。')
    ).toBeInTheDocument();
  });

  it('provides keyboard-accessible controls without axe violations', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(storedTodos));
    const { container } = render(<App />);

    await user.tab();
    expect(screen.getByLabelText('TODO の内容')).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: '追加' })).toHaveFocus();
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } }
    });

    expect(results.violations).toHaveLength(0);
    expect(
      within(container).getByRole('button', {
        name: '完了済み TODO を表示する'
      })
    ).toBeEnabled();
  });
});
