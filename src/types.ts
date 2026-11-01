export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type StorageStatus = 'ready' | 'read-failed' | 'write-failed';
