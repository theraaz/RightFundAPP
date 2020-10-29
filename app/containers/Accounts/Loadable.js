/**
 *
 * Asynchronously loads the component for Accounts
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
