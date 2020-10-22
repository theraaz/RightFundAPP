/**
 *
 * CharityBankDetailForm
 *
 */

import React, { memo } from 'react';
import {
  Row,
  Col,
  Button,
  Spinner,
  FormGroup,
  Accordion
} from 'react-bootstrap';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import CustomTextInputFormik from '../inputs/CustomTextInputFormik';
import { Heading, ToggleHeader } from '../../containers/MyProfile/myProfile';
import { shallowEqual, useSelector } from 'react-redux';
import LoadingComponent from '../LoadingComponent';

const CharityBankDetailForm = ({ subHeading, setFieldValue,
  values,
  errors,
  loading,
  banksAccounts,
  bankDetailsByCharity,
  bankDetails
}) => {

  const { myCharityProfile } = useSelector(
    ({ charity }) => ({
      myCharityProfile: charity.myCharityProfile,
    }),
    shallowEqual,
  );

  return <div>


    <Accordion defaultActiveKey="0">

      <Accordion.Toggle as={ToggleHeader} onClick={bankDetails} eventKey="0">

        <Heading>{subHeading}</Heading>


      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        {loading ? <LoadingComponent /> : <div>
          <Row>
            <Col md={6}>
              <label>Account Holder Name</label>
              <FormGroup className="mb-3">
                <CustomTextInputFormik
                  name="userName"
                  placeholder="Account Holder Name"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <label htmlFor="basic-url">Sort Code</label>
              <FormGroup className="mb-3">
                <CustomTextInputFormik
                  name="sortCode"
                  placeholder="Sort Code"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <label htmlFor="basic-url">Account Number</label>
              <FormGroup className="mb-3">
                <CustomTextInputFormik
                  name="accountNumber"
                  placeholder="Account Number"
                />
              </FormGroup>
            </Col>
          </Row>
          <div style={{ textAlign: 'end' }}>
            {banksAccounts?.length != 0 ?
              <Button type="submit" className="updateProfileBtn">
                {!loading && <div>Update</div>}
                {loading && <Spinner animation="border" size="sm" />}
              </Button>
              : <Button type="submit" className="updateProfileBtn">
                {!loading && <div>Add</div>}
                {loading && <Spinner animation="border" size="sm" />}
              </Button>
            }
          </div>
        </div>}

      </Accordion.Collapse>

      {loading ? <LoadingComponent /> :
        myCharityProfile ?
          <div>
            <Accordion.Toggle as={ToggleHeader} onClick={() =>

              bankDetailsByCharity(myCharityProfile.id)} eventKey="1">

              <Heading>{myCharityProfile.name}</Heading>


            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <div>
                <Row>
                  <Col md={6}>
                    <label>Account Holder Name</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="userName"
                        placeholder="Account Holder Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="basic-url">Sort Code</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="sortCode"
                        placeholder="Sort Code"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label htmlFor="basic-url">Account Number</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="accountNumber"
                        placeholder="Account Number"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <div style={{ textAlign: 'end' }}>

                  <Button type="submit" className="updateProfileBtn">
                    {!loading && <div>Update</div>}
                    {loading && <Spinner animation="border" size="sm" />}
                  </Button>

                </div>
              </div>
            </Accordion.Collapse>

          </div> : ''}
    </Accordion>

  </div>;
}

CharityBankDetailForm.propTypes = {};

export default memo(CharityBankDetailForm);
