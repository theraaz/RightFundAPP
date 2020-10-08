/**
 *
 * MyCampaigns
 *
 */

import React, { memo, useEffect, useCallback } from 'react';
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
  Badge,
  Form,
  Modal,
  Image
} from 'react-bootstrap';
import '../../containers/HomePage/dashboard.scss';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
const profileImg = require('../../images/placeholder.png');

const MyCampaigns = ({ setActiveCard }) => {
  const token = localStorage.getItem('token');
  const [campaign, setCampaign] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(6);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [campaignSort, setCampaignSort] = React.useState(null);
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangePage = useCallback((event, value) => {
    setPageNumber(value);
  }, []);


  useEffect(() => {
    getSortCampaigns(pageSize,
      pageNumber,
      campaignSort);
  }, [
    pageSize,
    pageNumber,
    campaignSort
  ]);

  function getSortCampaigns(pages,
    pageNo,
    campaignSortBy) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      }

    };

    fetch(`${process.env.baseURL}/campaign?perPage=${pages}&pageNo=${pageNo}${campaignSortBy ? `&sortBy=${campaignSortBy}` : ''}`, requestOptions)
      .then(response => response.json())
      .then(user => {
        console.log(user.response.data);
        setTotalPages(Math.ceil(user.response.data.totalCount / pageSize));
        console.log(Math.ceil(user.response.data.totalCount / pageSize));
        setCampaign(user.response.data.res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function dropdownValueSet(dropdownValue) {
    setCampaignSort(dropdownValue);
    // getSortCampaigns();

  }

  function getCampaigns() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      }

    };

    fetch(`${process.env.baseURL}/campaign?perPage=${pageSize}&pageNo=${pageNumber}`, requestOptions)
      .then(response => response.json())
      .then(user => {
        console.log(user.response.data);
        setTotalPages(Math.ceil(user.response.data.totalCount / pageSize));
        setCampaign(user.response.data.res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function totalRaised(data) {
    let totalAmount;
    totalAmount = data.reduce(function (acc, val) { return acc + val['amount']; }, 0)
    console.log(totalAmount)
    return ((data.length > 0 ? data[0].amountSymbolId.symbol : '') + ' ' + totalAmount);
  }

  function deleteCampaign(campaignId) {
    setShow(false);
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      }

    };

    fetch(`${process.env.baseURL}/campaign/${campaignId}`, requestOptions)
      .then(response => response.json())
      .then(user => {
        console.log(user);
        if (campaignSort) {
          getSortCampaigns(pageSize,
            pageNumber,
            campaignSort)
        } else {
          getCampaigns()
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  const PerPage = event => {
    setPageSize(event.target.value);
    console.log(event.target.value)
  }

  function getDropdownVal() {
    if (campaignSort === 7) {
      return 'Live';
    }
    else if (campaignSort === 6) {
      return 'Draft';
    } else if (campaignSort === 8) {
      return 'Close';
    }

  }


  function progressBarVal(val) {
    let raised = val.donations.reduce(function (acc, val) { return acc + val['amount']; }, 0);
    let pb = Math.floor(raised / val.amount * 100);
    return pb;
  }

  function setBadgeColor(id) {
    if (id === 7) {
      return '#34c31a';
    } else if (id === 6) {
      return '#f1cc1c';
    } else if (id === 8) {
      return '#e62424';
    }
  }
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
                  {campaignSort ? getDropdownVal() : 'Sort Campaign'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => dropdownValueSet(7)} className="dropItem">
                    Live
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => dropdownValueSet(6)} className="dropItem">
                    Draft
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => dropdownValueSet(8)} className="dropItem">
                    Close
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
                  <Card className="campaign-card" >
                    <Badge className='badgeCampaign' style={{ backgroundColor: setBadgeColor(data.statusId.id) }} >{data.statusId.name}</Badge>{' '}
                    <div className='deleteIcon' onClick={handleShow}>
                      <svg height="18px" viewBox="-40 0 427 427.00131" width="18px"><path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" /><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" /><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" /><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" /></svg>
                    </div>

                    {/* <DefaultModal /> */}
                    <Modal show={show} onHide={handleClose} animation={true} >
                      <Modal.Header closeButton >
                        <Modal.Title>Delete Campaign</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Are you sure you want to delete your campaign? If you delete you will permanently lose your campaign.</Modal.Body>
                      <Modal.Footer>
                        <Button className='modalBtnNo' onClick={handleClose}>
                          No
                          </Button>
                        <Button className='modalBtnYes' onClick={() => deleteCampaign(data.id)}>
                          Yes
                        </Button>
                      </Modal.Footer>
                    </Modal>
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
                            <Image style={{ width: '100%', height: '100%' }} src={profileImg} alt="" />
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
                            {data.account.firstName}
                          </span>
                        </Card.Title>
                        <h3 className="give-card__title">{data.title}</h3>
                        <div className="skillbar">
                          <ProgressBar animated now={progressBarVal(data)} />
                          {/* <div style={{ width: "100%" }}></div> */}
                          <div className="count">
                            <span>{progressBarVal(data) > 100 ? '100' : progressBarVal(data)}%</span>
                          </div>
                        </div>
                        <Card.Text
                          className="descriptionCampaign"
                          dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                        <ul className="campign-info">
                          <li className="raised">
                            <span className="title">Target</span>
                            <span className="content">{data.amountSymbolId.symbol} {data.amount}</span>
                          </li>
                          <li className="pledged">
                            <span className="title">Raised</span>
                            <span className="content">
                              {totalRaised(data.donations)}
                            </span>
                          </li>
                          <li className="donators">
                            <span className="title">Donators</span>
                            <span className="content">{data.donations.length}</span>
                          </li>
                        </ul>
                        <div className="campaignBtns">

                          <Link to={`/campaignView/${data.id}`}>
                            <Button className="viewCampaignBtn">
                              View Campaign
                        </Button>{' '}
                          </Link>


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

        <div className="paginatordiv">
          <div className="paginatorPerSize">
            <span >
              Per Page
            </span>
            <Form.Control
              as="select"
              className='paginatorPerPage'
              onChange={PerPage}
            >
              <option className='paginatorPerPageOption' value="10">6</option>
              <option value="15">10</option>
              <option value="20">15</option>
            </Form.Control>
          </div>

          <Pagination count={totalPages} classes={{ ul: 'paginationColor' }} onChange={handleChangePage} variant="outlined" shape="rounded" />
        </div>
      </Card>
    </div>
  );
}

MyCampaigns.propTypes = {};

export default memo(MyCampaigns);
