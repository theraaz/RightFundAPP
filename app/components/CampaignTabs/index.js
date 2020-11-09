/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/**
 *
 * CampaignTabs
 *
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { ListGroup, Row, Col, Card, Button } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import Header from '../Header/Loadable';
import '../../containers/HomePage/dashboard.scss';
import Footer from '../Footer/Loadable';

import './campaignTabs.scss';

import BackIcon from '../svg-icons/backIcon';
import CampaignIcon from '../svg-icons/campaignIcon';
import UpdatesIcon from '../svg-icons/updatesIcon';
import DonationsIcon from '../svg-icons/donationsIcon';
import { getCampaignBasicDetail } from '../../utils/crud/campain.crud';
import { shallowEqual, useSelector } from 'react-redux';
import { adminGetCampaignBasicDetails } from '../../utils/crud/admin.crud';
// eslint-disable-next-line react/prop-types
function CampaignTabs({ children, ...props }) {
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual,
  );
  const [campaignData, setCampaignData] = React.useState();
  useEffect(() => {
    const getBasicDetails =
      user.role === 5 ? adminGetCampaignBasicDetails : getCampaignBasicDetail;
    getBasicDetails(props.match.params.id)
      .then(({ data }) => {
        console.log(data.response.data);
        setCampaignData(data.response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  function backFunction() {
    // eslint-disable-next-line react/prop-types
    props.history.goBack();
  }

  function goTocampaignView() {
    props.history.push(`/campaignView/${props.match.params.id}`);
  }

  function goToeditCampaign() {
    props.history.push(`/editCampaign/${props.match.params.id}`);
  }

  function totalDonationsSubCampaigns() {
    let total = 0;
    for (let i = 0; i < campaignData?.subCampaigns?.length; i++) {
      total = campaignData.subCampaigns[i].totalDonations + total;
    }
    return total;
  }

  return (
    <div>
      <Header title="Dashboard" />
      <div
        className="container"
        style={{ minHeight: '700px', marginTop: '-5rem' }}
      >
        <div className="backButtonMain">
          <div
            onClick={() => {
              backFunction();
            }}
            aria-hidden
            tabIndex="-1"
            role="button"
          >
            <BackIcon size="15px" />
            <span>Back</span>
          </div>
        </div>
        <Row style={{ marginTop: 15, marginBottom: 15 }}>
          <Col sm={12} md={3}>
            <Card className="shadow mb-5 bg-white sideNav dataCard">
              <ListGroup variant="flush">
                <ListGroup.Item className="listItem">
                  <NavLink
                    to={`/addCampaignUpdates/${props.match.params.id}`}
                    className="text-decoration-none listItem"
                    activeClassName="active"
                  >
                    <div className="iconImage">
                      <UpdatesIcon />
                    </div>
                    <span>Updates</span>
                  </NavLink>
                </ListGroup.Item>

                <ListGroup.Item className="listItem">
                  <NavLink
                    to={`/donations/${props.match.params.id}`}
                    className="text-decoration-none listItem"
                    activeClassName="active"
                  >
                    <div className="iconImage">
                      <DonationsIcon />
                    </div>
                    <span>Donations</span>
                  </NavLink>
                </ListGroup.Item>
                <ListGroup.Item className="listItem">
                  <NavLink
                    to={`/subs-campaigns/${props.match.params.id}`}
                    className="text-decoration-none listItem"
                    activeClassName="active"
                  >
                    <div className="iconImage">
                      <CampaignIcon />
                    </div>
                    <span>Sub Campaigns</span>
                  </NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col>
            <Card className="dataCard shadow mb-5 bg-white">
              <Card.Header
                style={{ background: 'transparent', borderBottom: 'none' }}
              >
                <Card.Title className="campaignUpdates">
                  <Row>
                    <Col xs={12} sm={12} md={7} lg={7}>
                      <div>
                        <span style={{ marginTop: '8px' }}>
                          {campaignData ? campaignData.campaignTitle : ''}
                        </span>
                        <ul className="campign-Status">
                          {campaignData?.subCampaigns?.length > 0 ? (
                            <>
                              <li className="raised">
                                <span className="content">
                                  {campaignData
                                    ? campaignData.campaignAmountSymbol.symbol
                                    : ''}{' '}
                                  {campaignData
                                    ? (campaignData.campaignTarget / 100) || 0
                                    : ''}
                                </span>
                                <span className="title">Target</span>
                              </li>
                              <li className="pledged">
                                <span className="content">
                                  {campaignData
                                    ? campaignData.campaignAmountSymbol.symbol
                                    : ''}{' '}
                                  {campaignData
                                    ? campaignData.totalDonations / 100
                                    : ''}
                                </span>
                                <span className="title">Own Raised</span>
                              </li>
                              <li className="pledged">
                                <span className="content">
                                  {campaignData
                                    ? campaignData.campaignAmountSymbol.symbol
                                    : ''}{' '}
                                  {campaignData
                                    ? totalDonationsSubCampaigns() / 100
                                    : ''}
                                </span>
                                <span className="title">Other Raised</span>
                              </li>
                              <li className="pledged">
                                <span className="content">
                                  {campaignData
                                    ? campaignData.campaignAmountSymbol.symbol
                                    : ''}{' '}
                                  {campaignData
                                    ? (campaignData.totalDonations +
                                      totalDonationsSubCampaigns()) /
                                    100
                                    : ''}
                                </span>
                                <span className="title">Total Raised</span>
                              </li>
                              {/* <li className="donators">
                                <span className="content">
                                  {campaignData ? campaignData.totalDonors : ''}
                                </span>
                                <span className="title">Donators</span>
                              </li> */}
                            </>
                          ) : (
                              <>
                                <li className="raised">
                                  <span className="content">
                                    {campaignData
                                      ? campaignData.campaignAmountSymbol.symbol
                                      : ''}{' '}
                                    {campaignData
                                      ? ((campaignData.campaignTarget / 100) || 0)
                                      : '0'}
                                  </span>
                                  <span className="title">Target</span>
                                </li>
                                <li className="pledged">
                                  <span className="content">
                                    {campaignData
                                      ? campaignData.campaignAmountSymbol.symbol
                                      : ''}{' '}
                                    {campaignData
                                      ? campaignData.totalDonations / 100
                                      : '0'}
                                  </span>
                                  <span className="title">Raised</span>
                                </li>
                                <li className="donators">
                                  <span className="content">
                                    {campaignData?.totalDonors || 0}
                                  </span>
                                  <span className="title">Donators</span>
                                </li>
                              </>
                            )}
                        </ul>
                      </div>
                    </Col>

                    <Col xs={12} sm={12} md={5} lg={5}>
                      <div className="campaignUpdatesHeader">
                        <Button
                          className="campaignViewBtn"
                          onClick={goTocampaignView}
                        >
                          View Campaign
                        </Button>{' '}
                        {user.role !== 5 &&
                          <Button
                            className="editCampaign"
                            onClick={goToeditCampaign}
                          >
                            Edit Campaign
                        </Button>}
                      </div>
                    </Col>
                  </Row>
                </Card.Title>
              </Card.Header>

              <Card.Body>{children}</Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

CampaignTabs.propTypes = {};

export default withRouter(memo(CampaignTabs));
