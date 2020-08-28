/**
 *
 * LoginPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';

import './login.scss'


import { Button, Image, Form, Row, Col } from 'react-bootstrap';


const logo = require('../../images/logo.png');

import styled from 'styled-components';
export function LoginPage() {
  useInjectReducer({ key: 'loginPage', reducer });

  const Wrapper = styled.section`
  padding: 4em 10em;
  height: 100vh;
`;


  const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #f15a24;
  font-weight: 700;
`;

  return (
    <div className="main-div">
      <div className="container">
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Please do login" />
        </Helmet>

        <Wrapper>
          {/* <Title>
            Hello this is your first styled component!
           </Title> */}
          <div className="main-container">
            <div className="inner-box">
              <div className="row">
                <div className="col-6 pr-0">
                  <div className="pag1" >
                    <div className="logo">
                      <Image src={logo} fluid />
                    </div>
                  </div>
                </div>
                <div className="col-6 pl-0">

                  <div className="heading">
                    <Title>Login</Title>
                    <div className="bar"></div>
                  </div>

                  <p className="para">When we wanted to make a real difference, we created Right Fund.</p>

                  <div className="Login">
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
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
)(LoginPage);
