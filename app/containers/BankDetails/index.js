/**
 *
 * BankDetails
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';

import {
  Row,
  Col,
  Card,
  Button,
  Spinner,
  FormGroup,
} from 'react-bootstrap';
import Layout from '../../components/Layout/index';
import CustomTextInputFormik from '../../components/inputs/CustomTextInputFormik';

import { Heading } from '../MyProfile/myProfile';
export function BankDetails() {
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(values) {
    console.log('updated');
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
    } else if (!values.confirmAccountNumber) {
      errors.confirmAccountNumber = 'Required';
    } else if (values.confirmAccountNumber != values.accountNumber) {
      errors.confirmAccountNumber = 'Account number and confirm account number should be same ';
    }


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
              <span style={{ marginTop: '8px' }}>My Bank</span>
            </Card.Title>
          </Card.Header>

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
                confirmAccountNumber: '',
              }}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({
                values, handleSubmit, errors, setFieldValue,
              }) => (
                  <form onSubmit={handleSubmit}>
                    <Heading>Bank Info</Heading>
                    <Row>
                      <Col md={6}>
                        <label>Account Holder Name</label>
                        <FormGroup className="mb-3">
                          <CustomTextInputFormik
                            name="userName"
                            placeholder="Account Holder Name"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <label htmlFor="basic-url">Sort Code</label>
                        <FormGroup className="mb-3">
                          <CustomTextInputFormik
                            name="sortCode"
                            placeholder="Sort Code"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <label htmlFor="basic-url">Account Number</label>
                        <FormGroup className="mb-3">
                          <CustomTextInputFormik
                            name="accountNumber"
                            placeholder="Account Number"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <label htmlFor="basic-url">Confirm Account Number</label>
                        <FormGroup className="mb-3">
                          <CustomTextInputFormik
                            name="confirmAccountNumber"
                            placeholder="Confirm Account Number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div style={{ textAlign: 'end' }}>
                      <Button type="submit" className="updateProfileBtn">
                        {!loading && <div>Update</div>}
                        {loading && <Spinner animation="border" size="sm" />}
                      </Button>
                    </div>
                  </form>
                )}
            </Formik>
          </Card.Body>
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
