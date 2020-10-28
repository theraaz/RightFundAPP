import React, { useState } from 'react';
import { Formik } from 'formik';
import CustomTextInputFormik from '../inputs/CustomTextInputFormik';
import { createWithdrawal } from '../../utils/crud/withdrawal.crud';
import { useSnackbar } from 'notistack';
import { Spinner } from 'react-bootstrap';

const WithdrawalForm = ({ selectedAccount, getBalance }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const showAlert = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };
  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };
  const validate = values => {
    const errors = {};
    if (!values.amount) {
      errors.amount = 'Required!';
    }
    if (values.password.trim() === '') {
      errors.password = 'Required!';
    }
    return errors;
  };
  const handleSubmit = (values, { resetForm }) => {
    enableLoading();
    createWithdrawal({
      password: values.password,
      accountNo: selectedAccount?.accountNo,
      code: selectedAccount?.sortCode,
      withdrawalAmount: values.amount,
      charityId: selectedAccount?.charityId?.id,
    })
      .then(({ data }) => {
        resetForm({});
        disableLoading();
        showAlert('success', data?.response?.message);
        getBalance();
      })
      .catch(err => {
        disableLoading();
        showAlert(
          'error',
          err?.response?.data?.response?.message || 'Could not withdraw amount',
        );
      });
  };
  return (
    <div className="mt-3">
      <Formik
        initialValues={{
          amount: '',
          password: '',
        }}
        enableReinitialize
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <CustomTextInputFormik
                placeholder="Enter Amount to withdraw"
                name="amount"
                type="number"
              />
            </div>
            <div className="form-group">
              <CustomTextInputFormik
                placeholder="Enter Account Password"
                type="password"
                name="password"
              />
            </div>
            <button
              type="submit"
              disabled={!selectedAccount || loading}
              className="btn btn-primary w-100"
            >
              Withdraw Amount
              {loading && <Spinner animation="border" size="sm" />}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default WithdrawalForm;
