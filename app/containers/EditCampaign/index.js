/**
 *
 * EditCampaign
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import Header from '../../components/Header/Loadable';
import SideBarCreateCampaign from '../../components/SideBarCreateCampaign/Loadable';
import Footer from '../../components/Footer/Loadable';

export function EditCampaign(props) {
  console.log('id', props.match.params.id);
  const [editCampaignData, setEditCampaignData] = useState(null);
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

  return (
    <div>
      <Helmet>
        <title>Edit Campaign</title>
        <meta name="description" content="Description of EditCampaign" />
      </Helmet>
      <Header title="Edit Campaign" />
      <SideBarCreateCampaign editCampaignData={editCampaignData} />

      <Footer />
    </div>
  );
}

EditCampaign.propTypes = {
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
)(EditCampaign);
