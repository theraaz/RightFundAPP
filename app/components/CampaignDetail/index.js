/* eslint-disable no-console */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
  Card, ProgressBar, Container, Row, Col, Image,
} from 'react-bootstrap';
import EmailIcon from '../svg-icons/emailIcon';
import './campaignDetail.scss';
import BackIcon from '../svg-icons/backIcon';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import LoadingComponent from '../LoadingComponent';
import CampaignIcon from '../svg-icons/campaignIcon';
import DonationsIcon from '../svg-icons/donationsIcon';
import { getCampaignPackages } from '../../utils/campaigns-utilities/CampaignPackages';
import { CustomHeading, CustomHeadingNum } from '../Forms/form.styles';


const profileImg = require('../../images/placeholder.png');
function CampaignDetail({ ...props }) {
  const token = localStorage.getItem('token');
  const [campaignData, setCampaignData] = useState();
  const [youtubeId, setYoutubeId] = useState('');
  const [campaignDetail, setCampaignDetail] = useState();
  const [packages, setPackages] = useState([]);

  function backFunction() {
    // eslint-disable-next-line react/prop-types
    props.history.goBack();
  }

  function setVideo(videoURL) {
    // eslint-disable-next-line no-useless-escape
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = videoURL.match(regExp);

    if (match && match[2].length === 11) {
      setYoutubeId(match[2]);
    }
  }

  function getAllPackages() {
    getCampaignPackages(props.match.params.id)
      .then(({ data }) => {
        setPackages(data.response.data.res);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };
    fetch(
      // eslint-disable-next-line react/prop-types
      `${process.env.baseURL}/campaignBasicDetails/${props.match.params.id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then((user) => {
        setCampaignData(user.response.data);
        fetch(
          `${process.env.baseURL}/campaign/${props.match.params.id}`,
          requestOptions,
        )
          .then(response => response.json())
          // eslint-disable-next-line no-shadow
          .then((user) => {
            setCampaignDetail(user.response.data.res);
            if (user.response.data.res.video) {
              setVideo(user.response.data.res.video);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    getAllPackages();
  }, []);

  function progressBarVal() {
    let pb = 0;
    if (campaignData) {
      pb = Math.floor(
        (campaignData.totalDonations / campaignData.campaignTarget) * 100,
      );
    }
    return pb;
  }

  const campaignAddress = campaignDetail?.address
    ? JSON.parse(campaignDetail?.address)
    : '';

  return (
    <div>
      <div
        className="container"
        style={{ minHeight: '700px', marginTop: '-5rem' }}
      >
        <div className="backButtonCamapignView">
          <div onClick={backFunction}>

            <BackIcon size="15px" />

            <span>Back</span>
          </div>
        </div>

        <Card className="campaignDetailCard shadow mb-5 bg-white">
          <Card.Body>
            {campaignDetail ? (
              <Container>
                <Card className="campaign-card">
                  <Row>
                    <Col xs={12} sm={6} md={6}>
                      <div className="campaignDetail__media">
                        {campaignDetail.video ? (
                          <iframe
                            width="100%"
                            style={{ marginTop: '10px' }}
                            height="315"
                            src={`//www.youtube.com/embed/${youtubeId}`}
                            frameBorder="0"
                            allowFullScreen
                          />
                        ) : campaignDetail.titleImage ? (
                          <img
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                            src={campaignDetail.titleImage}
                            alt=""
                          />
                        ) : (
                          <Image
                            style={{ width: '100%', height: '100%' }}
                            src={profileImg}
                            alt=""
                          />
                        )}
                      </div>
                    </Col>

                    <Col xs={12} sm={6} md={6}>
                      <Card.Body className="cardBody">
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
                            {campaignDetail.account
                              ? campaignDetail.account.firstName
                              : ''}
                            {' '}
                            {campaignDetail.account
                              ? campaignDetail.account.lastName
                              : ''}
                          </span>
                        </Card.Title>

                        <Card.Text>
                          <div className="author-email-cv">
                            <span className="icons">
                              <EmailIcon size="16px" />
                            </span>
                            {campaignDetail.account
                              ? campaignDetail.account.email
                              : ''}
                          </div>
                        </Card.Text>
                        {
                          campaignDetail.isParent === false
                            ? (
                              <Card.Text>
                                <div className="author-email-cv">
                                  <Row>
                                    <Col md={4} sm={4}>
                                      <span className="icons">
                                        <CampaignIcon />
                                      </span>
                                Parent Campaign:
                                    </Col>

                                    <Col md={8} sm={8}>
                                      {campaignDetail.parentCampaignId
                                        ? campaignDetail.parentCampaignId.title
                                        : ''}
                                    </Col>
                                  </Row>
                                </div>
                              </Card.Text>
                            ) : ''

                        }
                        <Card.Text>

                          <div className="author-campaign-category">
                            <Row>
                              <Col md={4} sm={4}>
                                <span className="icons">
                                  <CategoryOutlinedIcon
                                    fontSize="small"
                                    style={{
                                      color: '#818386',
                                    }}
                                  />
                                </span>
                              Category:
                              </Col>

                              <Col md={8} sm={8}>

                                {campaignDetail.categoryId
                                  ? campaignDetail.categoryId.name
                                  : ''}
                              </Col>
                            </Row>
                          </div>

                        </Card.Text>
                        <Card.Text>

                          <div className="author-campaign-category">
                            <Row>
                              <Col md={4} sm={4}>
                                <span className="icons">
                                  <DonationsIcon />
                                </span>
                                Zakat Eliglible:
                              </Col>

                              <Col md={8} sm={8}>

                                {campaignDetail.zakatEligible
                                  ? 'Yes'
                                  : 'No'}
                              </Col>
                            </Row>
                          </div>

                        </Card.Text>

                        <ul className="campign-info">
                          <li className="raised">
                            <span className="title">Target</span>
                            <span className="content">
                              {campaignData
                                ? campaignData.campaignAmountSymbol.symbol
                                : ''}
                              {campaignData ? campaignData.campaignTarget : ''}
                            </span>
                          </li>
                          <li className="pledged">
                            <span className="title">Raised</span>
                            <span className="content">
                              {campaignData
                                ? campaignData.campaignAmountSymbol.symbol
                                : ''}
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
                            <span>
                              {progressBarVal() > 100
                                ? '100'
                                : progressBarVal()}
                              %
                            </span>
                          </div>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={8} md={8}>
                      {campaignDetail.description
                        ? (
                          <div className="descriptionCampaignDetail">
                            <Card.Title>Description</Card.Title>
                            <Card.Text
                              className="detailedDescrtiption"
                              dangerouslySetInnerHTML={{
                                __html: campaignDetail.description,
                              }}
                            />
                          </div>
                        )
                        : ''}

                    </Col>
                    <Col sm={4} md={4}>
                      {packages.length > 0
                        ? (
                          <div className="descriptionCampaignDetail">
                            <Card.Title>Packages</Card.Title>
                            {
                              packages.map(data => (
                                <Card className="defined-paymentsViewCampaign">
                                  <div className="card-heading-inner">
                                    <CustomHeading>{data.title}</CustomHeading>
                                    <CustomHeadingNum>
                                      {data.amountSymbolId.symbol}
                                      {' '}
                                      {data.amount}
                                    </CustomHeadingNum>
                                  </div>
                                  <div style={{ textAlign: 'initial' }}>
                                    <p>{data.description}</p>
                                  </div>
                                </Card>
                              ))}
                          </div>
                        )
                        : ''}

                    </Col>
                  </Row>
                </Card>
              </Container>
            ) : (
              <LoadingComponent />
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

CampaignDetail.propTypes = {};

export default withRouter(memo(CampaignDetail));
