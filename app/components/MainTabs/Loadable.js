/**
 *
 * Asynchronously loads the component for MainTabs
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
