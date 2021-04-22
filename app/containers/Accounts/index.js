/**
 *
 * Accounts
 *
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout/index';
import {
  adminChangeAccountStatus,
  adminForceLogin,
  adminGetAllAccounts,
} from '../../utils/crud/admin.crud';
import { useSnackbar } from 'notistack';
import {
  Button,
  Card,
  Container,
  Form,
  Modal,
  Spinner,
  Table,
} from 'react-bootstrap';
import LoadingComponent from '../../components/LoadingComponent';
import EmptyComponent from '../../components/EmptyComponent';
import {
  ExitToApp,
  MoreVert,
  LockOutlined,
  LockOpenOutlined,
} from '@material-ui/icons';
import { ListItemText, Menu, MenuItem } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { authActions } from '../../utils/action-creators/auth.action.creator';
import { getBadgeColorTableStatus } from '../../utils/helper';

export function Accounts({ login, history }) {
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual,
  );
  const [accounts, setAccounts] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [q, setq] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [singleUser, setSingleUser] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState({
    accounts: false,
    login: false,
    suspend: false,
  });
  const [showModal, setShowModal] = useState({ login: false, suspend: false });
  const enableLoading = name => {
    setLoading({ ...loading, [name]: true });
  };
  const disableLoading = name => {
    setLoading({ ...loading, [name]: false });
  };
  useEffect(() => {
    enableLoading('accounts');
    getAccounts();
  }, [pageNo, perPage]);
  const getAccounts = () => {
    adminGetAllAccounts({ pageNo, perPage, q })
      .then(res => {
        disableLoading('accounts');
        setAccounts(res?.data?.response?.data?.res || []);
        setTotalPages(res?.data?.response?.data?.totalCount || 0);
      })
      .catch(() => {
        disableLoading('accounts');
      });
  };
  const showAlert = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };
  const openModal = (name, stId) => () => {
    setShowModal({ ...showModal, [name]: true });
    setStatusId(stId);
    setAnchorEl(null);
  };
  const closeModal = name => () => {
    setShowModal({ ...showModal, [name]: false });
  };
  const PerPage = event => {
    setPerPage(event.target.value);
  };
  const handleChangePage = useCallback((event, value) => {
    setPageNo(value);
  }, []);
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const forceLogin = () => {
    enableLoading('login');
    adminForceLogin({ email: singleUser.email })
      .then(({ data, status }) => {
        disableLoading('login');
        if (status === 200) {
          showAlert('success', data.response.message);
          login({
            token: data.response?.data?.token,
            user: data.response?.data?.res,
          });
          localStorage.setItem('token', data.response.data.token);
          history.push('/');
          closeModal('login')();
        } else {
          showAlert('error', data.response.message);
        }
      })
      .catch(error => {
        disableLoading('login');

        showAlert(
          'error',
          error?.response?.data?.response?.message || 'Could not login!',
        );
      });
  };
  const changeAccountStatus = () => {
    enableLoading('suspend');
    adminChangeAccountStatus(singleUser.id, statusId)
      .then(({ data, status }) => {
        disableLoading('suspend');
        if (status === 200) {
          showAlert('success', data.response.message);
          getAccounts();
          closeModal('suspend')();
        } else {
          showAlert('error', data.response.message);
        }
      })
      .catch(error => {
        disableLoading('suspend');

        showAlert(
          'error',
          error?.response?.data?.response?.message || 'Could not Suspend!',
        );
      });
  };
  const handleClickMenuOpen = sUser => e => {
    setSingleUser(sUser);
    setAnchorEl(e.currentTarget);
  };

  const onChangeSearch = event => {
    setq(event.target.value);
  }

  const onSubmitSearch = event => {
    event.preventDefault();
    getAccounts();
  }

  return (
    <Layout>
      <Helmet>
        <title>Accounts</title>
        <meta name="description" content="All Accounts of RightFunds" />
      </Helmet>
      <Card className="dataCard shadow mb-5 bg-white">
        <Card.Header style={{ background: 'transparent' }}>
          <Card.Title className="campaignHeader">
            <span style={{ marginTop: '8px' }}>All Accounts</span>
            <form onSubmit={onSubmitSearch}>
              <input
                type="search"
                name="q"
                onChange={onChangeSearch}
                value={q}
                placeholder="Search by Email..." />
            </form>
          </Card.Title>
        </Card.Header>

        <Card.Body>
          <Container>
            {loading.accounts ? (
              <LoadingComponent height={150} />
            ) : accounts.length === 0 ? (
              <EmptyComponent height={150} message="No Accounts Found!" />
            ) : (
              <div className="tableMain" style={{ backgroundColor: 'white' }}>
                <div className="tableRow">
                  <h5 className="DonationHeading">Accounts</h5>
                </div>

                <Table responsive striped size="sm" className="table1">
                  <thead className="tableHeader">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {accounts.map((account, i) => (
                      <tr key={account.id || i}>
                        <td>{`${account?.firstName} ${account?.lastName}`}</td>
                        <td>{account?.email || 'N/A'}</td>
                        <td className="text-capitalize">
                          {account?.role?.name?.toLowerCase() || 'N/A'}
                        </td>
                        <td className="text-capitalize">
                          <div
                            style={{
                              backgroundColor: getBadgeColorTableStatus(
                                account?.statusId?.id,
                              ),
                            }}
                            className="status-badge"
                          >
                            {account?.statusId?.name
                              ?.replace('ACTIVE', ' ACTIVE')
                              ?.toLowerCase() || 'N/A'}
                          </div>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={handleClickMenuOpen(account)}
                            className="btn btn-icon"
                            disabled={
                              user?.email === account?.email ||
                              account?.role?.id === 4
                            }
                          >
                            <MoreVert />
                          </button>
                        </td>
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          className="menuList"
          disabled={singleUser?.statusId?.id === 9}
          onClick={openModal('suspend', 9)}
        >
          <LockOutlined fontSize="small" />
          <ListItemText primary="Suspend" style={{ marginLeft: 10 }} />
        </MenuItem>
        <MenuItem
          className="menuList"
          disabled={singleUser?.statusId?.id === 1}
          onClick={openModal('suspend', 1)}
        >
          <LockOpenOutlined fontSize="small" />
          <ListItemText primary="Activate" style={{ marginLeft: 10 }} />
        </MenuItem>
        <MenuItem className="menuList" onClick={openModal('login')}>
          <ExitToApp fontSize="small" />
          <ListItemText primary="Force Login" style={{ marginLeft: 10 }} />
        </MenuItem>
      </Menu>
      <Modal show={showModal.login} onHide={closeModal('login')}>
        <Modal.Header closeButton>
          <Modal.Title as="h5">Force Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to force login to this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={closeModal('login')}>
            Cancel
          </Button>
          <Button variant="primary" onClick={forceLogin}>
            Login Now{' '}
            {loading.login && <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal.suspend} onHide={closeModal('suspend')}>
        <Modal.Header closeButton>
          <Modal.Title as="h5">Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to perform this action?</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={closeModal('suspend')}>
            No
          </Button>
          <Button variant="primary" onClick={changeAccountStatus}>
            Yes {loading.suspend && <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default connect(
  null,
  authActions,
)(Accounts);
