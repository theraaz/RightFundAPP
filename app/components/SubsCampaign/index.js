/**
 *
 * SubsCampaign
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Badge,
  Form,
  Image,
} from 'react-bootstrap';

import { Link, withRouter } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

import LoadingComponent from '../LoadingComponent';
import EmptyComponent from '../EmptyComponent';
import { RemoveHTMLTags } from '../../utils/helper';


import { getSubCampaigns } from '../../utils/campaigns-utilities/getCampaignsUtilites';
const profileImg = require('../../images/placeholder.png');

function SubsCampaign({ ...props }) {

  const [campaign, setCampaign] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(6);
  const [pageNumber, setPageNumber] = React.useState(1);

  function progressBarVal(val) {
    // eslint-disable-next-line func-names
    const raised = val.donations.reduce(function (acc, val) {
      return acc + val.amount;
    }, 0);
    const pb = Math.floor((raised / val.amount) * 100);
    return pb;
  }

  function setBadgeColor(id) {
    if (id === 7) {
      return '#34c31a';
    }
    if (id === 6) {
      return '#f1cc1c';
    }
    if (id === 8) {
      return '#e62424';
    }
    if (id === 5) {
      return '#e62424';
    }
    if (id === 9) {
      return '#808080';
    }
  }

  function totalRaised(data) {
    // eslint-disable-next-line func-names
    const totalAmount = data.reduce(function (acc, val) {
      return acc + val.amount;
    }, 0);

    return `${data.length > 0 ? data[0].amountSymbolId.symbol : ''
      } ${totalAmount / 100}`;
  }

  const PerPage = event => {
    setPageSize(event.target.value);
  };

  const handleChangePage = useCallback((event, value) => {
    setPageNumber(value);
  }, []);

  function subCampaigs() {
    setLoading(true);
    getSubCampaigns(props.match.params.id)
      .then(({ data }) => {
        setLoading(false);
        setTotalPages(Math.ceil(data.response.data.totalCount / pageSize));
        console.log(data);
        setCampaign(data.response.data.res)
      })
      .catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    subCampaigs();
  }, []);

  return (
    <div>
      <Card>
        <Card.Body>
          {loading ? (
            <LoadingComponent />
          ) : campaign?.length === 0 ? (
            <EmptyComponent message={'No Sub Campaign Found!'} />
          ) : (
                <>
                  <Row>
                    {campaign.map(data => (
                      <Col
                        key={data.id}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        xl={4}
                        className="d-flex flex-column"
                      >
                        <Card className="campaign-card flex-grow-1">
                          <Badge
                            className="badgeCampaign"
                            style={{
                              backgroundColor: setBadgeColor(data.statusId.id),
                            }}
                          >
                            {data.statusId.name}
                          </Badge>{' '}


                          <div className="give-card__media">
                            {data.titleImage ? (
                              <img
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                                src={data.titleImage}
                                alt=""
                              />
                            ) : (
                                <Image
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                  }}
                                  src={profileImg}
                                  alt=""
                                />
                              )}
                          </div>
                          <Card.Body className="d-flex flex-column">
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
                                {data.account.firstName}
                              </span>
                            </Card.Title>
                            <h3
                              className="give-card__title"
                              style={{ cursor: 'pointer' }}
                              onClick={() => goToCampaignUpdates(data.id)}
                            >
                              {data.title}
                            </h3>
                            <div className="skillbar">
                              <ProgressBar animated now={progressBarVal(data)} />
                              <div className="count">
                                <span>
                                  {progressBarVal(data) > 100
                                    ? '100'
                                    : progressBarVal(data)}
                              %
                            </span>
                              </div>
                            </div>
                            <Card.Text
                              className="descriptionCampaign flex-grow-1"

                            >
                              {RemoveHTMLTags(data.description)}
                            </Card.Text>
                            <ul className="campign-info">
                              <li className="raised">
                                <span className="title">Target</span>
                                <span className="content">
                                  {data.amountSymbolId.symbol} {data.amount / 100}
                                </span>
                              </li>
                              <li className="pledged">
                                <span className="title">Raised</span>
                                <span className="content">
                                  {totalRaised(data.donations)}
                                </span>
                              </li>
                              <li className="donators">
                                <span className="title">Donators</span>
                                <span className="content">
                                  {data.donations.length}
                                </span>
                              </li>
                            </ul>
                            <div className="campaignBtns">
                              <Link to={`/campaignView/${data.id}`}>
                                <Button className="viewCampaignBtn">
                                  View Campaign
                            </Button>{' '}
                              </Link>
                              <Button
                                className="editCampaignBtn"
                                onClick={() => openLiveView(data)}
                              >
                                Live View
                          </Button>{' '}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  <div className="paginatordiv">
                    <div className="paginatorPerSize">
                      <span>Per Page</span>
                      <Form.Control
                        as="select"
                        className="paginatorPerPage"
                        onChange={PerPage}
                      >
                        <option className="paginatorPerPageOption" value="6">
                          6
                    </option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                      </Form.Control>
                    </div>
                    <Pagination
                      count={totalPages}
                      classes={{ ul: 'paginationColor' }}
                      onChange={handleChangePage}
                      variant="outlined"
                      shape="rounded"
                      page={pageNumber}
                    />
                  </div>
                </>
              )}
        </Card.Body>
      </Card>
    </div >
  );
}

SubsCampaign.propTypes = {};

export default withRouter(memo(SubsCampaign));
