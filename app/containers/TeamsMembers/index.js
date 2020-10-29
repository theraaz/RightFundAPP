import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Card, Container, Form, Table } from 'react-bootstrap';
import '../HomePage/dashboard.scss';
import Pagination from '@material-ui/lab/Pagination';
import '../../components/CampaignDonations/campaignDontaions.scss';
import { withRouter } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import LoadingComponent from '../../components/LoadingComponent';
import EmptyComponent from '../../components/EmptyComponent';
import { getAllMyCharities } from '../../utils/crud/charity.crud';
import Layout from '../../components/Layout';
export function TeamsMembers({ history }) {
  const [loading, setLoading] = useState(false);
  const [myCharities, setMyCharities] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setLoading(true);
    getAllMyCharities({ pageNo, perPage })
      .then(({ data }) => {
        setLoading(false);
        setMyCharities(data?.response?.data?.res || []);
        setTotalPages(data?.response?.data?.count || 0);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [pageNo, perPage]);
  const PerPage = event => {
    setPerPage(event.target.value);
  };
  const handleChangePage = useCallback((event, value) => {
    setPageNo(value);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Team Members</title>
        <meta name="description" content="Description of TeamsMembers" />
      </Helmet>
      <Card className="dataCard shadow mb-5 bg-white">
        <Card.Header style={{ background: 'transparent' }}>
          <Card.Title className="campaignHeader">
            <span style={{ marginTop: '8px' }}>My Charities</span>
          </Card.Title>
        </Card.Header>

        <Card.Body>
          <Container>
            {loading ? (
              <LoadingComponent height={150} />
            ) : myCharities.length === 0 ? (
              <EmptyComponent height={150} message="No Charities Found!" />
            ) : (
              <div className="tableMain" style={{ backgroundColor: 'white' }}>
                <Table responsive="md" size="md" className="table1">
                  <thead className="tableHeader">
                    <tr>
                      <th>Registration No</th>
                      <th>Charity Name</th>
                      <th>Position</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {myCharities.map((charity, i) => (
                      <Tooltip
                        title="Click to View Details"
                        placement="top"
                        key={charity.id || i}
                      >
                        <tr
                          onClick={() =>
                            history.push(`/team-members/${charity.id}`)
                          }
                          className="table-row__hover"
                        >
                          <td>{charity?.charityId?.regNo || 'N/A'}</td>
                          <td>{charity?.charityId?.name || 'N/A'}</td>
                          <td className="text-capitalize">
                            {charity?.charityId?.position || 'N/A'}
                          </td>
                          <td className="text-capitalize">
                            {charity?.role?.name?.toLowerCase() || 'N/A'}
                          </td>
                          <td className="text-capitalize">
                            {charity?.charityId?.statusId?.name
                              ?.replace('ACTIVE', ' ACTIVE')
                              ?.toLowerCase() || 'N/A'}
                          </td>
                          <td />
                        </tr>
                      </Tooltip>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
            <div className="paginatordiv">
              <div className="paginatorPerSize">
                <span>Per Page</span>
                <Form.Control
                  as="select"
                  className="paginatorPerPage"
                  onChange={PerPage}
                >
                  <option className="paginatorPerPageOption" value="10">
                    10
                  </option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </Form.Control>
              </div>
              <Pagination
                count={Math.ceil(totalPages / perPage)}
                classes={{ ul: 'paginationColor' }}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
                page={pageNo}
              />
            </div>
          </Container>
        </Card.Body>
      </Card>
    </Layout>
  );
}

TeamsMembers.propTypes = {
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
  withRouter,
  memo,
)(TeamsMembers);
