import { FormEvent, useEffect, useMemo, useState } from 'react';
import { readTodos, writeTodos } from './storage';
import type { StorageStatus, Todo } from './types';
import './App.css';

const MAX_TODO_LENGTH = 500;

const createTodo = (text: string): Todo => ({
  id: crypto.randomUUID(),
  text,
  completed: false
});

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState('');
  const [inputError, setInputError] = useState('');
  const [storageStatus, setStorageStatus] = useState<StorageStatus>('ready');
  const [notice, setNotice] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const result = readTodos(window.localStorage);
    if (result.ok) {
      setTodos(result.todos);
      return;
    }

    setStorageStatus('read-failed');
    setNotice(
      `${result.message} ブラウザーのストレージを確認してから再読み込みしてください。`
    );
  }, []);

  const openTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  );
  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos]
  );
  const mutationsDisabled = storageStatus === 'read-failed';

  const persist = (nextTodos: Todo[], successMessage: string) => {
    const result = writeTodos(window.localStorage, nextTodos);
    if (result.ok) {
      setStorageStatus('ready');
      setNotice(successMessage);
      return true;
    }

    setStorageStatus('write-failed');
    setNotice(
      `${result.message} 最新の変更はこのページにのみあります。再試行して保存するか、再読み込みしてください。`
    );
    return false;
  };

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mutationsDisabled) {
      return;
    }

    const text = draft.trim();
    if (!text) {
      setInputError('TODO の内容を入力してください。');
      setNotice('TODO の内容を入力してください。');
      return;
    }
    if (text.length > MAX_TODO_LENGTH) {
      setInputError(`TODO は ${MAX_TODO_LENGTH} 文字以内で入力してください。`);
      setNotice(`TODO は ${MAX_TODO_LENGTH} 文字以内で入力してください。`);
      return;
    }

    const nextTodos = [...todos, createTodo(text)];
    setTodos(nextTodos);
    setInputError('');
    if (persist(nextTodos, 'TODO を追加しました。')) {
      setDraft('');
    }
  };

  const toggleTodo = (id: string) => {
    if (mutationsDisabled) {
      return;
    }

    const nextTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    const changedTodo = nextTodos.find((todo) => todo.id === id);
    setTodos(nextTodos);
    persist(
      nextTodos,
      changedTodo?.completed
        ? 'TODO を完了にしました。'
        : 'TODO を未完了に戻しました。'
    );
  };

  const retrySave = () => {
    if (persist(todos, 'TODO を保存しました。')) {
      setNotice('TODO を保存しました。入力中の内容はそのままです。');
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const toggleCompletedVisibility = () => {
    const nextVisibility = !showCompleted;
    setShowCompleted(nextVisibility);
    setNotice(
      nextVisibility
        ? '完了済み TODO を表示しました。'
        : '完了済み TODO を非表示にしました。'
    );
  };

  return (
    <main className="app-shell">
      <section className="todo-app" aria-labelledby="page-title">
        <h1 id="page-title">TODO アプリ</h1>
        <p className="description">やることをこのブラウザーに保存します。</p>

        {storageStatus !== 'ready' && (
          <section
            className="storage-notice"
            role="alert"
            aria-label="ストレージの問題"
          >
            <p>{notice}</p>
            {storageStatus === 'write-failed' && (
              <div className="notice-actions">
                <button
                  type="button"
                  onClick={retrySave}
                  data-testid="storage-retry-button"
                >
                  再試行して保存
                </button>
                <button
                  type="button"
                  onClick={reloadPage}
                  data-testid="storage-reload-button"
                >
                  再読み込み
                </button>
              </div>
            )}
          </section>
        )}

        <form onSubmit={addTodo} noValidate>
          <label htmlFor="todo-input">TODO の内容</label>
          <div className="form-row">
            <input
              id="todo-input"
              data-testid="todo-form-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              aria-describedby={inputError ? 'todo-input-error' : undefined}
              aria-invalid={Boolean(inputError)}
              disabled={mutationsDisabled}
            />
            <button
              type="submit"
              disabled={mutationsDisabled}
              data-testid="todo-form-submit-button"
            >
              追加
            </button>
          </div>
          {inputError && (
            <p id="todo-input-error" className="field-error" role="alert">
              {inputError}
            </p>
          )}
        </form>

        <section aria-labelledby="open-todos-heading">
          <h2 id="open-todos-heading">未完了の TODO</h2>
          {openTodos.length === 0 ? (
            <p>最初の TODO を追加してください。</p>
          ) : (
            <ul className="todo-list">
              {openTodos.map((todo) => (
                <li key={todo.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      disabled={mutationsDisabled}
                      onChange={() => toggleTodo(todo.id)}
                      data-testid="todo-completion-checkbox"
                    />
                    {todo.text}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </section>

        {completedTodos.length > 0 && (
          <>
            <button
              type="button"
              onClick={toggleCompletedVisibility}
              aria-expanded={showCompleted}
              data-testid="completed-visibility-button"
            >
              {showCompleted
                ? '完了済み TODO を隠す'
                : '完了済み TODO を表示する'}
            </button>
            {showCompleted && (
              <section
                className="completed-section"
                aria-labelledby="completed-todos-heading"
              >
                <h2 id="completed-todos-heading">完了済み TODO</h2>
                <ul className="todo-list">
                  {completedTodos.map((todo) => (
                    <li key={todo.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          disabled={mutationsDisabled}
                          onChange={() => toggleTodo(todo.id)}
                          data-testid="todo-completion-checkbox"
                        />
                        <s>{todo.text}</s>
                      </label>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {storageStatus === 'ready' ? notice : ''}
        </p>
      </section>
    </main>
  );
}
