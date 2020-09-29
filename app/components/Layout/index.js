/**
 *
 * Layout
 *
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Row, Col, Card } from 'react-bootstrap';

import MainTabs from '../MainTabs/Loadable';
import CampaignTabs from '../CampaignTabs/Loadable';


import {
  Title,
  Image,
  Description,
  Heading,
} from '../../containers/HomePage/dashboard-styles';
import '../../containers/HomePage/dashboard.scss';
import Header from '../Header/Loadable';
import Footer from '../Footer/Loadable';

function Layout({ children, activeCard }) {
  const token = localStorage.getItem('token');

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');

  console.log(activeCard);

  useEffect(() => {
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
        if (user.statusCode == 200) {
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

  return (
    <div>
      <Header title="Dasboard" firstName={firstName} lastName={lastName} />
      <div className="container mt-n5" style={{ minHeight: '700px' }}>

        {activeCard === 0 && <Row>

          <Col xs={12} sm={12} md={7}>
            <div className="card card-header-main  shadow bg-white rounded">
              <Row>
                <Col xs={12} sm={5} md={5}>
                  <div className="card-header card-img border-0">
                    <div className="sub-card-img">
                      <Image src="//placehold.it/200" alt="" />
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={7} md={7} className="titleCol">
                  <div className="card-block card-data px-2">
                    <div className="card-title">
                      <Title>
                        {firstName} {lastName}
                      </Title>
                      <p className="card-text">{email}</p>
                    </div>
                    <p>765 Folsan Ave, Suite 600 San Francisco, CADGE 94017</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} sm={12} md={5}>
            <Card className="card-header-main shadow  bg-white">
              <Card.Body className="complaints-data">
                <div className="compaignData">
                  <Row>
                    <Col className="table-col1 tableRight">
                      <Heading>43</Heading>
                      <Description>Total Campaign Created</Description>
                    </Col>
                    <Col className="table-col1">
                      <Heading>71</Heading>
                      <Description>Active Campaign</Description>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="table-col tableRight">
                      <Heading className="mt-4">123</Heading>
                      <Description>Gift Aids</Description>
                    </Col>
                    <Col className="table-col">
                      <Heading className="mt-4">$ 128</Heading>
                      <Description>Total Raised</Description>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        }
        <Row style={activeCard === 0 ? { marginTop: 15, marginBottom: 15 } : { marginBottom: 15 }}>
          <Col sm={12} md={3}>
            <Card className="shadow mb-5 bg-white sideNav dataCard">
              {
                activeCard === 0 ?
                  <MainTabs /> :
                  <CampaignTabs />}
            </Card>
          </Col>
          <Col>
            {children}
            {/* {activeLink == 0 && <MyCampaigns />} */}
            {/* {activeLink == 0 && <MyCampaigns />} */}
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

Layout.propTypes = {};

export default memo(Layout);
