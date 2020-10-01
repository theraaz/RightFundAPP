/**
 *
 * Header
 *
 */

import React, { memo, useState } from 'react';
import { Image, Dropdown } from 'react-bootstrap';
import './header.scss';

import { Title, Heading, Description } from './styled';
const logo = require('../../images/logo.png');
const profile = require('../../images/placeholder.png');
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import IconButton from '@material-ui/icons/IconButton';

const Header = ({ children, title, firstName, lastName }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function logout() {
    console.log('fdfd');
    localStorage.removeItem('token');
  }



  return (
    <div className="shadow">
      <div className="header">
        <div className="img">
          <Image src={logo} fluid />
        </div>
        <div className="profile">

          <Dropdown className="dropper">
            <Dropdown.Toggle id="dropdown-basic" className="dropBtn">
              {firstName} {lastName}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item className="dropItem" href="profile">
                <svg id="Layer_1" height="20" viewBox="0 0 480.001 480.001" width="20" ><path d="m319.427 342.172c-11.782 0-22.472-6-28.594-16.051-2.299-3.774-7.222-4.97-10.994-2.671-3.772 2.298-4.969 7.221-2.67 10.994 4.258 6.99 10.022 12.634 16.732 16.673l-8.291 37.627-19.989-23.017c3.629-4.172 2.753-9.046-.373-11.764-3.332-2.898-8.386-2.547-11.286.787l-14.066 16.176-35.432-39.369c3.015-5.79 4.843-12.146 5.365-18.77 68.574 20.186 137.171-31.569 137.171-102.662v-66.125c0-4.418-3.582-8-8-8s-8 3.582-8 8v66.125c0 50.177-40.822 91-91 91s-91-40.822-91-91v-67.893c19.503-1.107 36.092-13.352 42.004-35.544 33.31 21.332 70.648 35.153 109.832 40.638 4.392.612 8.422-2.451 9.032-6.814.612-4.375-2.438-8.419-6.813-9.032-39.9-5.585-78.836-20.518-113.433-45.01-5.289-3.746-12.654.065-12.622 6.581.001.199-.074 20.04-15.124 29.094-9.517 5.726-19.143 3.877-20.799 3.859-4.089-.039-7.554 3.029-8.02 7.076-.088.774-.057-1.861-.057 64.016-5.344-2.772-9-8.288-9-14.636v-97.46c0-10.477 8.523-19 19-19 3.271 0 6.213-1.992 7.428-5.029 10.928-27.319 37-44.971 66.424-44.971h68.607c39.449 0 71.541 32.093 71.541 71.541v94.919c0 4.418 3.582 8 8 8s8-3.582 8-8v-94.919c0-48.27-39.27-87.541-87.541-87.541h-68.607c-34.32 0-64.917 19.63-79.285 50.421-16.728 2.619-29.567 17.128-29.567 34.579v97.46c0 15.305 10.708 28.168 25.081 31.621 1.493 40.859 26 75.943 60.919 92.639v2.11c0 8.913-3.476 17.287-9.787 23.581-11.193 11.161-25.298 9.761-23.642 9.761-45.636 0-82.571 36.93-82.571 82.571v47.257c0 4.418 3.582 8 8 8s8-3.582 8-8v-47.257c0-36.795 29.775-66.572 66.573-66.571 3.501 0 6.996-.372 10.452-1.111l11.163 50.66c1.413 6.415 9.551 8.476 13.853 3.524l15.761-18.148-9.739 77.911c-.548 4.384 2.563 8.382 6.946 8.93 4.392.547 8.383-2.568 8.931-6.946l11.255-90.041c.509.565 4.956 5.552 5.526 6.055 3.302 2.898 8.332 2.604 11.268-.707 1.582-1.811-2.51 2.892 4.798-5.512l11.275 90.204c.547 4.378 4.537 7.494 8.931 6.946 4.384-.548 7.494-4.546 6.946-8.93l-9.739-77.911 15.761 18.148c4.308 4.961 12.442 2.88 13.853-3.524l11.163-50.662c3.389.72 6.883 1.112 10.451 1.112 36.794.001 66.572 29.775 66.572 66.573v47.257c0 4.418 3.582 8 8 8s8-3.582 8-8v-47.257c0-45.637-36.931-82.573-82.573-82.571zm-125.037 46.572-8.293-37.638c3.05-1.842 5.911-4.035 8.548-6.543l19.396 21.552z" /></svg>

                <span> Profile</span>
              </Dropdown.Item>

              <Dropdown.Item className="dropItem" href="login" onClick={logout}>


                <svg version="1.1" id="Capa_1" height="20" width="20"
                  viewBox="0 0 490.3 490.3">
                  <g>
                    <g>
                      <path d="M0,121.05v248.2c0,34.2,27.9,62.1,62.1,62.1h200.6c34.2,0,62.1-27.9,62.1-62.1v-40.2c0-6.8-5.5-12.3-12.3-12.3
			s-12.3,5.5-12.3,12.3v40.2c0,20.7-16.9,37.6-37.6,37.6H62.1c-20.7,0-37.6-16.9-37.6-37.6v-248.2c0-20.7,16.9-37.6,37.6-37.6h200.6
			c20.7,0,37.6,16.9,37.6,37.6v40.2c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-40.2c0-34.2-27.9-62.1-62.1-62.1H62.1
			C27.9,58.95,0,86.75,0,121.05z"/>
                      <path d="M385.4,337.65c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l83.9-83.9c4.8-4.8,4.8-12.5,0-17.3l-83.9-83.9
			c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l63,63H218.6c-6.8,0-12.3,5.5-12.3,12.3c0,6.8,5.5,12.3,12.3,12.3h229.8l-63,63
			C380.6,325.15,380.6,332.95,385.4,337.65z"/>
                    </g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                  <g>
                  </g>
                </svg>

                <span>Logout</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* <Title style={{ margin: '7px 10px' }} onClick={handleClick}>
            {firstName} {lastName}
          </Title>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <MenuItem onClick={logout}>
              <Link className="logout" to="/login">
                Logout
              </Link>
            </MenuItem>
          </Menu> */}

          <div className="profileImg">
            <Image src={profile} style={{ borderRadius: '50px' }} fluid />
          </div>
        </div>
      </div>
      <div className="header2">
        <div className="container">
          <Heading>{title}</Heading>
          <Description>Welcome to Right Funds</Description>
          {children}
        </div>
      </div>
    </div >
  );
};

Header.propTypes = {};

export default memo(Header);
