/**
 *
 * Asynchronously loads the component for MyCampaigns
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
