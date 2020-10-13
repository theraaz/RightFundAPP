/**
 *
 * AccountVerification
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import Layout from '../../components/AuthLayout/Loadable';
import { Button, Form } from 'react-bootstrap';
import '../AccountVerify/accountvVerify.scss';
import { shallowEqual, useSelector } from 'react-redux';
import { resendVerifyLink } from '../../utils/crud/auth.crud';
export function AccountVerification() {
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual,
  );

  console.log(user);
  function resendEmail() {
    resendVerifyLink({ email: user.email })
      .then(({ data, status }) => {
        console.log(data);
      }
      )
  }

  return (
    <div>
      <Helmet>
        <title>Account Verify</title>
        <meta name="description" content="Description of AccountVerify" />
      </Helmet>

      <Layout title={'Verification'} description={'Account verification'} >
        <div style={{ textAlign: 'center' }}>
          <p className='message'> Your account is not verified. Please verified it</p>

          <div>
            <Form>
              <Form.Group style={{ position: 'relative' }}>
                <div className="formsDiv">
                  <svg
                    id="Capa_1"
                    className="icons"
                    style={{ color: '#818386' }}
                    height="20"
                    viewBox="0 0 512.627 512.627"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M485.743,85.333H26.257C11.815,85.333,0,97.148,0,111.589V400.41c0,14.44,11.815,26.257,26.257,26.257h459.487
			c14.44,0,26.257-11.815,26.257-26.257V111.589C512,97.148,500.185,85.333,485.743,85.333z M475.89,105.024L271.104,258.626
			c-3.682,2.802-9.334,4.555-15.105,4.529c-5.77,0.026-11.421-1.727-15.104-4.529L36.109,105.024H475.89z M366.5,268.761
			l111.59,137.847c0.112,0.138,0.249,0.243,0.368,0.368H33.542c0.118-0.131,0.256-0.23,0.368-0.368L145.5,268.761
			c3.419-4.227,2.771-10.424-1.464-13.851c-4.227-3.419-10.424-2.771-13.844,1.457l-110.5,136.501V117.332l209.394,157.046
			c7.871,5.862,17.447,8.442,26.912,8.468c9.452-0.02,19.036-2.6,26.912-8.468l209.394-157.046v275.534L381.807,256.367
			c-3.42-4.227-9.623-4.877-13.844-1.457C363.729,258.329,363.079,264.534,366.5,268.761z"
                      />
                    </g>
                  </svg>
                </div>

                <Form.Control
                  required
                  className="form-input"
                  placeholder="Email"
                  type="email"
                  value={user.email}
                  onChange={event => setEmail(event.target.value)}
                />

              </Form.Group>
            </Form>
            <Button className="resendEmailBtn" onClick={resendEmail}>Resend Email</Button>{' '}
          </div>
        </div>
      </Layout>
    </div>
  );
}

AccountVerification.propTypes = {
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
  memo,
)(AccountVerification);
