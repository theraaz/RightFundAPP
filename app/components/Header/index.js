/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import { Image } from 'react-bootstrap';
const logo = require('../../images/logo.png');
const profile = require('../../images/dashboard1.png');
import './header.scss';

import { Title, Heading, Description, } from './styled';

const Header = ({ children }) => {
  return (
    <div>
      <div className='header'>
        <div className="img">
          <Image src={logo} fluid />
        </div>
        <div className="profile">
          <Title style={{ margin: '7px 10px' }}>Raza Ahmad</Title>
          <div className='profileImg'>
            <Image src={profile} fluid />
          </div>
        </div>
      </div>
      <div className="header2">
        <div className='container'>
          <Heading>Dasboard</Heading>
          <Description>Welcome to Right Funds</Description>
          {children}
        </div>
      </div>
    </div >
  );
}

Header.propTypes = {};

export default memo(Header);
