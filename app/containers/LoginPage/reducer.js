/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOGIN_FAILED, LOGIN_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  isLoggedIn: false,
  error: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        // return state.set('account', action.account).set('isLoggedIn', true);
        draft.account = action.account;
        break;
      case LOGIN_FAILED:
        draft.error = action.error;
        break;
      // return state.set('error', action.error).set('loading', false);
    }
  });

export default loginPageReducer;
