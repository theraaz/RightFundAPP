/**
 *
 * DonationsContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

export function DonationsContainer() {
  return (
    <div>
      <Helmet>
        <title>Donations Container</title>
        <meta name="description" content="Description of DonationsContainer" />
      </Helmet>
      
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
