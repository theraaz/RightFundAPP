
import React from 'react';
import { Row, Col, Card, ListGroup } from 'react-bootstrap/'
import Header from '../../components/Header/Loadable';

import './dashboard.scss';
import { Title, Image, Description, Heading } from './dashboard-styles';

import { ReactLogo } from '../../images/icons/speaker.svg';
const logo = require('../../images/icons/speaker.svg');

export default function HomePage() {
  return (
    <Header>
      <Row>
        <Col xs={7}>
          <div class="card card-header-main flex-row flex-wrap">
            <div class="card-header card-img border-0">
              <Image src="//placehold.it/200" alt="" /> </div>
            <div class="card-block card-data px-2">
              <div className="card-title">
                <Title>Raza Ahmed</Title>
                <p class="card-text">razaahmed@rightfunds.com</p>
              </div>
              <p>765 Folsan Ave, Suite 600 San Francisco, CADGE 94017</p>
            </div>
          </div>
        </Col>
        <Col>
          <Card className='card-header-main'>
            <Card.Body className='complaints-data'>
              <div>
                <Row>
                  <Col className='table-col'>
                    <Heading>43</Heading>
                    <Description>Total Campaign Created</Description>
                  </Col>
                  <Col className='table-col'>
                    <Heading>71</Heading>
                    <Description>Active Campaign</Description>
                  </Col>
                </Row>
                <Row>
                  <Col className='table-col'>
                    <Heading>123</Heading>
                    <Description>Gift Aids</Description>
                  </Col>
                  <Col className='table-col'>
                    <Heading>$ 128</Heading>
                    <Description>Total Raised</Description>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: 15, marginBottom: 15 }}>
        <Col md={3}>
          <Card style={{ height: '34rem' }}>
            <ListGroup variant="flush">
              <ListGroup.Item className='listItem'>

                <div className='iconImage'>
                  <Image src={logo} fluid />
                </div>


                Cras justo odio</ListGroup.Item>
              <div className='line'></div>
              <ListGroup.Item className='listItem'>Dapibus ac facilisis in</ListGroup.Item>
              <div className='line'></div>

              <ListGroup.Item className='listItem'>Morbi leo risus</ListGroup.Item>
              <div className='line'></div>

              <ListGroup.Item className='listItem'>Porta ac consectetur ac</ListGroup.Item>
              <div className='line'></div>


            </ListGroup>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Header >
  );
}
