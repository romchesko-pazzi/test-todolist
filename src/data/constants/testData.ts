import { LocalBoardType } from '../../pages/tasksList/TasksList';

export const currentTaskInit = {
  taskId: 'taskId1',
  taskNumber: '1',
  taskTitle: 'Node.js',
  description: 'learn node.js',
  todolistId: 'boardId1',
  creationDate: '01.12.22',
  timeSpent: 'time spent',
  priority: 'medium',
  endDate: '31.12.22',
  status: 'queue',
};

export const currentBoardInit: LocalBoardType = {
  id: 1,
  title: 'queue',
  items: [currentTaskInit],
};
