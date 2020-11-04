import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { charityActionTypes } from '../actions/charity.actions';
const initialCharityState = {
  myCharityProfile: undefined,
  adminCharity: undefined,
};

export const reducer = persistReducer(
  { storage, key: 'charity', whitelist: ['myCharityProfile'] },
  (state = initialCharityState, action) => {
    switch (action.type) {
      case charityActionTypes.AddMyCharityProfile: {
        const { charity } = action.payload;

        return { myCharityProfile: charity };
      }
      case charityActionTypes.AddAdminCharity: {
        const { charity } = action.payload;

        return { adminCharity: charity };
      }

      case charityActionTypes.UpdateMyCharityProfile: {
        const { charity } = action.payload;

        return { myCharityProfile: { ...state.myCharityProfile, ...charity } };
      }
      case charityActionTypes.AddCharityTrustee: {
        const { trustee } = action.payload;
        const oldTrustees = state.myCharityProfile.trustees || [];
        return {
          myCharityProfile: {
            ...state.myCharityProfile,
            trustees: [...oldTrustees, trustee],
          },
        };
      }
      case charityActionTypes.UpdateCharityTrustee: {
        const { trustee } = action.payload;
        const updatedTrustees = state.myCharityProfile.trustees?.map(t => {
          if (t.id === trustee.id) {
            return trustee;
          } else {
            return t;
          }
        });
        return {
          myCharityProfile: {
            ...state.myCharityProfile,
            trustees: updatedTrustees,
          },
        };
      }
      case charityActionTypes.RemoveCharityTrustee: {
        const { trusteeId } = action.payload;
        const newTrustees = state.myCharityProfile.trustees?.filter(
          trustee => trustee.id !== trusteeId,
        );
        return {
          myCharityProfile: {
            ...state.myCharityProfile,
            trustees: newTrustees,
          },
        };
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
