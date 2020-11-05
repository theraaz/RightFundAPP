/**
 *
 * AdminWithdrawal
 *
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';
import {
  adminChangeWithdrawalStatus,
  adminGetAllWithdrawals,
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
import { ListItemText, Menu, MenuItem } from '@material-ui/core';
import {
  MoreVert,
  ThumbUpOutlined,
  ThumbDownOutlined,
} from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';
import moment from 'moment';
import { getBadgeColorTableStatus } from '../../utils/helper';
export function AdminWithdrawal() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [singleWithdrawal, setSingleWithdrawal] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState({
    main: false,
    withdrawal: false,
  });
  useEffect(() => {
    enableLoading('main');
    getWithdrawals({ pageNo, perPage });
  }, [pageNo, perPage]);
  const getWithdrawals = params => {
    adminGetAllWithdrawals(params)
      .then(res => {
        disableLoading('main');
        setWithdrawals(res?.data?.response?.data?.res || []);
        setTotalPages(
          res?.data?.response?.data?.count ||
            res?.data?.response?.data?.totalCount ||
            0,
        );
      })
      .catch(() => {
        disableLoading('main');
      });
  };
  const PerPage = event => {
    setPerPage(event.target.value);
  };
  const handleChangePage = useCallback((event, value) => {
    setPageNo(value);
  }, []);
  const openModal = stId => () => {
    setShowModal(true);
    setStatusId(stId);
    setAnchorEl(null);
  };
  const closeModal = () => {
    setShowModal(false);
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
  const changeStatusWithdrawal = () => {
    enableLoading('withdrawal');
    adminChangeWithdrawalStatus(singleWithdrawal.id, statusId)
      .then(({ data, status }) => {
        disableLoading('withdrawal');
        if (status === 200) {
          showAlert('success', data.response.message);
          getWithdrawals();
          closeModal();
        } else {
          showAlert('error', data.response.message);
        }
      })
      .catch(error => {
        disableLoading('withdrawal');

        showAlert(
          'error',
          error?.response?.data?.response?.message ||
            'Could not perform this action!',
        );
      });
  };
  const handleClickMenuOpen = sWithdrawal => e => {
    e.stopPropagation();
    setSingleWithdrawal(sWithdrawal);
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  });
  return (
    <Layout>
      <Helmet>
        <title>Withdrawal</title>
      </Helmet>
      <Card className="dataCard shadow mb-5 bg-white">
        <Card.Header style={{ background: 'transparent' }}>
          <Card.Title className="campaignHeader">
            <span style={{ marginTop: '8px' }}>Withdrawals</span>
          </Card.Title>
        </Card.Header>

        <Card.Body>
          <Container>
            {loading.main ? (
              <LoadingComponent height={150} />
            ) : withdrawals.length === 0 ? (
              <EmptyComponent height={150} message="No Withdrawals Found!" />
            ) : (
              <div className="tableMain" style={{ backgroundColor: 'white' }}>
                <Table responsive="md" size="md" className="table1">
                  <thead className="tableHeader">
                    <tr>
                      <th>Withdrawal Type</th>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Requested At</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {withdrawals.map((withdrawal, i) => (
                      <tr key={withdrawal.id || i}>
                        <td>
                          {withdrawal?.charityId ? 'Charity' : 'Individual'}
                        </td>
                        <td>
                          {withdrawal?.charityId
                            ? withdrawal?.charityId?.name
                            : `${withdrawal?.accountId?.firstName} ${
                                withdrawal?.accountId?.lastName
                              }`}
                        </td>
                        <td className="font-weight-bold text-dark">
                          {formatter.format(withdrawal.amount)}
                        </td>
                        <td>
                          {moment(withdrawal.createdAt).format(
                            'MMM DD, YYYY h:mm A',
                          )}
                        </td>

                        <td className="text-capitalize">
                          <div
                            style={{
                              backgroundColor: getBadgeColorTableStatus(
                                withdrawal?.statusId?.id,
                              ),
                            }}
                            className="status-badge"
                          >
                            {withdrawal?.statusId?.id === 1
                              ? 'Approved'
                              : withdrawal?.statusId?.id === 2
                              ? 'Not Approved'
                              : withdrawal?.statusId?.name?.toLowerCase()}
                          </div>
                        </td>

                        <td className="text-center">
                          <button
                            onClick={handleClickMenuOpen(withdrawal)}
                            disabled={withdrawal?.statusId?.id !== 4}
                            className="btn btn-icon btn-sm p-0"
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
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem
            className="menuList"
            disabled={singleWithdrawal?.statusId?.id !== 4}
            onClick={openModal(1)}
          >
            <ThumbUpOutlined fontSize="small" />
            <ListItemText primary="Approve" style={{ marginLeft: 10 }} />
          </MenuItem>
          <MenuItem
            className="menuList"
            disabled={singleWithdrawal?.statusId?.id !== 4}
            onClick={openModal(2)}
          >
            <ThumbDownOutlined fontSize="small" />
            <ListItemText primary="Disapprove" style={{ marginLeft: 10 }} />
          </MenuItem>
        </Menu>
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title as="h5">Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to perform this action?</Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={closeModal}>
              No
            </Button>
            <Button variant="primary" onClick={changeStatusWithdrawal}>
              Yes{' '}
              {loading.withdrawal && <Spinner animation="border" size="sm" />}
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </Layout>
  );
}

export default AdminWithdrawal;
