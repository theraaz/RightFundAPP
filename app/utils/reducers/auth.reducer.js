import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { takeLatest, put, select } from 'redux-saga/effects';
import { authActionTypes } from '../actions/auth.actions';
import { getCharities } from '../crud/charity.crud';
import { charityActionTypes } from '../actions/charity.actions';
import { charityActions } from '../action-creators/charity.action.creator';
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

export function* saga() {
  yield takeLatest(authActionTypes.Login, function* loadUser() {
    try {
      const { auth } = yield select();
      if (auth.user.isCharity) {
        const { data } = yield getCharities();
        yield put(
          charityActions.addMyCharityProfile(
            data.response?.data?.res?.charityId || null,
          ),
        );
      }
    } catch (e) {
      console.log('e', e.message);
    }
  });
}
