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
import Layout from '../../components/Layout';
export function TeamsMembers() {
  return (
    <Layout>
      <Helmet>
        <title>TeamsMembers</title>
        <meta name="description" content="Description of TeamsMembers" />
      </Helmet>
    </Layout>
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
