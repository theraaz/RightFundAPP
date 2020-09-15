import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRouter = state => state.router;

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate,
  );

const makeSelectAccount = () =>
  createSelector(
    selectRouter,
    routerState => routerState.account,
  );

const makeSelectLoading = () =>
  createSelector(
    selectRouter,
    routerState => routerState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectRouter,
    routerState => routerState.error,
  );

export default makeSelectLoginPage;
export {
  selectLoginPageDomain,
  makeSelectAccount,
  makeSelectLoading,
  makeSelectError,
};
