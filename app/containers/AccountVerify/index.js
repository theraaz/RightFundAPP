/**
 *
 * AccountVerify
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import Layout from '../../components/AuthLayout';

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './accountvVerify.scss';
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
  
  useEffect(() => {


    fetch(`${process.env.baseURL}/accountVerify`, requestOptions).then(response => response.json())
      .then(user => {
        if (user.statusCode == 200) {
          setMessage('Congratulations! your account is verified');
        } else {
          setMessage('Something went missing, Please try again');

        }
        console.log(message);
      });
    //   return ()=>{
    // //Component unmount    
    //   }
  },[]);





  return (
    <div>
      <Helmet>
        <title>Account Verify</title>
        <meta name="description" content="Description of AccountVerify" />
      </Helmet>

      <Layout title={'Verification'} description={'Account verification'} >
        <div style={{ textAlign: 'center' }}>
          <p className='message'> {message}</p>

          <div className='authBtns'>
            <Link to="/login">

              <Button className="campaignBtn">Login</Button>{' '}

            </Link>

            <Link to="/signup">

              <Button className="campaignBtn" >Sign up</Button>{' '}

            </Link>
          </div>
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
