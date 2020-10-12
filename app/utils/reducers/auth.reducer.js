import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authActionTypes } from '../actions/auth.actions';

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  isSessionExpired: false,
};

export const reducer = persistReducer(
  { storage, key: 'auth', whitelist: ['user', 'authToken'] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case authActionTypes.Login: {
        const { token, user } = action.payload;

        return { authToken: token, user };
      }

      case authActionTypes.SessionExpired: {
        return { ...state, isSessionExpired: true };
      }
      case authActionTypes.Logout: {
        return initialAuthState;
      }

      case authActionTypes.UpdateUser: {
        const { user } = action.payload;

        return {
          ...state,
          user: { ...state.user, ...user },
        };
      }
      default:
        return state;
    }
  },
);

export function* saga() {}
