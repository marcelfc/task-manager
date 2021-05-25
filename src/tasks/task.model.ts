export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  'IN_PROGRESS' = 'IN_PROGRESS',
  'DONE' = 'DONE',
  'BACKLOG' = 'BACKLOG',
}
