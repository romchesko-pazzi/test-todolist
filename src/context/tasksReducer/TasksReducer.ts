import { StatusType, TaskPropsType } from '../../components/task/Task';
import {
  CreateTodolistType,
  SetTodolistsType,
} from '../todolistReducer.ts/TodolistReducer';

const initState: TasksGeneralType = {};

export const TasksReducer = (
  state = initState,
  action: TasksActionsType,
): TasksGeneralType => {
  switch (action.type) {
    case 'todolist/create-todolist':
      return { ...state, [action.payload.todolist.todolistId]: [] };
    case 'tasks/create-task':
      return {
        ...state,
        [action.payload.task.todolistId]: [
          action.payload.task,
          ...state[action.payload.task.todolistId],
        ],
      };
    case 'todolist/set-todolists': {
      const copy = { ...state };

      action.payload.todolists.forEach(todolist => {
        copy[todolist.todolistId] = [];
      });

      return copy;
    }
    case 'tasks/set-tasks':
      return { ...state, [action.payload.todolistId]: action.payload.tasks };
    case 'tasks/change-status':
      return {
        ...state,
        [action.payload.task.todolistId]: state[action.payload.task.todolistId].map(m =>
          m.taskId === action.payload.task.taskId
            ? { ...m, status: action.payload.newStatus }
            : m,
        ),
      };
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

export const setTasks = (todolistId: string, tasks: TaskType[]) => {
  return {
    type: 'tasks/set-tasks',
    payload: { todolistId, tasks },
  } as const;
};

export const changeTaskStatus = (task: TaskType, newStatus: StatusType) => {
  return {
    type: 'tasks/change-status',
    payload: { task, newStatus },
  } as const;
};

type CreateTaskType = ReturnType<typeof createTask>;
type SetTasksType = ReturnType<typeof setTasks>;
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatus>;

export type TasksActionsType =
  | CreateTodolistType
  | SetTodolistsType
  | CreateTaskType
  | SetTasksType
  | ChangeTaskStatusType;

type TasksGeneralType = {
  [key: string]: TaskType[];
};

export type BoardType = {
  boardId: number;
  filter: StatusType;
  tasks: TaskType[];
};

export type TaskType = TaskPropsType & {
  todolistId: string;
};
