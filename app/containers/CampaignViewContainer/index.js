/**
 *
 * CampaignViewContainer
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import CampaignDetail from '../../components/CampaignDetail/Loadable';
import Header from '../../components/Header/Loadable';
import Footer from '../../components/Footer/Loadable';

export function CampaignViewContainer(props) {
  const token = localStorage.getItem('token');
  const [campaignData, setCampaignData] = useState([]);

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
        setCampaignData(user.response.data.res);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Campaign Details</title>
        <meta
          name="description"
          content="Description of CampaignViewContainer"
        />
      </Helmet>
      <Header title={campaignData ? campaignData.title : ''} />
      <CampaignDetail campaignData={campaignData} />
      <Footer />
    </div>
  );
}

CampaignViewContainer.propTypes = {
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
)(CampaignViewContainer);
