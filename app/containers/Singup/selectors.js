import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the singup state domain
 */

const selectSingupDomain = state => state.singup || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Singup
 */

const makeSelectSingup = () =>
  createSelector(
    selectSingupDomain,
    substate => substate,
  );

export default makeSelectSingup;
export { selectSingupDomain };
