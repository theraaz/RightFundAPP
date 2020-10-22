/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/**
 *
 * MyProfile
 *
 */

import React, { memo } from 'react';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Formik } from 'formik';

import {
  Row,
  Col,
  Card,
  FormControl,
  Button,
  Spinner,
  FormGroup,
} from 'react-bootstrap';
import { useSnackbar } from 'notistack';
import Layout from '../../components/Layout/index';

import { Heading, Chip, Wrapper } from './myProfile';
import './myProfile.scss';

import Address from '../../components/Address/Loadable';
import CustomTextInputFormik from '../../components/inputs/CustomTextInputFormik';
import { updateProfile } from '../../utils/crud/auth.crud';
import { authActions } from '../../utils/action-creators/auth.action.creator';

export function MyProfile({ updateUser }) {
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual,
  );
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [changePassword, setChangePassword] = React.useState(false);

  const handleClickVariant = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };

  function onSubmit(values) {
    setLoading(true);
    const address = {
      line1: values.line1,
      line2: values.line2,
      city: values.city,
      state: values.state,
      country: values.country,
    };
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      bio: values.bio,
      address: JSON.stringify(address),
    };
    const changePasswordData = changePassword
      ? {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }
      : {};
    updateProfile({
      ...data,
      ...changePasswordData,
    })
      .then((res) => {
        setLoading(false);

        if (res.status === 200) {
          handleClickVariant('success', res.data.response.message);
          updateUser(data);
        } else {
          handleClickVariant('error', res.data.response.message);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }

  const validate = (
    values,
  ) => {
    const errors = {};
    if (values.firstName?.trim() === '') {
      errors.firstName = 'Required';
    } else if (values.firstName < 3) {
      errors.firstName = 'Enter valid name';
    } else if (!values.lastName) {
      errors.lastName = 'Required';
    } else if (values.lastName.length < 3) {
      errors.lastName = 'Enter valid last name';
    }

    if (changePassword) {
      if (!values.newPassword) {
        errors.newPassword = 'Required';
      } else if (values.newPassword.length < 3) {
        errors.newPassword = 'Enter valid password';
      } else if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
      } else if (values.confirmPassword.length < 3) {
        errors.confirmPassword = 'Enter valid password';
      } else if (values.newPassword !== values.confirmPassword) {
        errors.confirmPassword = 'Enter valid password';
      } else if (!values.oldPassword) {
        errors.oldPassword = 'Required';
      } else if (values.oldPassword.length < 3) {
        errors.oldPassword = 'Enter valid password';
      }
    }
    return errors;
  };
  const userAddress = user ? JSON.parse(user?.address) : '';
  return (
    <Layout>
      <Helmet>
        <title>MyProfile</title>
        <meta name="description" content="Description of MyProfile" />
      </Helmet>

      <Card className="dataCard shadow mb-5 bg-white">
        <Card.Header style={{ background: 'transparent' }}>
          <Card.Title className="campaignHeader">
            <span style={{ marginTop: '8px' }}>My Profile</span>
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
              bio: user.bio || '',
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
              line1: userAddress ? userAddress.line1 || '' : '',
              line2: userAddress ? userAddress.line2 || '' : '',
              city: userAddress ? userAddress.city || '' : '',
              state: userAddress ? userAddress.state || '' : '',
              country: userAddress ? userAddress.country || '' : '',
            }}
            validate={validate}
            onSubmit={onSubmit}
          >
            {({
              values, handleSubmit, errors, setFieldValue,
            }) => (
                <form onSubmit={handleSubmit}>
                  <Heading>Basic Info</Heading>
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
                  </Row>

                  <Row>
                    <Col md={12}>
                      <label>Bio</label>
                      <FormGroup className="mb-3">
                        <CustomTextInputFormik
                          name="bio"
                          placeholder="Enter Bio"
                          as="textarea"
                          rows={4}
                          maxLength="250"
                        />
                        <p className='bioLimit'>Limit {values.bio.length}/250  </p>
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup
                    controlId="address"
                    bssize="large"
                    className="address"
                  >
                    <div className="locationLabel">Add a location</div>
                    <Address
                      setFieldValue={setFieldValue}
                      values={values}
                      errors={errors}
                    />
                  </FormGroup>

                  <Wrapper>
                    {changePassword ? (
                      <Heading>Change Password</Heading>
                    ) : (
                        <Heading>Security</Heading>
                      )}
                    <Chip onClick={() => setChangePassword(!changePassword)}>
                      <svg
                        id="Capa_1"
                        className="profile-icon"
                        viewBox="0 0 512.019 512.019"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <path d="m500.076 61.086-9.921-9.92c-2.928-2.929-7.677-2.928-10.605 0-2.929 2.929-2.928 7.677 0 10.605l9.921 9.92c10.063 10.063 10.063 26.436 0 36.499l-13.673 13.673-85.633-85.633 13.673-13.673c10.063-10.063 26.436-10.063 36.499 0l14.515 14.515c2.928 2.928 7.677 2.928 10.605 0 2.929-2.928 2.929-7.677 0-10.605l-14.515-14.515c-7.707-7.707-17.954-11.952-28.855-11.952-10.9 0-21.148 4.245-28.855 11.952l-300.549 300.549c-2.929 2.928-2.929 7.677 0 10.605 2.928 2.928 7.677 2.928 10.605 0l243.22-243.22 37.514 37.514-308.452 308.448-24.506-11.011c-.887-.398-1.594-1.106-1.992-1.991l-11.013-24.508 40.611-40.611c2.929-2.928 2.929-7.677 0-10.605-2.928-2.928-7.677-2.928-10.605 0 0 0-44.345 44.363-44.388 44.408-1.935 2.03-2.156 4.862-2.663 7.511-.42 2.192-20.644 107.721-20.783 108.447-.764 3.986.493 8.079 3.363 10.95 2.317 2.317 5.431 3.583 8.643 3.583.766 0 1.539-.072 2.307-.22 0 0 112.164-21.496 112.221-21.508 1.271-.257 2.701-.967 3.685-1.885.063-.059 369.629-369.611 369.629-369.611 15.908-15.911 15.908-41.8-.003-57.711zm-479.135 408.014.402-2.098 23.684 23.684-.111.021-29.189 5.594zm41.886 18.175-38.073-38.073 7.239-37.771 3.397 7.56c1.904 4.238 5.286 7.62 9.525 9.526l26.627 11.964 11.967 26.631c1.904 4.237 5.287 7.619 9.524 9.523l7.566 3.4zm60.865-13.305-24.51-11.015c-.886-.398-1.594-1.106-1.992-1.992l-11.014-24.511 308.453-308.447 37.514 37.514zm319.055-319.055-85.633-85.633 22.446-22.446 85.633 85.633z" />
                        </g>
                      </svg>
                    </Chip>
                  </Wrapper>

                  <div>
                    {!changePassword ? (
                      <Row>
                        <Col md={6}>
                          <label htmlFor="basic-url"> Password</label>
                          <FormGroup className="mb-3">
                            <FormControl
                              id="basic-url"
                              disabled
                              value="zxcvbnm,asdfghjk"
                              type="password"
                              aria-describedby="basic-addon3"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    ) : (
                        ''
                      )}
                  </div>
                  {changePassword ? (
                    <div>
                      <Row>
                        <Col md={6}>
                          <label htmlFor="basic-url">New Password</label>
                          <FormGroup className="mb-3">
                            <CustomTextInputFormik
                              name="newPassword"
                              placeholder="New Password"
                              type="password"
                            />
                          </FormGroup>
                        </Col>

                        <Col md={6}>
                          <label htmlFor="basic-url">Confirm Password</label>
                          <FormGroup className="mb-3">
                            <CustomTextInputFormik
                              name="confirmPassword"
                              placeholder="Confirm Password"
                              type="password"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <label htmlFor="basic-url">Old Password</label>
                          <FormGroup className="mb-3">
                            <CustomTextInputFormik
                              name="oldPassword"
                              placeholder="Old Password"
                              type="password"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                      ''
                    )}
                  <div style={{ textAlign: 'end' }}>
                    <Button type="submit" className="updateProfileBtn">
                      {!loading && <div>Update Profile</div>}
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

const withConnect = connect(
  null,
  authActions,
);

export default compose(
  withConnect,
  memo,
)(MyProfile);
