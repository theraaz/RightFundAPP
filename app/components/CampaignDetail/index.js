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
  Col,
  Image
} from 'react-bootstrap';

import './campaignDetail.scss';

const profileImg = require('../../images/placeholder.png');
function CampaignDetail({ ...props }) {
  const token = localStorage.getItem('token');
  const [campaignData, setCampaignData] = useState();
  const [youtubeId, setYoutubeId] = React.useState('');
  const [campaignDetail, setCampaignDetail] = useState();


  function backFunction() {
    props.history.goBack();

  }

  function setVideo(videoURL) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = videoURL.match(regExp);

    if (match && match[2].length == 11) {

      setYoutubeId(match[2]);
    }
  }


  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };
    fetch(`${process.env.baseURL}/campaignBasicDetails/${props.match.params.id}`, requestOptions)
      .then(response => response.json())
      .then(user => {
        setCampaignData(user.response.data)
        fetch(
          `${process.env.baseURL}/campaign/${props.match.params.id}`,
          requestOptions,
        )
          .then(response => response.json())
          .then(user => {
            console.log(user.response.data.res);
            setCampaignDetail(user.response.data.res);
            if (user.response.data.res.video) {
              setVideo(user.response.data.res.video);
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });




  }, [
  ]);

  function progressBarVal() {
    if (campaignData) {

      let pb = Math.floor(campaignData.totalDonations / campaignData.campaignTarget * 100);
      return pb;
    }
  }

  const campaignAddress = campaignDetail?.address ? JSON.parse(campaignDetail?.address) : '';
  console.log(campaignAddress);

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
                      className="campaignDetail__media"
                    >
                      {campaignDetail.video ? <iframe width="100%" style={{ marginTop: '10px' }} height="315" src={`//www.youtube.com/embed/${youtubeId}`} frameborder="0" allowfullscreen></iframe>
                        :
                        (campaignDetail.titleImage ? (
                          <img
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            src={campaignDetail.titleImage}
                            alt=""
                          />
                        ) : (
                            <Image style={{ width: '100%', height: '100%' }} src={profileImg} alt="" />
                          ))
                      }

                    </div>


                  </Col>

                  <Col xs={12} sm={6} md={6}>
                    <Card.Body className='cardBody'>
                      <h3 className="campaign__title">
                        {campaignDetail.title}
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
                          {campaignDetail.account ? campaignDetail.account.firstName : ''}
                        </span>



                      </Card.Title>

                      <Card.Text>
                        <div className="author-email-cv">
                          {campaignDetail.account ? campaignDetail.account.email : ''}
                        </div>
                      </Card.Text>

                      <div>
                        <Card.Text
                          className="descriptionCampaign"
                        >
                          {
                            campaignAddress && (
                              <p>
                                {campaignAddress.line1 && campaignAddress.line1 !== ''
                                  ? `${campaignAddress.line1}, `
                                  : ''}
                                {campaignAddress.line2 && campaignAddress.line2 !== ''
                                  ? `${campaignAddress.line2}, `
                                  : ''}
                                {campaignAddress.city && campaignAddress.city !== '' ? `${campaignAddress.city}, ` : ''}
                                {campaignAddress.state && campaignAddress.state !== ''
                                  ? `${campaignAddress.state}, `
                                  : ''}
                                {campaignAddress.country && campaignAddress.country !== '' ? campaignAddress.country : ''}
                              </p>
                            )
                          }
                        </Card.Text>

                        <Card.Text
                          className="descriptionCampaign"
                          dangerouslySetInnerHTML={{ __html: campaignDetail.description }}
                        />
                      </div>
                      <ul className="campign-info">
                        <li className="raised">
                          <span className="title">Target</span>
                          <span className="content">
                            {campaignData ? campaignData.campaignAmountSymbol.symbol : ''}
                            {campaignData ? campaignData.campaignTarget : ''}
                          </span>
                        </li>
                        <li className="pledged">
                          <span className="title">Raised</span>
                          <span className="content">
                            {campaignData ? campaignData.campaignAmountSymbol.symbol : ''}
                            {campaignData ? campaignData.totalDonations : ''}
                          </span>
                        </li>
                        <li className="donators">
                          <span className="title">Donators</span>
                          <span className="content">
                            {campaignData ? campaignData.totalDonors : ''}
                          </span>
                        </li>
                      </ul>
                      <div className="skillbar">
                        <ProgressBar animated now={progressBarVal()} />
                        <div className="count">
                          <span>{progressBarVal() > 100 ? '100' : progressBarVal()}%</span>
                        </div>
                      </div>



                    </Card.Body>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='descriptionCampaignDetail'>
                      <Card.Title>
                        Description
                    </Card.Title>
                      <Card.Text
                        className="detailedDescrtiption"
                        dangerouslySetInnerHTML={{ __html: campaignDetail.description }}
                      />
                    </div>
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
