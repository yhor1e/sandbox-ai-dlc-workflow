import { describe, expect, it, vi } from 'vitest';
import { readTodos, TODO_STORAGE_KEY, writeTodos } from './storage';
import type { Todo } from './types';

const todos: Todo[] = [{ id: 'todo-1', text: '牛乳を買う', completed: false }];

describe('localStorage adapter', () => {
  it('returns an empty collection when no TODOs are stored', () => {
    expect(readTodos(window.localStorage)).toEqual({ ok: true, todos: [] });
  });

  it('restores a valid ordered TODO collection', () => {
    window.localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));

    expect(readTodos(window.localStorage)).toEqual({ ok: true, todos });
  });

  it('fails closed for malformed JSON', () => {
    window.localStorage.setItem(TODO_STORAGE_KEY, '{not json');

    expect(readTodos(window.localStorage)).toMatchObject({ ok: false });
  });

  it('fails closed when a TODO has an invalid shape', () => {
    window.localStorage.setItem(
      TODO_STORAGE_KEY,
      JSON.stringify([
        { id: 'todo-1', text: '不正な TODO', completed: 'false' }
      ])
    );

    expect(readTodos(window.localStorage)).toMatchObject({ ok: false });
  });

  it('rejects records with extra fields', () => {
    window.localStorage.setItem(
      TODO_STORAGE_KEY,
      JSON.stringify([{ ...todos[0], unexpected: true }])
    );

    expect(readTodos(window.localStorage)).toMatchObject({ ok: false });
  });

  it('writes only to the application-owned key', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    expect(writeTodos(window.localStorage, todos)).toEqual({ ok: true });
    expect(setItem).toHaveBeenCalledWith(
      TODO_STORAGE_KEY,
      JSON.stringify(todos)
    );
  });

  it('returns a failure when browser storage cannot write', () => {
    const unavailableStorage = {
      setItem: () => {
        throw new DOMException('Quota exceeded');
      }
    } as unknown as Storage;

    expect(writeTodos(unavailableStorage, todos)).toMatchObject({ ok: false });
  });
});
