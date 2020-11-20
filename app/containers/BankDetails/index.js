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

import Layout from '../../components/Layout/index';
import IndividualBankDetailForm from '../../components/CharityBankDetailForm/individualBankDetailForm';
import CharityBankDetailForm from '../../components/CharityBankDetailForm/charityBankDetailForm';

export function BankDetails() {
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
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
        {user.isCharity ? (
          <CharityBankDetailForm />
        ) : (
          <IndividualBankDetailForm title="Please add bank details" />
        )}

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
