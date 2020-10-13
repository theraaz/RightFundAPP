import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { charityActionTypes } from '../actions/charity.actions';
const initialAuthState = {
  myCharityProfile: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'charity', whitelist: ['myCharityProfile'] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case charityActionTypes.AddMyCharityProfile: {
        const { charity } = action.payload;

        return { myCharityProfile: charity };
      }

      case charityActionTypes.UpdateMyCharityProfile: {
        const { charity } = action.payload;

        return { myCharityProfile: { ...state.myCharityProfile, ...charity } };
      }
      default:
        return state;
    }
  },
);

export function* saga() {}
