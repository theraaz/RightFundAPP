import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

const WithdrawalHistory = () => (
  <div className="tableMain">
    <div className="tableRow">
      <h5 className="DonationHeading">Withdrawal History</h5>
    </div>

    <Table responsive="md" striped size="md" className="table1">
      <thead className="tableHeader">
        <tr>
          <th>Name</th>
          <th>Sort Code</th>
          <th>Account Number</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody className="tableBody">
        <tr>
          <td>Raza Ahmed</td>
          <td>22-33-99</td>
          <td>00100-36972240010</td>
          <td>{moment().format('DD-MM-YYYY')}</td>

          <td className="text-dark font-weight-bold">$200</td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default WithdrawalHistory;
