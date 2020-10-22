/**
 *
 * AuthLayout
 *
 */

import React, { memo } from 'react';
import { Title, Wrapper } from '../../styles/styles';
import './auth.scss';
import { Image } from 'react-bootstrap';

const logo = require('../../images/logo.png');

const AuthLayout = ({ children, title, description }) => {
  return (
    <div className="main-div" style={{ height: '100%' }}>
      <div className="container" style={{ height: '100%' }}>

        <Wrapper>
          <div className="main-container">
            <div className="inner-box">
              <div className="row">
                <div className="col-6 pr-0 fistCol">
                  <div className="pag1" >
                    <div className="logo">
                      <Image src={logo} fluid />

                    </div>
                    <div className='paraG'>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </p>
                    </div>
                  </div>

                </div>

                <div className="col-6 pl-0 secondCol">
                  <div className="secondColLogo">
                    <Image src={logo} fluid />
                  </div>
                  <div className={`${title === 'Signup' ? 'form-main-div-signup' : 'form-main-div'}`} >

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
