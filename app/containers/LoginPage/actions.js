/*
 *
 * LoginPage actions
 *
 */

import { LOGIN_REQUEST } from './constants';

export function login(email, password) {
  return {
    type: LOGIN_REQUEST,
    params: { email, password },
  };
}
