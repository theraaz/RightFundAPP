import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { charityActionTypes } from '../actions/charity.actions';
const initialCharityState = {
  myCharityProfile: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'charity', whitelist: ['myCharityProfile'] },
  (state = initialCharityState, action) => {
    switch (action.type) {
      case charityActionTypes.AddMyCharityProfile: {
        const { charity } = action.payload;

        return { myCharityProfile: charity };
      }

      case charityActionTypes.UpdateMyCharityProfile: {
        const { charity } = action.payload;

        return { myCharityProfile: { ...state.myCharityProfile, ...charity } };
      }
      case charityActionTypes.ResetCharityState: {
        return initialCharityState;
      }
      default:
        return state;
    }
  },
);

export function* saga() {}
