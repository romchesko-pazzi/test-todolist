import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import thunk from 'redux-thunk';

export type RootStateType = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({});

export const store = createStore(rootReducer, applyMiddleware(thunk));
