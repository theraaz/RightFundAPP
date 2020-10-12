import { authActionTypes } from '../actions/auth.actions';

export const authActions = {
  login: data => ({ type: authActionTypes.Login, payload: data }),
  logout: () => ({ type: authActionTypes.Logout }),
  showSessionExpired: () => ({ type: authActionTypes.SessionExpired }),
  updateUser: user => ({ type: authActionTypes.UpdateUser, payload: { user } }),
};
