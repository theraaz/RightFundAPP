/**
 *
 * CharitiesList
 *
 */

import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import {
  adminChangeCharityStatus,
  adminGetAllCharities,
} from '../../utils/crud/admin.crud';
import { getAllMyCharities } from '../../utils/crud/charity.crud';
import {
  Button,
  Card,
  Container,
  Form,
  Modal,
  Spinner,
  Table,
} from 'react-bootstrap';
import LoadingComponent from '../LoadingComponent';
import EmptyComponent from '../EmptyComponent';
import { ListItemText, Menu, MenuItem, Tooltip } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { withRouter } from 'react-router-dom';
import { MoreVert, LockOutlined, LockOpenOutlined } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { getBadgeColorTableStatus } from '../../utils/helper';
function CharitiesList({ type, history }) {
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual,
  );
  const [myCharities, setMyCharities] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [q, setq] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [singleCharity, setSingleCharity] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [showModal, setShowModal] = useState({ login: false, suspend: false });
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState({
    charities: false,
    suspend: false,
  });
  useEffect(() => {
    enableLoading('charities');
    getCharities();
  }, [pageNo, perPage]);
  const getCharities = () => {
    const callGetCharities =
      user.role === 5 ? adminGetAllCharities : getAllMyCharities;
    callGetCharities({ pageNo, perPage, q })
      .then(({ data }) => {
        disableLoading('charities');
        setMyCharities(data?.response?.data?.res || []);
        setTotalPages(
          data?.response?.data?.count || data?.response?.data?.totalCount || 0,
        );
      })
      .catch(() => {
        disableLoading('charities');
      });
  };
  const PerPage = event => {
    setPerPage(event.target.value);
  };
  const handleChangePage = useCallback((event, value) => {
    setPageNo(value);
  }, []);
  const openModal = (name, stId) => () => {
    setShowModal({ ...showModal, [name]: true });
    setStatusId(stId);
    setAnchorEl(null);
  };
  const closeModal = name => () => {
    setShowModal({ ...showModal, [name]: false });
  };
  const enableLoading = name => {
    setLoading({ ...loading, [name]: true });
  };
  const disableLoading = name => {
    setLoading({ ...loading, [name]: false });
  };
  const showAlert = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };
  const changeStatusCharity = () => {
    enableLoading('suspend');
    adminChangeCharityStatus(singleCharity.id, statusId)
      .then(({ data, status }) => {
        disableLoading('suspend');
        if (status === 200) {
          showAlert('success', data.response.message);
          getCharities();
          closeModal('suspend')();
        } else {
          showAlert('error', data.response.message);
        }
      })
      .catch(error => {
        disableLoading('suspend');

        showAlert(
          'error',
          error?.response?.data?.response?.message ||
          'Could not perform this action!',
        );
      });
  };
  const handleClickMenuOpen = sCharity => e => {
    e.stopPropagation();
    setSingleCharity(sCharity);
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClickListItem = id => event => {
    event.stopPropagation();
    if (type === 'list') {
      history.push(`/charities/${id}`);
    } else if (type === 'team') {
      history.push(`/team-members/${id}`);
    }
  };

  const onChangeSearch = event => {
    setq(event.target.value);
  }

  const onSubmitSearch = event => {
    event.preventDefault();
    getCharities();
  }

  return (
    <Card className="dataCard shadow mb-5 bg-white">
      <Card.Header style={{ background: 'transparent' }}>
        <Card.Title className="campaignHeader">
          <span style={{ marginTop: '8px' }}>
            {user.role !== 5 && 'My'} Charities
          </span>
          <form onSubmit={onSubmitSearch}>
            <input
type="search"
              name="q"
              onChange={onChangeSearch}
              value={q}
              placeholder="Search by charity Name..." />
          </form>
        </Card.Title>
      </Card.Header>

      <Card.Body>
        <Container>
          {loading.charities ? (
            <LoadingComponent height={150} />
          ) : myCharities.length === 0 ? (
            <EmptyComponent height={150} message="No Charities Found!" />
          ) : (
            <div className="tableMain" style={{ backgroundColor: 'white' }}>
              <Table responsive="md" size="md" className="table1">
                <thead className="tableHeader">
                  <tr>
                    {user.role === 5 && <th>Charity ID</th>}
                    <th>Registration No</th>
                    <th>Charity Name</th>
                    {user.role !== 5 && <th>Position</th>}
                    {user.role !== 5 && <th>Role</th>}
                    <th>Status</th>
                    {user.role === 5 && type === 'list' && (
                      <th className="text-center">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="tableBody">
                  {myCharities.map((charity, i) => (
                    <Tooltip
                      title={`Click to View Charity ${type === 'team' ? 'Users' : 'Profile'
                        }`}
                      placement="top"
                      key={charity.id || i}
                    >
                      <tr
                        onClick={handleClickListItem(charity?.id)}
                        className="table-row__hover"
                      >
                        {user.role === 5 && <td>{charity?.id}</td>}
                        <td>
                          {(charity?.charityId
                            ? charity?.charityId?.regNo
                            : charity?.regNo) || 'N/A'}
                        </td>
                        <td>
                          {(charity?.charityId
                            ? charity?.charityId?.name
                            : charity.name) || 'N/A'}
                        </td>
                        {user.role !== 5 && (
                          <td className="text-capitalize">
                            {charity?.charityId?.position || 'N/A'}
                          </td>
                        )}
                        {user.role !== 5 && (
                          <td className="text-capitalize">
                            {charity?.role?.name?.toLowerCase() || 'N/A'}
                          </td>
                        )}

                        <td className="text-capitalize">
                          <div
                            style={{
                              backgroundColor: getBadgeColorTableStatus(
                                charity?.charityId
                                  ? charity?.charityId?.statusId?.id
                                  : charity?.statusId?.id,
                              ),
                            }}
                            className="status-badge"
                          >
                            {(charity?.charityId
                              ? charity?.charityId?.statusId?.name
                                ?.replace('ACTIVE', ' ACTIVE')
                                ?.toLowerCase()
                              : charity.statusId?.name
                                ?.replace('ACTIVE', ' ACTIVE')
                                ?.toLowerCase()) || 'N/A'}
                          </div>
                        </td>
                        {user.role === 5 && type === 'list' && (
                          <td className="text-center">
                            <button
                              onClick={handleClickMenuOpen(charity)}
                              className="btn btn-icon btn-sm p-0"
                            >
                              <MoreVert />
                            </button>
                          </td>
                        )}
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          className="menuList"
          disabled={singleCharity?.statusId?.id === 9}
          onClick={openModal('suspend', 9)}
        >
          <LockOutlined fontSize="small" />
          <ListItemText primary="Suspend" style={{ marginLeft: 10 }} />
        </MenuItem>
        <MenuItem
          className="menuList"
          disabled={singleCharity?.statusId?.id === 1}
          onClick={openModal('suspend', 1)}
        >
          <LockOpenOutlined fontSize="small" />
          <ListItemText primary="Activate" style={{ marginLeft: 10 }} />
        </MenuItem>
      </Menu>
      <Modal show={showModal.suspend} onHide={closeModal('suspend')}>
        <Modal.Header closeButton>
          <Modal.Title as="h5">Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to perform this action?</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={closeModal('suspend')}>
            No
          </Button>
          <Button variant="primary" onClick={changeStatusCharity}>
            Yes {loading.suspend && <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default withRouter(CharitiesList);
