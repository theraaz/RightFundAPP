import React from 'react';
import { Form, Table } from 'react-bootstrap';
import moment from 'moment';
import EmptyComponent from '../EmptyComponent';
import Pagination from '@material-ui/lab/Pagination';
import LoadingComponent from '../LoadingComponent';
import { getBadgeColorTableStatus } from '../../utils/helper';
const formatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
});
const WithdrawalHistory = ({
  withdrawalHistory,
  pageNo,
  handleChangePage,
  totalPages,
  perPage,
  PerPage,
  loading,
}) => (
  <div>
    <div className="tableMain">
      <div className="tableRow">
        <h5 className="DonationHeading">Withdrawal History</h5>
      </div>
      {loading ? (
        <LoadingComponent height={100} />
      ) : withdrawalHistory.length === 0 ? (
        <EmptyComponent height={100} message="No history found!" />
      ) : (
        <Table responsive="md" striped size="md" className="table1">
          <thead className="tableHeader">
            <tr>
              <th>Name</th>
              <th>Account Type</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Amount</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {withdrawalHistory?.map(withdrawal => (
              <tr key={withdrawal.id}>
                <td>
                  {withdrawal.accountId?.firstName}{' '}
                  {withdrawal.accountId?.lastName}
                </td>
                <td>{withdrawal.charityId ? 'Charity' : 'Individual'}</td>
                <td>{moment(withdrawal.createdAt).format('DD-MM-YYYY')}</td>
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
                <td className="text-dark text-center font-weight-bold">
                  {formatter.format(withdrawal.amount / 100 || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
    <div className="paginatordiv">
      <div className="paginatorPerSize">
        <span>Per Page</span>
        <Form.Control
          as="select"
          className="paginatorPerPage"
          onChange={PerPage}
        >
          <option className="paginatorPerPageOption" value="5">
            5
          </option>
          <option value="10">10</option>
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
  </div>
);

export default React.memo(WithdrawalHistory);
