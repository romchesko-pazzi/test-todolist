// import { TaskTestType } from '../../context/tasksReducer/TasksReducer';
//
// const queueTasks: TaskTestType = {
//   filter: 'queue',
//   tasks: [
//     {
//       taskId: 'taskId1',
//       taskNumber: '1',
//       taskTitle: 'Node.js',
//       description: 'learn node.js',
//       boardId: 'boardId1',
//       creationDate: '01.12.22',
//       elapsedTime: 'idk',
//       priority: 'medium',
//       endDate: '31.12.22',
//       status: 'queue',
//     },
//   ],
// };
//
// const devTasks: TaskTestType = {
//   filter: 'development',
//   tasks: [
//     {
//       taskId: 'taskId2',
//       taskNumber: '2',
//       taskTitle: 'React',
//       description: 'learn React',
//       boardId: 'boardId1',
//       creationDate: '01.12.22',
//       elapsedTime: 'idk',
//       priority: 'medium',
//       endDate: '31.12.22',
//       status: 'development',
//     },
//   ],
// };
//
// const doneTasks: TaskTestType = {
//   filter: 'done',
//   tasks: [
//     {
//       taskId: 'taskId3',
//       taskNumber: '3',
//       taskTitle: 'HTML',
//       description: 'learned HTML',
//       boardId: 'boardId1',
//       creationDate: '01.12.22',
//       elapsedTime: 'idk',
//       priority: 'medium',
//       endDate: '31.12.22',
//       status: 'done',
//     },
//   ],
// };

export const currentTaskInit = {
  taskId: 'taskId1',
  taskNumber: '1',
  taskTitle: 'Node.js',
  description: 'learn node.js',
  todolistId: 'boardId1',
  creationDate: '01.12.22',
  elapsedTime: 'idk',
  priority: 'medium',
  endDate: '31.12.22',
  status: 'queue',
};

export const currentBoardInit = {
  id: 1,
  title: 'queue',
  items: [currentTaskInit],
};
