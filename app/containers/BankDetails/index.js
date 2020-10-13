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
import Layout from '../../components/Layout/index';
import { Formik } from 'formik';

import {
  Row,
  Col,
  Card,
  Button,
  Spinner,
  FormGroup,
} from 'react-bootstrap';
import CustomTextInputFormik from '../../components/inputs/CustomTextInputFormik';

import { Heading } from '../MyProfile/myProfile';
export function BankDetails() {
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(values) {
    console.log('updated')
  }

  const validate = (
    values,
    props /* only available when using withFormik */,
  ) => {
    const errors = {};
    console.log(values);
    if (values.bankName?.trim() === '') {
      errors.bankName = 'Required';
    } else if (values.bankName < 3) {
      errors.bankName = 'Enter valid name';
    } else if (!values.accountNumber) {
      errors.accountNumber = 'Required';
    } else if (values.accountNumber.length < 3) {
      errors.accountNumber = 'Enter valid account number';
    } else if (!values.bankCode) {
      errors.bankCode = 'Required';
    } else if (values.bankCode.length < 3) {
      errors.bankCode = 'Enter valid bank code';
    } else if (!values.bankCity) {
      errors.bankCity = 'Required';
    } else if (values.bankCity.length < 3) {
      errors.bankCity = 'Enter valid bank city';
    }


    return errors;
  };

  return <div>
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
              bankName: '',
              accountNumber: '',
              bankCode: '',
              bankCity: '',
            }}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values, handleSubmit, errors, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Heading>Bank Info</Heading>
                <Row>
                  <Col md={6}>
                    <label>Bank Name</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="bankName"
                        placeholder="Bank Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="basic-url">Account Number</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="accountNumber"
                        placeholder="Account Number"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label htmlFor="basic-url">Bank Code</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="bankCode"
                        placeholder="Bank Code"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="basic-url">Bank City</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="bankCity"
                        placeholder="Bank City"
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
