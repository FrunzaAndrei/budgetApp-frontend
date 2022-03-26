import { createReducer } from '../utils/reduceHelper';
import {
  UPDATE_BUDGET,
  LOGIN_IN_APP,
  RESET_ERROR,
  SET_BUDGET,
  SET_ERROR,
} from './actionTypes';

const initialState = {
  error: null,
  token: null,
  budget: {},
};

export const appData = createReducer(initialState, {
  [SET_ERROR](state, action) {
    return {
      ...state,
      error: action.error,
    };
  },
  [RESET_ERROR](state) {
    return {
      ...state,
      error: null,
    };
  },
  [LOGIN_IN_APP](state, action) {
    return {
      ...state,
      token: action.token,
      error: null,
    };
  },
  [SET_BUDGET](state, action) {
    return {
      ...state,
      budget: action.budget,
      error: null,
    };
  },
  [UPDATE_BUDGET](state, action) {
    return {
      ...state,
      budget: action.budget,
      error: null,
    };
  },
});
