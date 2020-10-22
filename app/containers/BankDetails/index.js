/**
 *
 * BankDetails
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';

import {
  Row,
  Col,
  Card,

} from 'react-bootstrap';
import Layout from '../../components/Layout/index';
import { getBankDetails, addBankDetails, updateBankDetails, getBankDetailsByCharityId } from '../../utils/crud/bankDetail.crud';
import { useSnackbar } from 'notistack';
import LoadingComponent from '../../components/LoadingComponent';
import { Heading, ToggleHeader } from '../MyProfile/myProfile';

import CharityBankDetailForm from '../../components/CharityBankDetailForm/index';
export function BankDetails() {

  const { myCharityProfile } = useSelector(
    ({ charity }) => ({
      myCharityProfile: charity.myCharityProfile,
    }),
    shallowEqual,
  );

  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [banksAccounts, setBanksAccounts] = React.useState([]);
  const [charityAccountsID, setCharityAccountsID] = React.useState(null);
  const [defaultKey, setDefaultKey] = React.useState("0");

  const handleClickVariant = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };

  function handleSubmit(values) {
    setLoading(true);
    if (banksAccounts.length === 0) {
      addBank(values.userName, values.sortCode, values.accountNumber, charityAccountsID);
    } else {
      updateBank(values.userName, values.sortCode, values.accountNumber, charityAccountsID);
    }
  }

  function addBank(userName, sortCode, accountNumber, charityId = null) {
    addBankDetails(userName, sortCode, accountNumber, charityId)
      .then(({ data }) => {
        handleClickVariant('success', data.response.message);
        bankDetails();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  function updateBank(userName, sortCode, accountNumber) {
    let id = banksAccounts.id;
    updateBankDetails(id, userName, sortCode, accountNumber)
      .then(({ data }) => {
        handleClickVariant('success', data.response.message);
        setLoading(false);
        console.log(data)
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  function bankDetails() {
    // setLoading(true);
    setBanksAccounts([]);
    getBankDetails()
      .then(({ data }) => {
        setLoading(false);
        setCharityAccountsID(null)
        setBanksAccounts(data.response.data.res);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error)
      });
  }

  function bankDetailsByCharity(id) {
    setBanksAccounts([]);
    getBankDetailsByCharityId(id)
      .then(({ data }) => {
        setLoading(false);
        setCharityAccountsID(id)
        setBanksAccounts(data.response.data.res[0]);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error)
      });

  }

  useEffect(() => {
    bankDetails();
  }, []);


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
              <Formik
                initialValues={{
                  userName: banksAccounts?.accountName || '',
                  sortCode: banksAccounts?.sortCode || '',
                  accountNumber: banksAccounts?.accountNo || '',

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
                        loading={loading}
                        banksAccounts={banksAccounts}
                        bankDetailsByCharity={bankDetailsByCharity}
                        bankDetails={bankDetails}
                      />
                    </form>
                  )}
              </Formik>
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
