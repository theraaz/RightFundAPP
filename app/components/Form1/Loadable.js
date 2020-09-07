/**
 *
 * Asynchronously loads the component for Form1
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
