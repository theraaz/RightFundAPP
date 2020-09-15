/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from './constants';

import request from '../../utils/request';
import session from '../../utils/Session';

/**
 * Github repos request/response handler
 */
export function* login({ params }) {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  const requestURL = `${process.env.baseURL}/signin`;

  try {
    // Call our request helper (see 'utils/request')
    const account = yield call(request, requestURL, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email: params.email, password: params.password }),
    });
    session.set(account.response.data.token);
    yield put({
      type: LOGIN_SUCCESS,
      account,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILED,
      error,
    });
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGIN_REQUEST, login);
}

/**
 * Root saga manages watcher lifecycle
 */
// export default function* githubData() {
//   // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
//   // By using `takeLatest` only the result of the latest API call is applied.
//   // It returns task descriptor (just like fork) so we can continue execution
//   // It will be cancelled automatically on component unmount
//   yield takeLatest(LOAD_REPOS, getRepos);
// }
