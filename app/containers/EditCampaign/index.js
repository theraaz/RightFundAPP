/**
 *
 * EditCampaign
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

export function EditCampaign(props) {
  const [activeLink, setActiveLink] = useState(0);

  return (
    <div>
      <Helmet>
        <title>EditCampaign</title>
        <meta name="description" content="Description of EditCampaign" />
      </Helmet>
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
