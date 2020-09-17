/**
 *
 * Header
 *
 */

import React, { memo, useState } from 'react';
import { Image } from 'react-bootstrap';
const logo = require('../../images/logo.png');
const profile = require('../../images/dashboard1.png');
import './header.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Link } from 'react-router-dom';
import { Title, Heading, Description, } from './styled';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import IconButton from '@material-ui/icons/IconButton';


const Header = ({ children, title, firstName, lastName }) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function logout() {
    console.log('fdfd')
    localStorage.removeItem("token");


  }



  return (
    <div>
      <div className='header'>
        <div className="img">
          <Image src={logo} fluid />
        </div>
        <div className="profile">
          <Title style={{ margin: '7px 10px' }} onClick={handleClick}>{firstName} {lastName}</Title>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            <MenuItem onClick={logout} ><Link className="logout" to="/login">Logout</Link></MenuItem>
          </Menu>
          {/* <IconButton aria-label="delete" className={classes.margin} size="small">
          <ArrowDropDownIcon fontSize="inherit" />
        </IconButton> */}
          <div className='profileImg'>
            <Image src={profile} fluid />
          </div>
        </div>
      </div>
      <div className="header2">
        <div className='container'>
          <Heading>{title}</Heading>
          <Description>Welcome to Right Funds</Description>
          {children}
        </div>
      </div>
    </div >
  );
}

Header.propTypes = {};

export default memo(Header);
