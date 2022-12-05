import { combineReducers, legacy_createStore as createStore } from 'redux';

import { TasksReducer } from './tasksReducer/TasksReducer';
import { TodolistReducer } from './todolistReducer.ts/TodolistReducer';

export type RootStateType = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  todolists: TodolistReducer,
  tasks: TasksReducer,
});

export const store = createStore(rootReducer);
