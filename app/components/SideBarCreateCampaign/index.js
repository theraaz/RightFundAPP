
import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Row, Col, ListGroup, Dropdown, Button, Container, ProgressBar } from 'react-bootstrap/'
import './sideCampaign.scss';
import Form1 from '../Form1/Loadable';

const SideBarCreateCampaign = ({ children }) => {
  const [activeLink, setActiveLink] = useState(0);

  return (
    <div>
      <Container className="mt-n5">
        <Row className='main'>
          <div className="main-box">
            <Col md={3} className='firstCol'>
              <ListGroup variant="flush" className='d-flex flex-row flex-sm-column'>

                <ListGroup.Item className='listItem' onClick={() => setActiveLink(0)}>
                  {console.log(activeLink)}
                  <div className={`text-decoration-none listItem ${activeLink === 0 ? 'active' : ''}`} >
                    <div className='iconImage'>
                      {/* <img src={logo} fluid /> */}
                    </div>


Campaign Information
</div>
                </ListGroup.Item>

                {/* <div className='line'></div> */}
                <ListGroup.Item className='listItem' onClick={() => setActiveLink(1)}>

                  <div className={`text-decoration-none listItem ${activeLink === 1 ? 'active' : ''}`}>
                    <div className='iconImage'>
                      {/* <img src={logo} fluid /> */}
                    </div>
                    Tell your story
                    </div>


                </ListGroup.Item>
                {/* <div className='line'></div> */}

                <ListGroup.Item className='listItem' onClick={() => setActiveLink(2)}>
                  <div className={`text-decoration-none listItem ${activeLink === 2 ? 'active' : ''}`}>
                    <div className='iconImage'>
                      {/* <img src={logo} fluid /> */}
                    </div>


    Campaign Packages
</div>

                </ListGroup.Item>
                {/* <div className='line'></div> */}

                <ListGroup.Item className='listItem' onClick={() => setActiveLink(3)}>
                  <div className={`text-decoration-none listItem ${activeLink === 3 ? 'active' : ''}`}>
                    <div className='iconImage'>
                      {/* <img src={logo} fluid /> */}
                    </div>
                      Campaign Status
                      </div>


                </ListGroup.Item>
                {/* <div className='line'></div> */}


              </ListGroup>
            </Col>
            <Col md={9}>
              {activeLink === 0 && <Form1 />}
              {activeLink === 1 && <div>1</div>}
              {activeLink === 2 && <div>2</div>}
              {activeLink === 3 && <div>3</div>}

            </Col>
          </div>

        </Row>
      </Container>
    </div>
  );
}

SideBarCreateCampaign.propTypes = {};

export default memo(SideBarCreateCampaign);
