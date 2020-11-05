/**
 *
 * SubsCampaignContiner
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CampaignTabs from '../../components/CampaignTabs/Loadable';
import SubsCampaign from '../../components/SubsCampaign/index';
import { Helmet } from 'react-helmet';


export function SubsCampaignContiner() {
  return (
    <div>
      <Helmet>
        <title>Subs Campaign</title>
        <meta
          name="description"
          content="Description of CampaignUpdatesContainer"
        />
      </Helmet>

      <CampaignTabs>

        <SubsCampaign />

      </CampaignTabs>
    </div>);
}

SubsCampaignContiner.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SubsCampaignContiner);
