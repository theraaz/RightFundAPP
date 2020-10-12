/**
 *
 * CharityProfileIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import Layout from '../../components/Layout';
import {
  Button,
  Card,
  Col,
  FormControl,
  FormGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { Chip, Heading, Wrapper } from '../MyProfile/myProfile';
import CustomTextInputFormik from '../../components/inputs/CustomTextInputFormik';
import Address from '../../components/Address/Loadable';
import { updateProfile } from '../../utils/crud/auth.crud';
import { useSnackbar } from 'notistack';

export function CharityProfile() {
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual,
  );
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, message) => {
    console.log(variant);
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };

  function handleSubmit(values) {}

  const validate = (
    values,
    props /* only available when using withFormik */,
  ) => {
    const errors = {};
    console.log(values);
    if (values.firstName?.trim() === '') {
      errors.firstName = 'Required';
    } else if (values.firstName < 3) {
      errors.firstName = 'Enter valid name';
    } else if (!values.lastName) {
      errors.lastName = 'Required';
    } else if (values.lastName.length < 3) {
      errors.lastName = 'Enter valid last name';
    }

    return errors;
  };
  return (
    <Layout>
      <Helmet>
        <title>CharityProfileIcon</title>
        <meta name="description" content="Description of CharityProfileIcon" />
      </Helmet>
      <Card className="dataCard shadow mb-5 bg-white">
        <Card.Header style={{ background: 'transparent' }}>
          <Card.Title className="campaignHeader">
            <span style={{ marginTop: '8px' }}>Charity Profile</span>
          </Card.Title>
        </Card.Header>

        <Card.Body
          style={{
            padding: '1.25rem 20px 1.25rem 20px',
          }}
        >
          <Formik
            initialValues={{
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              email: user.email || '',
              phoneNumber: user.phoneNumber || '',
              position: user.position || '',
            }}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values, handleSubmit, errors, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Heading>User Info</Heading>
                <Row>
                  <Col md={6}>
                    <label>First Name</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="firstName"
                        placeholder="First Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="basic-url">Last Name</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="lastName"
                        placeholder="Last Name"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label htmlFor="basic-url">Email</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="email"
                        placeholder="Email"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="basic-url">Phone Number</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="phoneNumber"
                        placeholder="Phone Number"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="basic-url">Position</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="position"
                        placeholder="User Position"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="basic-url">Website</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="website"
                        placeholder="Website"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <div style={{ textAlign: 'end' }}>
                  <Button type="submit" className="updateProfileBtn">
                    {!loading && <div>Save</div>}
                    {loading && <Spinner animation="border" size="sm" />}
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Layout>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(CharityProfile);
