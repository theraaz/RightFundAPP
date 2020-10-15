import { charityActionTypes } from '../actions/charity.actions';

export const charityActions = {
  addMyCharityProfile: charity => ({
    type: charityActionTypes.AddMyCharityProfile,
    payload: { charity },
  }),
  updateMyCharityProfile: charity => ({
    type: charityActionTypes.UpdateMyCharityProfile,
    payload: { charity },
  }),
  resetCharityState: () => ({
    type: charityActionTypes.ResetCharityState,
  }),
};
