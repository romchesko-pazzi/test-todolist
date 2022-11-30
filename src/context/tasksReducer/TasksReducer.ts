import { TaskPropsType } from '../../components/task/Task';
import { CreateBoardType, SetBoardsType } from '../boardsReducer/boardsReducer';

const initState: TasksGeneralType = {};

export const TasksReducer = (
  state = initState,
  action: TasksActionsType,
): TasksGeneralType => {
  switch (action.type) {
    case 'boards/create-board':
      return { ...state, [action.payload.board.boardId]: [] };
    case 'tasks/create-task':
      return {
        ...state,
        [action.payload.task.boardId]: [
          action.payload.task,
          ...state[action.payload.task.boardId],
        ],
      };
    case 'boards/set-boards': {
      const copy = { ...state };

      action.payload.boards.forEach(board => {
        copy[board.boardId] = [];
      });

      return copy;
    }
    case 'tasks/set-tasks':
      //   const copy = { ...state };
      //
      //   action.payload.tasks.forEach(task => {
      //     copy[task.boardId] = [...action.payload.tasks];
      //   });
      //
      //   return copy;
      // }
      return { ...state, [action.payload.boardId]: action.payload.tasks };
    default: {
      return state;
    }
  }
};

export const createTask = (task: TaskType) => {
  return {
    type: 'tasks/create-task',
    payload: { task },
  } as const;
};

export const setTasks = (boardId: string, tasks: TaskType[]) => {
  return {
    type: 'tasks/set-tasks',
    payload: { boardId, tasks },
  } as const;
};

type CreateTaskType = ReturnType<typeof createTask>;
type SetTasksType = ReturnType<typeof setTasks>;

export type TasksActionsType =
  | CreateBoardType
  | SetBoardsType
  | CreateTaskType
  | SetTasksType;

type TasksGeneralType = {
  [key: string]: TaskType[];
};

export type TaskType = TaskPropsType & {
  boardId: string;
};
// 'low' | 'medium' | 'high'
// 'queue' | 'development' | 'done'
