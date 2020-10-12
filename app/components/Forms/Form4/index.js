/**
 *
 * Form4
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { H4 } from '../form.styles';
import './form4.scss';
import { Button, } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';


function Form4({ id, statusId, ...props }) {
  const token = localStorage.getItem('token');
  console.log(statusId);
  function publishCampaign() {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      }, body: JSON.stringify({
        statusId: 7,
      }),
    };


    fetch(`${process.env.baseURL}/campaign/status/${id}`, requestOptions)
      .then(response => response.json())
      .then(user => {
        console.log(user.response.data);
        props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      });

  }
  console.log(props)
  return <div>
    <div className='main-form1'>
      <div className='main-heading'>
        <H4>
          Campaign Status
          </H4>
        <p>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
      </div>

      <div className='success-icon'>
        <div className='icon-main'>
          <div>
            <svg version="1.1" id="Layer_1" viewBox="0 0 511.999 511.999" ><path style={{ fill: '#B7E183' }} d="M502.87,75.474c-12.201-12.204-31.952-12.205-44.154-0.001L163.89,370.299L53.284,259.693c-12.201-12.204-31.952-12.205-44.154-0.001c-12.173,12.174-12.173,31.981,0,44.153L141.814,436.53c12.199,12.198,31.953,12.2,44.153,0L502.87,119.626C515.042,107.453,515.042,87.645,502.87,75.474z" /><path style={{ fill: '#71DE56' }} d="M502.87,75.474c-12.201-12.204-31.952-12.205-44.154-0.001L243.511,290.678v88.306L502.87,119.626C515.042,107.453,515.042,87.645,502.87,75.474z" /><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
          </div>
        </div>
      </div>

      <div style={{ margin: '10px 0px 20px auto' }}>
        <div className='campaignBtnsForm4'>
          <Link to={`/campaignView/${id}`}>
            <Button className="editCampaignBtn" >Preview</Button>
          </Link>
          {statusId != 6 ? <Link to="/">
            <Button className="viewCampaignBtn" >Update
            </Button>
          </Link> : <Link to="/">

              <Button className="viewCampaignBtn" onClick={publishCampaign}> Publish

              </Button>

            </Link>}



        </div>
      </div>

    </div>
  </div>;
}

Form4.propTypes = {};

export default withRouter(memo(Form4));
