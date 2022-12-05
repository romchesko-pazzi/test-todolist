export const taskFields = {
  taskName: 'Enter task name',
  timeSpent: 'Time spent (hours)',
  deadline: 'Deadline',
  description: 'Description',
  priority: 'Priority',
  status: 'Status',
  attachFiles: 'Attach files',
  dateCreated: 'Date created',
};

export const todolistFields = {
  todolistName: 'Enter todolist name',
};

export const buttonFields = {
  createBtn: 'create',
  addNewTaskBtn: 'add new task',
  addNewTodolistBtn: 'add new todolist',
  editBtn: 'make your changes',
  saveBtn: 'save changes',
};

export enum Priorities {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export enum Statuses {
  queue = 'queue',
  development = 'development',
  done = 'done',
}
