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
  addCharityTrustee: trustee => ({
    type: charityActionTypes.AddCharityTrustee,
    payload: { trustee },
  }),
  updateCharityTrustee: trustee => ({
    type: charityActionTypes.UpdateCharityTrustee,
    payload: { trustee },
  }),
  removeCharityTrustee: trusteeId => ({
    type: charityActionTypes.RemoveCharityTrustee,
    payload: { trusteeId },
  }),
  resetCharityState: () => ({
    type: charityActionTypes.ResetCharityState,
  }),
};
