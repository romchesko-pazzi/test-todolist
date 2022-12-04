import { BoardType, TaskType } from '../../context/tasksReducer/TasksReducer';

export const currentTaskInit: TaskType = {
  taskId: 'taskId1',
  taskTitle: 'Node.js',
  description: 'learn node.js',
  todolistId: 'boardId1',
  creationDate: '01.12.22',
  timeSpent: 'time spent',
  priority: 'medium',
  deadlineDate: '31.12.22',
  status: 'queue',
};

export const currentBoardInit: BoardType = {
  boardId: 1,
  filter: 'queue',
  tasks: [currentTaskInit],
};
