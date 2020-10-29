/**
 *
 * Withdrawals
 *
 */

import React, { memo } from 'react';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import { Card } from 'react-bootstrap';
import Layout from '../../components/Layout/index';

import WithdrawalDetails from '../../components/Withdrawals/WithdrawalDetails';

export function Withdrawals() {
  return (
    <>
      <Helmet>
        <title>Withdrawals</title>
        <meta name="description" content="Description of banks" />
      </Helmet>
      <Layout>
        <Card className="dataCard shadow mb-5 bg-white">
          <Card.Header style={{ background: 'transparent' }}>
            <Card.Title className="campaignHeader">
              <span style={{ marginTop: '8px' }}>Withdrawals</span>
            </Card.Title>
          </Card.Header>

          {
            <Card.Body
              style={{
                padding: '1.25rem 20px 1.25rem 20px',
              }}
            >
              <WithdrawalDetails />
            </Card.Body>
          }
        </Card>
      </Layout>
    </>
  );
}

export default compose(memo)(Withdrawals);
