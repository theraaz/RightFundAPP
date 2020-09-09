/**
 *
 * Form1
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Row, Col, Card, ListGroup, Dropdown, Button, Container, ProgressBar, Form } from 'react-bootstrap/'

import { FormattedMessage } from 'react-intl';
import './form1.scss';

import { Formik } from 'formik';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { H5, H4 } from './form1.styles';

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
          <H4>
            Campaign Information
      </H4>
          <p>Please enter your campaign information and proceed to the next step so we can build your campaign.</p>
        </div>
        <Formik
          initialValues={{ value: '', currency: '$ USD', date: new Date() }}
          validate={validate}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {props => (
            <form onSubmit={props.handleSubmit}>
              <div className="mainForm">
                <Form.Group controlId="email" bssize="large" style={{ position: 'relative' }}>

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Row>
                      <Col ms={3}>
                        <H5>Campaign Goal</H5>
                      </Col>
                      <Col xs={2}>
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic" className="dropBtn">
                            {props.values.currency}</Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item className="dropItem" onClick={() => props.setFieldValue('currency', '$ USD')}>$USD</Dropdown.Item>
                            <Dropdown.Item onClick={() => props.setFieldValue('currency', '$ EUR')}>$EUR</Dropdown.Item>
                            <Dropdown.Item >Something else</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                      <Col md={7}>
                        <input
                          type="text"
                          onChange={props.handleChange}
                          value={props.values.value}
                          name="value"
                          className="inputForm"
                        />
                      </Col>
                      {props.errors.value && <div id="feedback">{props.errors.value}</div>}
                    </Row>
                  </div>
                </Form.Group>
                <Form.Group controlId="email" bssize="large" style={{ position: 'relative' }}>


                  <input
                    type="text"
                    onChange={props.handleChange}
                    value={props.values.title}
                    name="title"
                    placeholder="Campaign Title"
                    className="inputForm"
                  />
                  {props.errors.title && <div id="feedback">{props.errors.title}</div>}
                </Form.Group>
                <Form.Group controlId="email" bssize="large" style={{ position: 'relative' }}>

                  <input
                    type="text"
                    onChange={props.handleChange}
                    value={props.values.address}
                    name="address"
                    placeholder="Address"
                    className="inputForm"
                  />
                  {props.errors.address && <div id="feedback">{props.errors.address}</div>}
                </Form.Group>
                <Form.Group controlId="email" bssize="large" style={{ position: 'relative' }}>

                  <DatePicker name="date" selected={props.values.date} value={props.values.date} onChange={(data) => props.setFieldValue('date', data)}
                    className="inputForm"
                  />
                  {props.errors.date && <div id="feedback">{props.errors.date}</div>}
                </Form.Group>

                <Form.Group controlId="email" bssize="large" style={{ position: 'relative' }}>

                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="dropBtn">
                      {props.values.currency}</Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item className="dropItem" onClick={() => props.setFieldValue('currency', '$ USD')}>$USD</Dropdown.Item>
                      <Dropdown.Item onClick={() => props.setFieldValue('currency', '$ EUR')}>$EUR</Dropdown.Item>
                      <Dropdown.Item >Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
              </div>
              {/* <button type="submit">Submit</button> */}
            </form>
          )}
        </Formik>
      </div>
    </div >
  );
}

Form1.propTypes = {};

export default memo(Form1);
