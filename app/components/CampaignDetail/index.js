/**
 *
 * CampaignDetail
 *
 */

import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import {
  Card,
  ProgressBar,
  Container,
  Row,
  Col
} from 'react-bootstrap';

import './campaignDetail.scss';

function CampaignDetail({ campaignData, ...props }) {

  const [campaignDetail, setCampaignDetail] = useState();
  function backFunction() {
    console.log('props', props)
    props.history.goBack();

  }



  useEffect(() => {
    if (campaignData) {
      setCampaignDetail(campaignData);

    }
  }, [
    campaignData
  ]);


  console.log(campaignData)
  return (
    <div>
      <div className="container" style={{ minHeight: '700px', marginTop: '-5rem' }}>
        <div className='backButtonCamapignView'>
          <div onClick={backFunction}>
            <svg version="1.1" id="Capa_1" x="0px" y="0px" width="15" height="15" viewBox="0 0 268.833 268.833" >
              <g>
                <path d="M256.333,121.916H42.679l58.659-58.661c4.882-4.882,4.882-12.796,0-17.678c-4.883-4.881-12.797-4.881-17.678,0l-79.998,80   c-4.883,4.882-4.883,12.796,0,17.678l80,80c2.439,2.439,5.64,3.661,8.839,3.661s6.397-1.222,8.839-3.661   c4.882-4.882,4.882-12.796,0-17.678l-58.661-58.661h213.654c6.903,0,12.5-5.598,12.5-12.5   C268.833,127.513,263.236,121.916,256.333,121.916z" />
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
            <span>Back</span></div>

        </div>


        <Card className="campaignDetailCard shadow mb-5 bg-white">
          <Card.Body>
            {campaignDetail ? <Container>

              <Card className="campaign-card" >
                <Row>
                  <Col xs={12} sm={6} md={6}>
                    <div
                      className="give-card__media"
                    >
                      {campaignData.titleImage ? (
                        <img
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src={campaignData.titleImage}
                          alt=""
                        />
                      ) : (
                          <img
                            style={{ width: '100%', height: '100%' }}
                            src={"require('../../images/placeholder.png')"}
                            alt=""
                          />
                        )}
                    </div>


                  </Col>

                  <Col xs={12} sm={6} md={6}>
                    <Card.Body className='cardBody'>
                      <h3 className="campaign__title">
                        {campaignData.title}
                      </h3>
                      <Card.Title className="d-flex align-items-center author_Campaign-details">
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
                          {campaignData.account ? campaignData.account.firstName : ''}
                        </span>
                      </Card.Title>

                      <div>
                        <Card.Text
                          className="descriptionCampaign"
                        >
                          {campaignData.address ? JSON.parse(campaignData.address).line1 : ''}, 
                          {campaignData.address ? JSON.parse(campaignData.address).line2 : ''}, 
                          {campaignData.address ? JSON.parse(campaignData.address).city : ''}, 
                          {campaignData.address ? JSON.parse(campaignData.address).State : ''}, 
                          {campaignData.address ? JSON.parse(campaignData.address).country : ''}

                        </Card.Text>
                      </div>
                      <ul className="campign-info">
                        <li className="raised">
                          <span className="title">Target</span>
                          <span className="content">{campaignData.amountSymbolId ? campaignData.amountSymbolId.symbol : ''} {campaignData.amount}</span>
                        </li>
                        <li className="pledged">
                          <span className="title">Raised</span>
                          <span className="content">
                            555
                         </span>
                        </li>
                        <li className="donators">
                          <span className="title">Donators</span>
                          <span className="content">{campaignData.donations ? campaignData.donations.length : ''}</span>
                        </li>
                      </ul>
                      <div className="skillbar">
                        <ProgressBar animated now={100} />
                        <div className="count">
                          <span>100%</span>
                        </div>
                      </div>



                    </Card.Body>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text
                      className="descriptionCampaign"
                      dangerouslySetInnerHTML={{ __html: campaignData.description }}
                    />
                  </Col>
                </Row>
              </Card>

            </Container> : ''}
          </Card.Body>
        </Card>

      </div>

    </div>
  );
}

CampaignDetail.propTypes = {};

export default withRouter(memo(CampaignDetail));
