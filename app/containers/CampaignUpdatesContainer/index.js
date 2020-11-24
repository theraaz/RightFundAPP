/**
 *
 * CampaignUpdatesContainer
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import CampaignTabs from '../../components/CampaignTabs/Loadable';
import CampaignUpdates from '../../components/CampaignUpdates/index';


export function CampaignUpdatesContainer(props) {

  return (
    <div>
      <Helmet>
        <title>Campaign Updates</title>
        <meta
          name="description"
          content="Description of CampaignUpdatesContainer"
        />
      </Helmet>

      <CampaignTabs>

        <CampaignUpdates />

      </CampaignTabs>
    </div>
  );
}

CampaignUpdatesContainer.propTypes = {
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
)(CampaignUpdatesContainer);
