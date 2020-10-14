/**
 *
 * TeamsMembers
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

export function TeamsMembers() {
  return (
    <div>
      <Helmet>
        <title>TeamsMembers</title>
        <meta name="description" content="Description of TeamsMembers" />
      </Helmet>
    </div>
  );
}

TeamsMembers.propTypes = {
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
)(TeamsMembers);
