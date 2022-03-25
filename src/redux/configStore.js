import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './rootReducers';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

const configureStore = (initialStore) => {
  const enhancer = compose(applyMiddleware(thunkMiddleware, logger));
  const store = createStore(rootReducer, initialStore, enhancer);
  return store;
};

export const store = configureStore({});
