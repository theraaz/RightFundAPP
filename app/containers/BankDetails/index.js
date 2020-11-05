/**
 *
 * BankDetails
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import { Card, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout/index';

import CharityBankDetailForm from '../../components/CharityBankDetailForm/index';
export function BankDetails() {
  const { myCharityProfile } = useSelector(
    ({ charity }) => ({
      myCharityProfile: charity.myCharityProfile,
    }),
    shallowEqual,
  );
  return (
    <div>
      <Helmet>
        <title>Bank Details</title>
        <meta name="description" content="Description of banks" />
      </Helmet>
      <Layout>
        <Card className="dataCard shadow mb-5 bg-white">
          <Card.Header style={{ background: 'transparent' }}>
            <Card.Title className="campaignHeader">
              <span style={{ marginTop: '8px' }}>Bank Details</span>
            </Card.Title>
          </Card.Header>

          {
            <Card.Body
              style={{
                padding: '1.25rem 20px 1.25rem 20px',
              }}
            >
              <Row className="justify-content-center">
                <Col xs={12} sm={6}>
                  <CharityBankDetailForm title="Individual" />
                </Col>
                {myCharityProfile && (
                  <Col xs={12} sm={6}>
                    <CharityBankDetailForm title="Charity" />
                  </Col>
                )}
              </Row>
            </Card.Body>
          }
        </Card>
      </Layout>
    </div>
  );
}

BankDetails.propTypes = {
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
)(BankDetails);
