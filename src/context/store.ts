import { combineReducers, legacy_createStore as createStore } from 'redux';

import { BoardsReducer } from './boardsReducer/boardsReducer';

export type RootStateType = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  boards: BoardsReducer,
});

export const store = createStore(rootReducer);
