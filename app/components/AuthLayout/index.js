/**
 *
 * AuthLayout
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Title, Wrapper } from '../../styles/styles';
import './auth.scss';
import { Image } from 'react-bootstrap';

const logo = require('../../images/logo.png');

const AuthLayout = ({ children, title, description }) => {
  return (
    <div className="main-div">
      <div className="container">
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Please do login" />
        </Helmet>
        <Wrapper>
          <div className="main-container">
            <div className="inner-box">
              <div className="row">
                <div className="col-6 pr-0 fistCol">
                  <div className="pag1" >
                    <div className="logo">
                      <Image src={logo} fluid />
                    </div>
                  </div>
                </div>

                <div className="col-6 pl-0">
                  <div className="form-main-div">
                    <div className="heading">
                      <Title>{title}</Title>
                      <div className="bar"></div>
                    </div>

                    <p className="para">{description}</p>

                    {children}
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

AuthLayout.propTypes = {};

export default memo(AuthLayout);
