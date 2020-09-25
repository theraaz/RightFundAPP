/**
 *
 * CampaignCreate
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import './createCampaign.scss'
import { compose } from 'redux';

import Header from '../../components/Header/Loadable';
import SideBarCreateCampaign from '../../components/SideBarCreateCampaign/Loadable';
import Footer from '../../components/Footer/Loadable';


export function CampaignCreate() {
  return (
    <div>
      <Helmet>
        <title>Create Campaign</title>
        <meta name="description" content="Description of CampaignCreate" />
      </Helmet>
      <Header title="Create Campaign" />
      <SideBarCreateCampaign />
        
     
      <Footer />
    </div>
  );
}

CampaignCreate.propTypes = {
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
)(CampaignCreate);
