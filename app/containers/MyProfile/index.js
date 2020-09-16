/**
 *
 * MyProfile
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
// import HomePage from '../HomePage/Loadable'
import Layout from '../../components/Layout/index';
import { Row, Col, Card, ListGroup, Dropdown, Button, Container, ProgressBar } from 'react-bootstrap';

import { Heading } from './myProfile';

export function MyProfile() {
  return (
    <Layout>

      <Helmet>
        <title>MyProfile</title>
        <meta name="description" content="Description of MyProfile" />
      </Helmet>

      <Card className="dataCard shadow mb-5 bg-white">
        <Card.Header style={{ background: 'transparent' }}>
          <Card.Title className="campaignHeader">
            <span style={{ marginTop: '8px' }}>My Profile</span>


          </Card.Title></Card.Header>

        <Card.Body>

          <Heading>Basic Info</Heading>

        </Card.Body>
      </Card>

    </Layout >
  );
}

MyProfile.propTypes = {
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
)(MyProfile);
