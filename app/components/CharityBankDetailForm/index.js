/***
 *
  CharityBankDetailForm
 *
 */

import React, { memo, useEffect } from 'react';
import { Button, Spinner, FormGroup, Form } from 'react-bootstrap';

import CustomTextInputFormik from '../inputs/CustomTextInputFormik';
import { Heading } from '../../containers/MyProfile/myProfile';
import '../../containers/MyProfile/myProfile.scss';
import { shallowEqual, useSelector } from 'react-redux';
import LoadingComponent from '../LoadingComponent';
import MaskedInput, { conformToMask } from 'react-text-mask';
import { ErrorMessage, Formik } from 'formik';
import {
  addBankDetails,
  getBankDetails,
  getBankDetailsByCharityId,
  updateBankDetails,
} from '../../utils/crud/bankDetail.crud';
import { useSnackbar } from 'notistack';
import FormErrorMessage from '../FormErrorMessage';

const CharityBankDetailForm = ({
  accountNo = 'Account Holder Name',
  withdrawlAmount = 'Account Number',
  title,
}) => {
  const { myCharityProfile } = useSelector(
    ({ charity }) => ({
      myCharityProfile: charity.myCharityProfile,
    }),
    shallowEqual,
  );
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [banksAccounts, setBanksAccounts] = React.useState(null);
  const [charityAccountsID, setCharityAccountsID] = React.useState(null);
  const mask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  const handleClickVariant = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };
  useEffect(() => {
    if (title === 'Individual') {
      bankDetails();
    } else {
      bankDetailsByCharity(myCharityProfile?.id);
    }
  }, []);

  function handleSubmit(values) {
    setLoading(true);
    if (!banksAccounts) {
      addBank(
        values.userName,
        values.sortCode,
        values.accountNumber.toString(),
        charityAccountsID,
      );
    } else {
      updateBank(
        values.userName,
        values.sortCode,
        values.accountNumber,
        charityAccountsID,
      );
    }
  }

  function addBank(userName, sortCode, accountNumber, charityId = null) {
    addBankDetails(userName, sortCode, accountNumber, charityId)
      .then(({ data }) => {
        handleClickVariant('success', data.response.message);
        bankDetails();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function updateBank(userName, sortCode, accountNumber) {
    let id = banksAccounts.id;
    updateBankDetails(id, userName, sortCode, accountNumber)
      .then(({ data }) => {
        handleClickVariant('success', data.response.message);
        setLoading(false);
        console.log(data);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function bankDetails() {
    setLoading(true);
    setBanksAccounts(null);
    getBankDetails()
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
        setCharityAccountsID(null);
        setBanksAccounts(data.response.data?.res);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  }

  function bankDetailsByCharity(id) {
    setLoading(true);
    setBanksAccounts(null);
    getBankDetailsByCharityId(id)
      .then(({ data }) => {
        setLoading(false);
        setCharityAccountsID(id);
        setBanksAccounts(data.response.data.res[0]);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  }
  const validate = values => {
    const errors = {};
    if (values.userName?.trim() === '') {
      errors.userName = 'Required';
    } else if (values.userName < 3) {
      errors.userName = 'Enter valid name';
    } else if (!values.sortCode) {
      errors.sortCode = 'Required';
    } else if (values.sortCode?.replace('_', '').length < 8) {
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
      <Heading>{title}</Heading>
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
        {({ values, handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            {loading ? (
              <LoadingComponent />
            ) : (
              <div>
                <div>
                  <label>{accountNo}</label>

                  <FormGroup style={{ flexGrow: '1' }}>
                    <CustomTextInputFormik
                      name="userName"
                      placeholder={accountNo}
                    />
                  </FormGroup>
                </div>

                <div>
                  <label htmlFor="basic-url">Sort Code</label>

                  <FormGroup style={{ flexGrow: '1' }}>
                    <MaskedInput
                      mask={mask}
                      isValid={touched['sortCode'] && !errors['sortCode']}
                      isInvalid={touched['sortCode'] && errors['sortCode']}
                      className="form-control"
                      placeholder="xx-xx-xx"
                      value={
                        conformToMask(values.sortCode, mask)?.conformedValue
                      }
                      onChange={e => {
                        setFieldValue('sortCode', e.target?.value);
                      }}
                      render={(ref, props) => (
                        <Form.Control ref={ref} {...props} />
                      )}
                    />
                    <ErrorMessage name={'sortCode'} render={FormErrorMessage} />
                  </FormGroup>
                </div>

                <div>
                  <label htmlFor="basic-url">{withdrawlAmount}</label>

                  <FormGroup style={{ flexGrow: '1' }}>
                    <CustomTextInputFormik
                      name="accountNumber"
                      placeholder={withdrawlAmount}
                      type="number"
                    />
                  </FormGroup>
                </div>

                <div
                  style={{
                    textAlign: 'end',
                    marginBottom: '15px',
                  }}
                >
                  <Button type="submit" className="updateProfileBtn">
                    {!loading && <div>{banksAccounts ? 'Update' : 'Add'}</div>}
                    {loading && <Spinner animation="border" size="sm" />}
                  </Button>
                </div>
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default memo(CharityBankDetailForm);
