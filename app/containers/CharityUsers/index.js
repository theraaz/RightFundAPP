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
  deleteCharityUser,
  getCharityUsers,
} from '../../utils/crud/charity.crud';
import { useSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import { Menu, MenuItem, ListItemText } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
export function CharityUsers({ history, match }) {
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual,
  );
  const [loading, setLoading] = useState({
    main: false,
    addMember: false,
    removeMember: false,
  });
  const [showModal, setShowModal] = useState({
    addMember: false,
    removeMember: false,
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const [charityUser, setCharityUser] = useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const enableLoading = name => {
    setLoading({ ...loading, [name]: true });
  };
  const disableLoading = name => {
    setLoading({ ...loading, [name]: false });
  };
  useEffect(() => {
    if (!match?.params?.charityId) {
      history.push('/team-members');
    } else {
      getUsers({ pageNo, perPage, charityId: match?.params?.charityId });
    }
  }, [pageNo, perPage]);
  const getUsers = params => {
    enableLoading('main');
    getCharityUsers(params)
      .then(({ data }) => {
        disableLoading('main');
        setTeamMembers(data?.response?.data?.res || []);
        setTotalPages(data?.response?.data?.count || 0);
      })
      .catch(() => {
        disableLoading('main');
        history.push('/team-members');
      });
  };
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
  const openModal = name => () => {
    setShowModal({ ...showModal, [name]: true });
    if (name === 'removeMember') {
      setAnchorEl(null);
    }
  };
  const closeModal = name => () => {
    setShowModal({ ...showModal, [name]: false });
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
    enableLoading('addMember');
    createCharityUser({ ...values, charityId: match?.params?.charityId })
      .then(({ data, status }) => {
        disableLoading('addMember');

        if (status === 200) {
          showAlert('success', data.response.message);
          closeModal('addMember')();
          getUsers({ pageNo, perPage, charityId: match?.params?.charityId });
        } else {
          showAlert('error', data.response.message);
        }
      })
      .catch(error => {
        disableLoading('addMember');
        showAlert(
          'error',
          error?.response?.data?.response?.message || 'Could not add Member!',
        );
      });
  };
  const handleClickMenuOpen = member => e => {
    setCharityUser(member);
    setAnchorEl(e.currentTarget);
  };
  const deleteUser = () => {
    enableLoading('removeMember');
    deleteCharityUser({
      id: charityUser.id,
      charityId: match?.params?.charityId,
    })
      .then(({ data, status }) => {
        disableLoading('removeMember');

        if (status === 200) {
          showAlert('success', data.response.message);
          closeModal('removeMember')();
          getUsers({ pageNo, perPage, charityId: match?.params?.charityId });
        } else {
          showAlert('error', data.response.message);
        }
      })
      .catch(error => {
        disableLoading('removeMember');

        showAlert(
          'error',
          error?.response?.data?.response?.message || 'Could not remove user!',
        );
      });
  };
  const isCharityAdmin = () =>
    teamMembers?.filter(
      tm => tm.accountId.email === user.email && tm.role?.id === 2,
    ).length > 0;
  const getCurrentAdmin = () =>
    isCharityAdmin()
      ? teamMembers?.filter(
          tm => tm.accountId.email === user.email && tm.role?.id === 2,
        )[0]
      : {};
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
            {isCharityAdmin() && (
              <div className="campaignHeader1 d-flex flex-column flex-sm-row">
                <Button
                  onClick={openModal('addMember')}
                  className="campaignBtn"
                >
                  Add New Member
                </Button>
              </div>
            )}
          </Card.Title>
        </Card.Header>

        <Card.Body>
          <Container>
            {loading.main ? (
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
                      {isCharityAdmin() && <th>Actions</th>}
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
                        {isCharityAdmin() && (
                          <td>
                            <button
                              onClick={handleClickMenuOpen(member)}
                              className="btn btn-icon"
                              disabled={
                                getCurrentAdmin()?.accountId?.email ===
                                member.accountId?.email
                              }
                            >
                              <MoreVert />
                            </button>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleCloseMenu}
                            >
                              <MenuItem
                                className="menuList"
                                onClick={openModal('removeMember')}
                              >
                                <svg
                                  height="16px"
                                  viewBox="-40 0 427 427.00131"
                                  width="16px"
                                >
                                  <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                  <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                  <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                                  <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                                </svg>
                                <ListItemText
                                  primary="Delete User"
                                  style={{ marginLeft: 10 }}
                                />
                              </MenuItem>
                            </Menu>
                          </td>
                        )}
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
      <Modal show={showModal.addMember} onHide={closeModal('addMember')}>
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
                <Button type="submit" className="modalBtnYes">
                  Add Member{' '}
                  {loading.addMember && (
                    <Spinner animation="border" size="sm" />
                  )}
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Formik>
      </Modal>
      <Modal show={showModal.removeMember} onHide={closeModal('removeMember')}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Charity User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={closeModal('removeMember')}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete Now{' '}
            {loading.removeMember && <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
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
