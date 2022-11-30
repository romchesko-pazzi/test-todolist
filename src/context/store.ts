import { combineReducers, legacy_createStore as createStore } from 'redux';

import { BoardsReducer } from './boardsReducer/boardsReducer';
import { TasksReducer } from './tasksReducer/TasksReducer';

export type RootStateType = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  boards: BoardsReducer,
  tasks: TasksReducer,
});

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
