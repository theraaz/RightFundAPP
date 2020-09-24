/**
 *
 * MyProfile
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
// import HomePage from '../HomePage/Loadable'
import {
  Row,
  Col,
  Card,
  FormControl,
  Button,
  Spinner,
  InputGroup,
} from 'react-bootstrap';
import Layout from '../../components/Layout/index';

import { Heading, Chip, Wrapper } from './myProfile';
import './myProfile.scss';

import { useSnackbar } from 'notistack';

export function MyProfile() {
  const token = localStorage.getItem('token');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [changePassword, setChangePassword] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    fetch(`${process.env.baseURL}/account`, requestOptions)
      .then(response => response.json())
      .then(user => {
        setLoading(false);
        if (user.statusCode == 200) {
          console.log(user.response.data.res);
          setFirstName(user.response.data.res.firstName);
          setLastName(user.response.data.res.lastName);
          setEmail(user.response.data.res.email);
        } else {
          setMessage('Something went missing, Please try again');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleClickVariant = (variant, message) => {
    console.log(variant);
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };

  function updateProfile() {
    setLoading(true);
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        password,
      }),
    };

    fetch(`${process.env.baseURL}/account`, requestOptions)
      .then(response => response.json())
      .then(user => {
        setLoading(false);

        if (user.statusCode == 200) {
          handleClickVariant('success', user.response.message);
          console.log(user);
        } else {
          handleClickVariant('error', user.response.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

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
          <Heading>Basic Info</Heading>
          <Row>
            <Col md={6}>
              <label htmlFor="basic-url">First Name</label>
              <InputGroup className="mb-3">
                <FormControl
                  id="basic-url"
                  value={firstName}
                  type="text"
                  onChange={event => setFirstName(event.target.value)}
                  aria-describedby="basic-addon3"
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <label htmlFor="basic-url">Last Name</label>
              <InputGroup className="mb-3">
                <FormControl
                  id="basic-url"
                  value={lastName}
                  onChange={event => setLastName(event.target.value)}
                  type="text"
                  aria-describedby="basic-addon3"
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <label htmlFor="basic-url">Email</label>
              <InputGroup className="mb-3">
                <FormControl
                  id="basic-url"
                  value={email}
                  disabled
                  onChange={event => setEmail(event.target.value)}
                  type="email"
                  aria-describedby="basic-addon3"
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <label htmlFor="basic-url">Phone Number</label>
              <InputGroup className="mb-3">
                <FormControl
                  id="basic-url"
                  value={phone}
                  type="text"
                  onChange={event => setPhone(event.target.value)}
                  aria-describedby="basic-addon3"
                />
              </InputGroup>
            </Col>
          </Row>
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
                  <InputGroup className="mb-3">
                    <FormControl
                      id="basic-url"
                      disabled
                      value="zxcvbnm,asdfghjk"
                      type="password"
                      aria-describedby="basic-addon3"
                    />
                  </InputGroup>
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
                  <InputGroup className="mb-3">
                    <FormControl
                      id="basic-url"
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                      type="password"
                      aria-describedby="basic-addon3"
                    />
                  </InputGroup>
                </Col>

                <Col md={6}>
                  <label htmlFor="basic-url">Confirm Password</label>
                  <InputGroup className="mb-3">
                    <FormControl
                      id="basic-url"
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                      type="password"
                      aria-describedby="basic-addon3"
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <label htmlFor="basic-url">Old Password</label>
                  <InputGroup className="mb-3">
                    <FormControl
                      id="basic-url"
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                      type="password"
                      aria-describedby="basic-addon3"
                    />
                  </InputGroup>
                </Col>
              </Row>
            </div>
          ) : (
            ''
          )}
          <div style={{ textAlign: 'end' }}>
            <Button className="updateProfileBtn" onClick={updateProfile}>
              {loading == false && <div>Update Profile</div>}
              {loading && <Spinner animation="border" size="sm" />}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Layout>
  );
}

MyProfile.propTypes = {
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
)(MyProfile);
