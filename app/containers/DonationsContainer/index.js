/**
 *
 * DonationsContainer
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import CampaignTabs from '../../components/CampaignTabs/Loadable';
import CampaignDonations from '../../components/CampaignDonations/index';

export function DonationsContainer(props) {

  console.log('id', props.match.params.id);
  return (
    <div>
      <Helmet>
        <title>Donations Container</title>
        <meta name="description" content="Description of DonationsContainer" />
      </Helmet>
      <CampaignTabs>

        <CampaignDonations />

      </CampaignTabs>
    </div>
  );
}

DonationsContainer.propTypes = {
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
)(DonationsContainer);
