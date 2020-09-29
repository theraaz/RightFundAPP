/**
 *
 * VerifiedAccount
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Layout from '../AuthLayout/Loadable';
import { Button } from 'react-bootstrap';
import '../../containers/AccountVerify/accountvVerify.scss';

function VerifiedAccount() {
  return (
    <div>
      <Helmet>
        <title>Account Verify</title>
        <meta name="description" content="Description of AccountVerify" />
      </Helmet>

      <Layout title={'Verification'} description={'Account verification'} >
        <div style={{ textAlign: 'center' }}>
          <p className='message'> Your account is not verified. Please verified it</p>

          <div className='authBtns'>
            <Button className="campaignBtn">Resend Email</Button>{' '}
          </div>
        </div>
      </Layout>
    </div>
  );
}

VerifiedAccount.propTypes = {};

export default memo(VerifiedAccount);
