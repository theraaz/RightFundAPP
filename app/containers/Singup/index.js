/**
 *
 * Singup
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSingup from './selectors';
import reducer from './reducer';
import Layout from '../../components/AuthLayout'

export function Singup() {
  useInjectReducer({ key: 'singup', reducer });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [asCharity, setAsCharity] = useState(false);
  const [charityName, setCharityName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && fname.length > 0 && lname.length > 0;
  }

  function handleSubmit(event) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: fname, lastName: lname, email: email, password: password, isCharity: asCharity })
    };
    fetch('http://192.168.18.119:4000/signup', requestOptions).then(response => response.json())
      .then(user => console.log(user));
    event.preventDefault();
  }

  return (
    <div>
      <Layout title={'Signup'} description={'Enter your detail below.'}></Layout>
    </div>
  );
}

Singup.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  singup: makeSelectSingup(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Singup);
