/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';
import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import * as auth from './utils/reducers/auth.reducer';
import * as charity from './utils/reducers/charity.reducer';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    auth: auth.reducer,
    charity: charity.reducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
export function* rootSaga() {
  yield all([auth.saga()]);
}
