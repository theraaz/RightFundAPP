/**
 *
 * CampaignDonations
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Button,
  Container,
  Spinner,
  Table,
  Row
} from 'react-bootstrap';

import './campaignDontaions.scss';

function CampaignDonations(editCampaignData) {
  console.log(editCampaignData)
  return <div>
    <div className='tableMain'>
      <Row className='tableRow'>
        <h5 className='DonationHeading'>Donations</h5>
      </Row>
      <Table responsive className='table1' >

        <thead className='tableHeader'>

          <tr>


            <th >Donner Name</th>
            <th >Email</th>
            <th >Address</th>
            <th >Gift Aid Enabled</th>
            <th >Date</th>
            <th >Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Raza</td>
            <td>raza@gmail.com</td>
            <td>London</td>
            <td>No</td>
            <td>12-09-2020</td>
            <td>$200</td>

          </tr>
          <tr>
            <td>Raza</td>
            <td>raza@gmail.com</td>
            <td>London</td>
            <td>No</td>
            <td>12-09-2020</td>
            <td>$200</td>

          </tr>
          <tr>
            <td>Raza</td>
            <td>raza@gmail.com</td>
            <td>London</td>
            <td>No</td>
            <td>12-09-2020</td>
            <td>$200</td>

          </tr>

        </tbody>
      </Table>
    </div>
  </div>;
}

CampaignDonations.propTypes = {};

export default memo(CampaignDonations);
