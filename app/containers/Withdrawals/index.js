/**
 *
 * Withdrawals
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';

import {
  Card,
} from 'react-bootstrap';
import Layout from '../../components/Layout/index';

import { useSnackbar } from 'notistack';
import CharityBankDetailForm from '../../components/CharityBankDetailForm/index';

export function Withdrawals() {

  function handleSubmit(values) {
    console.log(values);
  }



  const validate = (
    values,
    props /* only available when using withFormik */,
  ) => {
    const errors = {};
    if (values.userName?.trim() === '') {
      errors.userName = 'Required';
    } else if (values.userName < 3) {
      errors.userName = 'Enter valid name';
    } else if (!values.sortCode) {
      errors.sortCode = 'Required';
    } else if (values.sortCode.length < 3) {
      errors.sortCode = 'Enter valid sort number';
    } else if (!values.accountNumber) {
      errors.accountNumber = 'Required';
    } else if (values.accountNumber.length < 3) {
      errors.accountNumber = 'Enter valid account number';
    }
    //  else if (!values.confirmAccountNumber) {
    //   errors.confirmAccountNumber = 'Required';
    // } 
    // else if (values.confirmAccountNumber != values.accountNumber) {
    //   errors.confirmAccountNumber = 'Account number and confirm account number should be same ';
    // }


    return errors;
  };
  return <>
    <Helmet>
      <title>Withdrawals</title>
      <meta name="description" content="Description of banks" />
    </Helmet>
    <Layout>

      <Card className="dataCard shadow mb-5 bg-white">
        <Card.Header style={{ background: 'transparent' }}>
          <Card.Title className="campaignHeader">
            <span style={{ marginTop: '8px' }}>Withdrawls</span>
          </Card.Title>
        </Card.Header>


        {
          <Card.Body
            style={{
              padding: '1.25rem 20px 1.25rem 20px',
            }}
          >
            <Formik
              initialValues={{
                userName: '',
                sortCode: '',
                accountNumber: '',

              }}
              enableReinitialize
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({
                values, handleSubmit, errors, setFieldValue,
              }) => (
                  <form onSubmit={handleSubmit}>
                    <CharityBankDetailForm
                      subHeading="Individual"
                      setFieldValue={setFieldValue}
                      values={values}
                      errors={errors}
                      loading={false}
                      buttonName='Withdraw'
                      accountNo='Account Number'
                      withdrawlAmount='Withdrawl Amount'
                    />
                  </form>
                )}
            </Formik>
          </Card.Body>
        }
      </Card>

    </Layout>
  </>;
}

Withdrawals.propTypes = {
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
)(Withdrawals);
