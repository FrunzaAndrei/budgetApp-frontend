import Api from '../utils/apiHelper';
import {
  UPDATE_BUDGET,
  LOGIN_IN_APP,
  RESET_ERROR,
  SET_BUDGET,
  SET_ERROR,
  RESET_ALL_DATA,
} from './actionTypes';

export const login = (email, password) => {
  return async (dispatch) => {
    const params = { email, password };
    const response = await Api.postAsync('/api/auth', params);
    if (response.ok) {
      dispatch({ type: LOGIN_IN_APP, token: response.data.token });
    } else {
      if (response && response.errors.length > 0) {
        dispatch(displayError(response.errors[0].msg));
      } else {
        dispatch(displayError('Something went wrong'));
      }
    }
  };
};

export const logout = () => {
  return (dispatch) =>
    dispatch({
      type: RESET_ALL_DATA,
    });
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    const params = { email, password };
    const response = await Api.postAsync('/api/users', params);
    if (response.ok) {
      dispatch({ type: LOGIN_IN_APP, token: response.data.token });
    } else {
      if (response && response.errors.length > 0) {
        dispatch(displayError(response.errors[0].msg));
      } else {
        dispatch(displayError('Something went wrong'));
      }
    }
  };
};

export const budget = (params = {}, token) => {
  return async (dispatch) => {
    const existParams = params && params.budgetLimit;
    const response = await Api.postAsync('/api/budget', params, token);
    if (response.ok) {
      const { spenditure, budgetLimit } = response.data;
      dispatch({
        type: existParams ? UPDATE_BUDGET : SET_BUDGET,
        budget: {
          budgetLimit: budgetLimit || 0,
          spenditure: spenditure || [],
        },
      });
    } else {
      if (response && response.errors.length > 0) {
        dispatch(displayError(response.errors[0].msg));
      } else {
        dispatch(displayError('Something went wrong'));
      }
    }
  };
};

export const deleteSpenditure = (id, token) => {
  return async (dispatch) => {
    if (!id) {
      return console.error('Id is required for removing a spenditure');
    }
    const response = await Api.deleteAsync(
      `/api/budget/spenditure/${id}`,
      token
    );
    if (response.ok) {
      const { spenditure, budgetLimit } = response.data;
      dispatch({
        type: UPDATE_BUDGET,
        budget: {
          budgetLimit: budgetLimit || 0,
          spenditure: spenditure || [],
        },
      });
    } else {
      if (response && response.errors.length > 0) {
        dispatch(displayError(response.errors[0].msg));
      } else {
        dispatch(displayError('Something went wrong'));
      }
    }
  };
};

export const displayError = (error) => {
  return (dispatch) =>
    dispatch({
      type: SET_ERROR,
      error,
    });
};

export const hideError = () => {
  return (dispatch) => dispatch({ type: RESET_ERROR });
};
