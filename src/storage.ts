import type { Todo } from './types';

export const TODO_STORAGE_KEY = 'todo-app.todos';

export type ReadResult =
  { ok: true; todos: Todo[] } | { ok: false; message: string };

export type WriteResult = { ok: true } | { ok: false; message: string };

const isTodo = (value: unknown): value is Todo => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    Object.keys(record).length === 3 &&
    typeof record.id === 'string' &&
    typeof record.text === 'string' &&
    typeof record.completed === 'boolean'
  );
};

export const readTodos = (storage: Storage): ReadResult => {
  try {
    const rawTodos = storage.getItem(TODO_STORAGE_KEY);
    if (rawTodos === null) {
      return { ok: true, todos: [] };
    }

    const parsedTodos: unknown = JSON.parse(rawTodos);
    if (!Array.isArray(parsedTodos) || !parsedTodos.every(isTodo)) {
      return {
        ok: false,
        message: '保存済みの TODO データの形式が正しくありません。'
      };
    }

    return { ok: true, todos: parsedTodos };
  } catch {
    return { ok: false, message: '保存済みの TODO を読み取れませんでした。' };
  }
};

export const writeTodos = (storage: Storage, todos: Todo[]): WriteResult => {
  try {
    storage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    return { ok: true };
  } catch {
    return { ok: false, message: 'TODO を保存できませんでした。' };
  }
};
