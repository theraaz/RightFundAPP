/**
 *
 * AllDonations
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Spinner,
  Popover,
  OverlayTrigger,
  Table,
  Row,
  Form,
  Container,
} from 'react-bootstrap';
import Pagination from '@material-ui/lab/Pagination';

import Layout from '../../components/Layout/index';
import '../../components/CampaignDonations/campaignDontaions.scss';
import EmptyComponent from '../../components/EmptyComponent';
import LoadingComponent from '../../components/LoadingComponent';

export function AllDonations() {
  const token = localStorage.getItem('token');

  const [pageSize, setPageSize] = React.useState(10);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [campaignsDonation, setCampaignsDonation] = useState([]);
  const [fiterVal, setFilterVal] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [totalDonations, setTotalDonations] = useState();

  function formatDate(createdAt) {
    const d = new Date(createdAt);
    const month = d.getMonth() + 1;
    return `${d.getDate()}-${month}-${d.getUTCFullYear()}`;
  }

  function formatHHMM(date) {
    const popover = new Date(date);
    function z(n) {
      return (n < 10 ? '0' : '') + n;
    }
    const h = popover.getHours();
    return `${z(h % 12)}:${z(popover.getMinutes())} ${h < 12 ? 'AM' : 'PM'}`;
  }

  const filterData = event => {
    const filter =
      event.target.value !== ''
        ? fiterVal.filter(cd => cd.DonarName.includes(event.target.value))
        : campaignsDonation;
    setCampaignsDonation(filter);
  };

  function pageChange(event) {
  }

  const handleChangePage = useCallback((event, value) => {
    setPageNumber(value);
  }, []);

  function getDonations(pages, pageNo) {
    setLoadingSpinner(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    fetch(
      `${process.env.baseURL}/donation?perPage=${pages}&pageNo=${pageNo}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(user => {
        setLoadingSpinner(false);
        setTotalDonations(user.response.data.total);
        setTotalPages(Math.ceil(user.response.data.total / pageSize));
        setCampaignsDonation(user.response.data.res);
        setFilterVal(user.response.data.res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getDonations(pageSize, pageNumber);
  }, [pageSize, pageNumber]);

  const PerPage = event => {
    setPageNumber(1);
    setPageSize(event.target.value);
    // getDonations();
  };

  return (
    <div>
      <Helmet>
        <title>All Donations</title>
        <meta name="description" content="Description of All Donations" />
      </Helmet>
      <Layout>
        <Container style={{ minHeight: '57vh' }}>
          {campaignsDonation ? (
            <>
              <div
                className="tableMain"
                style={{
                  backgroundColor: 'white',
                  boxShadow: '0px 0px 9px #eaeaea',
                }}
              >
                <Row className="tableRow">
                  <h5 className="DonationHeading">Donations</h5>
                  {/* <div className="searchBar">
                      <svg
                        version="1.1"
                        id="Capa_1"
                        width="15"
                        height="15"
                        viewBox="0 0 512.005 512.005"
                      >
                        <g>
                          <g>
                            <path d="M508.885,493.784L353.109,338.008c32.341-35.925,52.224-83.285,52.224-135.339c0-111.744-90.923-202.667-202.667-202.667    S0,90.925,0,202.669s90.923,202.667,202.667,202.667c52.053,0,99.413-19.883,135.339-52.245l155.776,155.776    c2.091,2.091,4.821,3.136,7.552,3.136c2.731,0,5.461-1.045,7.552-3.115C513.045,504.707,513.045,497.965,508.885,493.784z     M202.667,384.003c-99.989,0-181.333-81.344-181.333-181.333S102.677,21.336,202.667,21.336S384,102.68,384,202.669    S302.656,384.003,202.667,384.003z" />
                          </g>
                        </g>
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                      </svg>
                      <input
                        className="searchBarInput"
                        placeholder="Search here"
                        onChange={filterData}
                      />
                    </div> */}
                </Row>
                {loadingSpinner ? (
                  <LoadingComponent />
                ) : totalDonations === 0 ? (
                  <EmptyComponent
                    message={'There is no donations for all campaigns!'}
                  />
                ) : (
                  <div style={{ overflow: 'auto' }}>
                    <Table responsive="md" striped size="md" className="table1">
                      <thead className="tableHeader">
                        <tr>
                          <th>Campaign Name</th>
                          <th>Donner Name</th>
                          <th>Email</th>
                          <th>Gift Aid Enabled</th>
                          <th>Date</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody className="tableBody">
                        {campaignsDonation.map((data, i) => (
                          <tr key={data.id || i}>
                            <td>{data.campaignName}</td>
                            <td>{data.DonarName}</td>
                            <td>{data.DonarEmail}</td>

                            <td>{data.giftAid ? 'Yes' : 'No'}</td>
                            <OverlayTrigger
                              key="bottom"
                              placement="bottom"
                              overlay={
                                <Popover id="popover-basic">
                                  <Popover.Content
                                    style={{
                                      color: '#f15a24',
                                      textAlign: 'center',
                                    }}
                                  >
                                    <div>{formatHHMM(data.donationDate)}</div>
                                    {/* <div>{data.computedDateCreatedAt}</div> */}
                                  </Popover.Content>
                                </Popover>
                              }
                            >
                              <td>{formatDate(data.donationDate)}</td>
                            </OverlayTrigger>
                            <td className="tableAmount">
                              {data.donationSymbol} {data.donationAmount / 100}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>
              {totalDonations === 0 ? (
                ''
              ) : (
                <div className="paginatorDonationdiv">
                  <div className="paginatorPerSize">
                    <span>Per Page</span>
                    <Form.Control
                      as="select"
                      className="paginatorPerPage"
                      onChange={PerPage}
                      value={pageSize}
                    >
                      <option className="paginatorPerPageOption" value="10">
                        10
                      </option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                    </Form.Control>
                  </div>

                  <Pagination
                    count={totalPages}
                    classes={{ ul: 'paginationDonationColor' }}
                    onChange={handleChangePage}
                    variant="outlined"
                    shape="rounded"
                  />
                </div>
              )}
            </>
          ) : (
            ''
          )}
        </Container>
      </Layout>
    </div>
  );
}

AllDonations.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AllDonations);
