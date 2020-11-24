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
  const [campaignData, setCampaignData] = useState([]);

  

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
