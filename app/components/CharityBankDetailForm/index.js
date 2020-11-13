/***
 *
  CharityBankDetailForm
 *
 */

import React, { memo, useEffect } from 'react';
import { Button, FormGroup, Form, Card, Row, Col } from 'react-bootstrap';

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
import FormErrorMessage from '../FormErrorMessage';
import { Alert, AlertTitle } from '@material-ui/lab';
import EmptyComponent from '../EmptyComponent';

const CharityBankDetailForm = ({
  accountNo = 'Bank Name',


}) => {
  const { myCharityProfile } = useSelector(
    ({ charity }) => ({
      myCharityProfile: charity.myCharityProfile,
    }),
    shallowEqual,
  );
  const [loading, setLoading] = React.useState(false);
  const [banksAccounts, setBanksAccounts] = React.useState(null);
  const [charityAccountsID, setCharityAccountsID] = React.useState(null);
  const [networkError, setNetworkError] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const mask = [/\d/, '-', /\d/, '-', /\d/, '-', /\d/];
  // const mask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  useEffect(() => {
    // if (title === 'Individual') {
    bankDetails();
    // } else {
    //   bankDetailsByCharity(myCharityProfile?.id);
    // }
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

  function addBank() {
    setLoading(true);
    addBankDetails()
      .then(({ data }) => {
        openStripeURL(data.response.data.accountInfo.url);

      })
      .catch(() => {
        setLoading(false);
      });
  }

  function updateBank() {
    let id = banksAccounts.id;
    setLoading(true)
    updateBankDetails(id)
      .then(({ data }) => {
        console.log(data);
        openStripeURL(data.response.data.accountInfo.url);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function openStripeURL(url) {
    window.open(url, '_self');
  }

  function bankDetails() {
    setLoading(true);
    setBanksAccounts(null);
    getBankDetails()
      .then(({ data }) => {
        console.log('data', data);
        setLoading(false);
        setCharityAccountsID(null);
        setBanksAccounts(data.response.data?.res);
        if (data.response.data?.res.id) {
          setShowAlert(!data.response.data.res.payoutsEnabled)
        } else {
          setShowAlert(true)

        }
      })
      .catch(error => {
        setLoading(false);
        setNetworkError(true);
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
    <Card className="dataCard shadow mb-5 bg-white">
      <Card.Header className='bankDetailsHeader'>
        <Card.Title className="campaignHeader">
          <span style={{ marginTop: '8px' }}>Bank Details</span>
        </Card.Title>
        {loading ? '' : (banksAccounts?.id ? <Button onClick={updateBank}>Update Account</Button> :
          <Button onClick={addBank}>Add Bank</Button>)}

      </Card.Header>

      {networkError ? (<EmptyComponent height={363} message="Service not availble! Please try again." />) :
        (loading ? (<LoadingComponent />) : (

          <div>
            {banksAccounts?.id ? (
              <div>
                { showAlert ?

                  <Alert severity="error" style={{ marginTop: '5px' }}>
                    <AlertTitle>Not Verified</AlertTitle>
                    Your account is not Verified  —
                    <strong onClick={updateBank} className='updateLink'> Click here to verify</strong>
                  </Alert>
                  : <Alert severity="success" style={{ marginTop: '5px' }}>
                    <AlertTitle>Verified</AlertTitle>
                    Your account is Verified
                    </Alert>
                }


                <Card.Body
                  style={{
                    padding: '1.25rem 20px 1.25rem 20px',
                  }}
                >
                  <Row className="justify-content-center">
                    <Col xs={12} sm={6}>
                      <div className={banksAccounts?.id ? '' : 'bankDetailsAdd'}>

                        <div className={banksAccounts?.id ? 'updateBtnBankDetails' : ''}>
                        </div>
                        <Formik
                          initialValues={{
                            userName: banksAccounts?.bankDetails?.bankName || '',
                            sortCode: banksAccounts?.bankDetails?.accountLast4Digits || '',
                            // accountNumber: banksAccounts?.accountNo || '',
                          }}
                          enableReinitialize
                          validate={validate}
                          onSubmit={handleSubmit}
                        >
                          {({ values, handleSubmit, errors, touched, setFieldValue }) => (
                            <form onSubmit={handleSubmit}>

                              <div>
                                <div>
                                  <label>{accountNo}</label>

                                  <FormGroup style={{ flexGrow: '1' }}>
                                    <CustomTextInputFormik
                                      name="userName"
                                      disabled={true}
                                      placeholder={accountNo}
                                    />
                                  </FormGroup>
                                </div>

                                <div>
                                  <label htmlFor="basic-url">Account last 4 digits</label>

                                  <FormGroup style={{ flexGrow: '1' }}>
                                    <MaskedInput
                                      mask={mask}
                                      isValid={touched['sortCode'] && !errors['sortCode']}
                                      isInvalid={touched['sortCode'] && errors['sortCode']}
                                      className="form-control"
                                      disabled={true}
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
                              </div>

                            </form>
                          )}
                        </Formik>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </div>



            ) :
              <EmptyComponent height={363} message="No Bank Account Found." />
            }

          </div>

        ))}
    </Card>
  );
};

export default memo(CharityBankDetailForm);
