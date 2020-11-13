/**
 *
 * BankDetails
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

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

        <CharityBankDetailForm title="Please add bank details" />

        {/* {myCharityProfile && (
                  <Col xs={12} sm={6}>
                    <CharityBankDetailForm title="Charity" />
                  </Col>
                )} */}

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
