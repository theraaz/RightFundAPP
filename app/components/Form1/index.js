/**
 *
 * Form1
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Row, Col, Card, ListGroup, Dropdown, Button, Container, ProgressBar } from 'react-bootstrap/'

import { FormattedMessage } from 'react-intl';
import './form1.scss';

import { Formik, Form } from 'formik';

const Form1 = ({ children }) => {

  const validate = (values, props /* only available when using withFormik */) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    //...

    return errors;
  };


  return (
    <div>
      <div className='main-form1'>
        <div className='main-heading'>
          <h5>
            Campaign Information
      </h5>
          <p>Please enter your campaign information and proceed to the next step so we can build your campaign.</p>
        </div>
        <Formik
          initialValues={{ value: '', currency: '$ USD' }}
          validate={validate}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {props => (
            <Form onSubmit={props.handleSubmit}>
              <div style={{ display: 'flex' }}>
                <h5>Campaign Goal</h5>

                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" className="dropBtn">
                    {props.values.currency}</Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item className="dropItem" onClick={() => props.setFieldValue('currency', '$ USD')}>$USD</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.setFieldValue('currency', '$ EUR')}>$EUR</Dropdown.Item>
                    <Dropdown.Item >Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <input
                  type="text"
                  onChange={props.handleChange}
                  value={props.values.value}
                  name="value"
                />
                {props.errors.value && <div id="feedback">{props.errors.value}</div>}
              </div>



              {/* <input
                type="text"
                onChange={props.handleChange}
                value={props.values.email}
                name="email"
              />
              {props.errors.email && <div id="feedback">{props.errors.email}</div>} */}
              {/* <button type="submit">Submit</button> */}
            </Form>
          )}
        </Formik>
      </div>
    </div >
  );
}

Form1.propTypes = {};

export default memo(Form1);
