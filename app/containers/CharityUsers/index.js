/**
 *
 * CharityUsers
 *
 */

import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import Layout from '../../components/Layout';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
  Modal,
} from 'react-bootstrap';
import '../../containers/HomePage/dashboard.scss';
import Pagination from '@material-ui/lab/Pagination';
import '../../components/CampaignDonations/campaignDontaions.scss';
import LoadingComponent from '../../components/LoadingComponent';
import EmptyComponent from '../../components/EmptyComponent';
import { Formik } from 'formik';
import CustomTextInputFormik from '../../components/inputs/CustomTextInputFormik';
import {
  createCharityUser,
  getCharityUsers,
} from '../../utils/crud/charity.crud';
import { useSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
export function CharityUsers({ history, match }) {
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual,
  );
  const [loading, setLoading] = useState(false);
  const [loadingAddMember, setLoadingAddMember] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (!match?.params?.charityId) {
      history.push('/team-members');
    } else {
      setLoading(true);
      getCharityUsers({ pageNo, perPage, charityId: match?.params?.charityId })
        .then(({ data }) => {
          setLoading(false);
          setTeamMembers(data?.response?.data?.res || []);
          setTotalPages(data?.response?.data?.count || 0);
        })
        .catch(error => {
          setLoading(false);
          history.push('/team-members');
          console.log(error.response);
        });
    }
  }, [pageNo, perPage]);
  const showAlert = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };
  const PerPage = event => {
    setPerPage(event.target.value);
  };
  const handleChangePage = useCallback((event, value) => {
    setPageNo(value);
  }, []);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const validateAddMember = values => {
    let errors = {};
    if (values.email?.trim() === '') {
      errors.email = 'Required!';
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.email,
      )
    ) {
      errors.email = 'Invalid Email!';
    }
    return errors;
  };
  const onSubmit = values => {
    setLoadingAddMember(true);
    createCharityUser({ ...values, charityId: match?.params?.charityId })
      .then(({ data, status }) => {
        setLoadingAddMember(false);

        if (status === 200) {
          showAlert('success', data.response.message);
          console.log(data);
        } else {
          showAlert('error', data.response.message);
        }
      })
      .catch(error => {
        setLoadingAddMember(false);
        showAlert(
          'error',
          error?.response?.data?.response?.message || 'Could not add Member!',
        );
      });
  };
  return (
    <Layout>
      <Helmet>
        <title>Charity Users</title>
        <meta name="description" content="List of All users in Charity" />
      </Helmet>
      <Card className="dataCard shadow mb-5 bg-white">
        <Card.Header style={{ background: 'transparent' }}>
          <Card.Title className="campaignHeader">
            <span style={{ marginTop: '8px' }}>Charity Users</span>
            {teamMembers?.filter(
              tm => tm.accountId.email === user.email && tm.role?.id === 2,
            ).length > 0 && (
              <div className="campaignHeader1 d-flex flex-column flex-sm-row">
                <Button onClick={openModal} className="campaignBtn">
                  Add New Member
                </Button>
              </div>
            )}
          </Card.Title>
        </Card.Header>

        <Card.Body>
          <Container>
            {loading ? (
              <LoadingComponent height={150} />
            ) : teamMembers.length === 0 ? (
              <EmptyComponent height={150} message="No Members Found!" />
            ) : (
              <div className="tableMain" style={{ backgroundColor: 'white' }}>
                <div className="tableRow">
                  <h5 className="DonationHeading">Members</h5>
                </div>

                <Table responsive="md" striped size="md" className="table1">
                  <thead className="tableHeader">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Position</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {teamMembers.map((member, i) => (
                      <tr key={member.id || i}>
                        <td>
                          {!member?.accountId?.firstName &&
                          !member?.accountId?.lastName
                            ? 'N/A'
                            : `${member?.accountId?.firstName} ${
                                member?.accountId?.lastName
                              }`}
                        </td>
                        <td>{member?.accountId?.email || 'N/A'}</td>
                        <td className="text-capitalize">
                          {member?.charityId?.position || 'N/A'}
                        </td>
                        <td className="text-capitalize">
                          {member?.role?.name?.toLowerCase() || 'N/A'}
                        </td>
                        <td />
                        <td />
                      </tr>
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
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title as="h6">Add New Member</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={{
            email: '',
          }}
          validate={validateAddMember}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <Row>
                  <Col xs="2">
                    <label htmlFor="a">Email:</label>
                  </Col>
                  <Col xs="10">
                    <CustomTextInputFormik
                      name="email"
                      placeholder="someone@example.com"
                    />
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <button type="submit" className="btn btn-primary">
                  Add Member{' '}
                  {loadingAddMember && <Spinner animation="border" size="sm" />}
                </button>
              </Modal.Footer>
            </form>
          )}
        </Formik>
      </Modal>
    </Layout>
  );
}

CharityUsers.propTypes = {
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
)(CharityUsers);
