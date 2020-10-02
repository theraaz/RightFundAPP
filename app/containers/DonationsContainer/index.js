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
import CampaignDonations from '../../components/CampaignDonations/Loadable';

export function DonationsContainer(props) {
  const [editCampaignData, setEditCampaignData] = useState();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    fetch(
      `${process.env.baseURL}/campaign/${props.match.params.id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(user => {
        console.log(user.response.data.res);
        setEditCampaignData(user.response.data.res);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  console.log('id', props.match.params.id);
  return (
    <div>
      <Helmet>
        <title>Donations Container</title>
        <meta name="description" content="Description of DonationsContainer" />
      </Helmet>
      <CampaignTabs>

        <CampaignDonations editCampaignData={editCampaignData} />

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
