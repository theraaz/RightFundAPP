/**
 *
 * CharityProfileView
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';
import { adminGetCharityById } from '../../utils/crud/admin.crud';
import { withRouter } from 'react-router-dom';
import { charityActions } from '../../utils/action-creators/charity.action.creator';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { Heading } from '../MyProfile/myProfile';
import EmptyComponent from '../../components/EmptyComponent';

export function CharityProfileView({ match, addAdminCharity }) {
  const { adminCharity } = useSelector(
    ({ charity }) => ({
      adminCharity: charity.adminCharity,
    }),
    shallowEqual,
  );
  useEffect(() => {
    adminGetCharityById(match?.params?.charityId)
      .then(res => {
        addAdminCharity(res?.data?.response?.data?.res || null);
      })
      .catch(() => {
        history.push('/charities');
      });
  }, []);
  const getUserDetails = () => {
    let details = {};
    if (adminCharity?.userDetails) {
      details = JSON.parse(adminCharity.userDetails);
    }
    return details;
  };
  return (
    <Layout>
      <Helmet>
        <title>Charity Profile</title>
        <meta name="description" content="Description of CharityProfileView" />
      </Helmet>
      <Card className="dataCard shadow mb-5 bg-white">
        <Card.Header style={{ background: 'transparent' }}>
          <Card.Title className="campaignHeader">
            <span style={{ marginTop: '8px' }}>Charity Profile</span>
          </Card.Title>
        </Card.Header>

        <Card.Body
          style={{
            padding: '1.25rem 20px 1.25rem 20px',
          }}
        >
          <Heading>Basic Info</Heading>
          <Row>
            <Col xs={12} sm={6}>
              <div className="form-group">
                <div className="font-weight-bold">Charity Name</div>
                <div className="text-muted" style={{ fontSize: 14 }}>
                  {adminCharity?.name || 'N/A'}
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="form-group">
                <div className="font-weight-bold">Registration Number</div>
                <div className="text-muted" style={{ fontSize: 14 }}>
                  {adminCharity?.regNo || 'N/A'}
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="form-group">
                <div className="font-weight-bold">Position</div>
                <div className="text-muted" style={{ fontSize: 14 }}>
                  {adminCharity?.position || 'N/A'}
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="form-group">
                <div className="font-weight-bold">Website</div>
                <div className="text-muted" style={{ fontSize: 14 }}>
                  {adminCharity?.charityWeb || 'N/A'}
                </div>
              </div>
            </Col>
          </Row>
          <Heading>User Info</Heading>
          <Row>
            <Col xs={12} sm={6}>
              <div className="form-group">
                <div className="font-weight-bold">First Name</div>
                <div className="text-muted" style={{ fontSize: 14 }}>
                  {getUserDetails()?.firstName || 'N/A'}
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="form-group">
                <div className="font-weight-bold">Last Name</div>
                <div className="text-muted" style={{ fontSize: 14 }}>
                  {getUserDetails()?.lastName || 'N/A'}
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="form-group">
                <div className="font-weight-bold">Email</div>
                <div className="text-muted" style={{ fontSize: 14 }}>
                  {getUserDetails()?.email || 'N/A'}
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="form-group">
                <div className="font-weight-bold">Phone Number</div>
                <div className="text-muted" style={{ fontSize: 14 }}>
                  {getUserDetails()?.phoneNumber || 'N/A'}
                </div>
              </div>
            </Col>
          </Row>
          <Heading>Trustees Info</Heading>
          <div className="tableMain mb-3">
            <Table responsive size="sm" className="table1">
              <thead className="tableHeader">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="tableBody">
                {adminCharity?.trustees?.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      <EmptyComponent
                        height={60}
                        message="No Trustees Found!"
                      />
                    </td>
                  </tr>
                ) : (
                  adminCharity?.trustees?.map((trustee, i) => (
                    <tr key={i}>
                      <td>{trustee.firstName}</td>
                      <td>{trustee.lastName}</td>
                      <td>{trustee.email}</td>
                      <td>{trustee.phoneNumber}</td>
                      <td className="text-capitalize">
                        {trustee.statusId?.name
                          ?.replace('ACTIVE', ' ACTIVE')
                          ?.toLowerCase()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
          <Row>
            <Col xs={12} sm={6}>
              <Heading>User Photo Id</Heading>
              {adminCharity?.userPhotoId ? (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <a
                    href={adminCharity?.userPhotoId}
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none"
                  >
                    View Image
                  </a>
                </div>
              ) : (
                <div
                  className="text-muted text-center mt-3"
                  style={{ fontSize: 15 }}
                >
                  Not Provided
                </div>
              )}
            </Col>
            <Col xs={12} sm={6}>
              <Heading>Constitution Document</Heading>
              {adminCharity?.constitutionDoc ? (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <a
                    href={adminCharity?.constitutionDoc}
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none"
                  >
                    View Document
                  </a>
                </div>
              ) : (
                <div
                  className="text-muted text-center mt-3"
                  style={{ fontSize: 15 }}
                >
                  Not Provided
                </div>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Layout>
  );
}

export default withRouter(
  connect(
    null,
    charityActions,
  )(CharityProfileView),
);
