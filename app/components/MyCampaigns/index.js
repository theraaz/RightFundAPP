/**
 *
 * MyCampaigns
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Row,
  Col,
  Card,
  Dropdown,
  Button,
  Container,
  ProgressBar,
} from 'react-bootstrap';
import '../../containers/HomePage/dashboard.scss';
import { Link } from 'react-router-dom';

const MyCampaigns = ({ setActiveCard }) => {
  const token = localStorage.getItem('token');
  const [campaign, setCampaign] = React.useState([]);


  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    fetch(`${process.env.baseURL}/campaign`, requestOptions)
      .then(response => response.json())
      .then(user => {
        console.log(user.response.data.res);
        setCampaign(user.response.data.res);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Dashborad</title>
        <meta name="description" content="Description of MyProfile" />
      </Helmet>
      <Card className="dataCard shadow mb-5 bg-white">
        <Card.Header style={{ background: 'transparent' }}>
          <Card.Title className="campaignHeader">
            <span style={{ marginTop: '8px' }}>My Campaigns</span>

            <div className="campaignHeader1 d-flex flex-column flex-sm-row">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className="dropBtn">
                  Active Campaigns
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item className="dropItem" href="#/action-1">
                    Action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Link to="/createCampaign">

                <Button className="campaignBtn">New Campaign</Button>{' '}
              </Link>
            </div>
          </Card.Title>
        </Card.Header>

        <Card.Body>
          <Container>
            <Row>
              {campaign.map(data => (
                <Col key={data.id} xs={12} sm={6} md={4}>
                  <Card className="campaign-card" onClick={() => setActiveCard(1)}>
                    <Link className='anchorTag' to={`addCampaignUpdates/${data.id}`}>
                      <div
                        className="give-card__media"
                        style={{ maxWidth: '230px', height: '130px' }}
                      >
                        {data.titleImage ? (
                          <img
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            src={data.titleImage}
                            alt=""
                          />
                        ) : (
                            <img
                              style={{ width: '100%', height: '100%' }}
                              src="//placehold.it/200"
                              alt=""
                            />
                          )}
                      </div>

                      <Card.Body>
                        <Card.Title className="d-flex align-items-center author_details">
                          <div className="author-photo">
                            <img
                              alt=""
                              src="https://0.gravatar.com/avatar/6a7831cd395934213cf4dc10a70a7e80?s=96&amp;d=mm&amp;r=g"
                              className="avatar avatar-96 photo"
                              height="96"
                              width="96"
                            />
                          </div>
                          <span className="author-name">
                            {data.accountId.firstName}
                          </span>
                        </Card.Title>
                        <h3 className="give-card__title">{data.title}</h3>
                        <div className="skillbar">
                          <ProgressBar animated now={100} />
                          {/* <div style={{ width: "100%" }}></div> */}
                          <div className="count">
                            <span>100%</span>
                          </div>
                        </div>
                        <Card.Text
                          className="descriptionCampaign"
                          dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                        <ul className="campign-info">
                          <li className="raised">
                            <span className="title">Raised</span>
                            <span className="content">$5,900</span>
                          </li>
                          <li className="pledged">
                            <span className="title">Pledged</span>
                            <span className="content">
                              {data.amountSymbolId.symbol} {data.amount}
                            </span>
                          </li>
                          <li className="donators">
                            <span className="title">Donators</span>
                            <span className="content">29</span>
                          </li>
                        </ul>
                        <div className="campaignBtns">
                          <Button className="viewCampaignBtn">
                            View Campaign
                        </Button>
                          {/* <Button className="editCampaignBtn" >Edit Campaign</Button> */}
                          <Link to={`/editCampaign/${data.id}`}>
                            <Button className="editCampaignBtn">
                              Edit Campaign
                          </Button>{' '}
                          </Link>
                        </div>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}

MyCampaigns.propTypes = {};

export default memo(MyCampaigns);
