/**
 *
 * AccountVerify
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import Layout from '../../components/AuthLayout';

export function AccountVerify(props) {

  const [message, setMessage] = useState("");


  let name = props.location.search.split('=');
  console.log('token', name[1]);



  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': name[1]
    },
  };

  fetch(`${process.env.baseURL}/accountVerify`, requestOptions).then(response => response.json())
    .then(user => console.log(user));



return (
  <div>
    <Helmet>
      <title>Account Verify</title>
      <meta name="description" content="Description of AccountVerify" />
    </Helmet>

    <Layout title={'Verification'} description={'Account verification'} >
      <div>

      </div>
    </Layout>
  </div>
);
}

AccountVerify.propTypes = {
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
)(AccountVerify);
