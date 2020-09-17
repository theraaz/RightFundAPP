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
import Layout from '../../components/Layout/index';
import { Row, Col, Card, FormControl, Button, Spinner, InputGroup } from 'react-bootstrap';

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


  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
    };

    fetch(`${process.env.baseURL}/account`, requestOptions).then(response => response.json())
      .then(user => {
        setLoading(false);
        if (user.statusCode == 200) {
          console.log(user.response.data.res)
          setFirstName(user.response.data.res.firstName);
          setLastName(user.response.data.res.lastName);
          setEmail(user.response.data.res.email);
        } else {
          setMessage('Something went missing, Please try again');

        }

      }).catch(error => {
        console.log(error)
      });

  }, []);

  const handleClickVariant = (variant, message) => {

    console.log(variant)
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant, anchorOrigin: { horizontal: 'center', vertical: 'bottom' } });
  };

  function updateProfile() {
    setLoading(true);
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      }, body: JSON.stringify({ firstName: firstName, lastName: lastName, password: password })
    };

    fetch(`${process.env.baseURL}/account`, requestOptions).then(response => response.json())
      .then(user => {
        setLoading(false);

        if (user.statusCode == 200) {
          handleClickVariant('success', user.response.message);
          console.log(user)
        } else {
          handleClickVariant('error', user.response.message);
        }

      }).catch(error => {
        console.log(error)
      })
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


          </Card.Title></Card.Header>

        <Card.Body style={{
          padding: '1.25rem 20px 1.25rem 20px'
        }}>

          <Heading>Basic Info</Heading>
          <Row>
            <Col md={6}>
              <label htmlFor="basic-url">First Name</label>
              <InputGroup className="mb-3">

                <FormControl id="basic-url" value={firstName} type='text'
                  onChange={(event) => setFirstName(event.target.value)}
                  aria-describedby="basic-addon3" />
              </InputGroup>

            </Col>
            <Col md={6}>
              <label htmlFor="basic-url">Last Name</label>
              <InputGroup className="mb-3">

                <FormControl id="basic-url" value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  type='text' aria-describedby="basic-addon3" />
              </InputGroup>

            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <label htmlFor="basic-url">Email</label>
              <InputGroup className="mb-3">

                <FormControl id="basic-url" value={email}
                  disabled
                  onChange={(event) => setEmail(event.target.value)}
                  type='email' aria-describedby="basic-addon3" />
              </InputGroup>

            </Col>
            <Col md={6}>
              <label htmlFor="basic-url">Phone Number</label>
              <InputGroup className="mb-3">

                <FormControl id="basic-url" value={phone}
                  type='text'
                  onChange={(event) => setPhone(event.target.value)}
                  aria-describedby="basic-addon3" />
              </InputGroup>

            </Col>
          </Row>
          <Wrapper>
            <Heading>Security</Heading>
            <Chip>Edit</Chip>
          </Wrapper>
          <Row>
            <Col md={6}>
              <label htmlFor="basic-url">Password</label>
              <InputGroup className="mb-3">

                <FormControl id="basic-url" value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type='password' aria-describedby="basic-addon3" />
              </InputGroup>

            </Col>
          </Row>
          <div style={{ textAlign: 'end' }} ><Button className='updateProfileBtn' onClick={updateProfile}>
            {loading == false && <div>Update Profile</div>}
            {loading && <Spinner animation="border" size='sm' />}
          </Button></div>
        </Card.Body>
      </Card>

    </Layout >
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
