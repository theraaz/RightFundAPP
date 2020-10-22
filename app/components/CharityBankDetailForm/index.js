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


import CustomTextInputFormik from '../inputs/CustomTextInputFormik';
import { Heading, ToggleHeader } from '../../containers/MyProfile/myProfile';
import '../../containers/MyProfile/myprofile.scss';
import { shallowEqual, useSelector } from 'react-redux';
import LoadingComponent from '../LoadingComponent';
import PlusIcon from '../svg-icons/plus';

const CharityBankDetailForm = ({ subHeading, setFieldValue,
  values,
  errors,
  loading,
  banksAccounts,
  bankDetailsByCharity,
  bankDetails,
  buttonName = 'Update',
  accountNo = 'Account Holder Name',
  withdrawlAmount = 'Account Number'
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
        <PlusIcon size='20px'></PlusIcon>

      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        {loading ? <LoadingComponent /> : <div>
          <Row>
            <Col md={6}>
              <label>{accountNo}</label>
              <FormGroup className="mb-3">
                <CustomTextInputFormik
                  name="userName"
                  placeholder={accountNo}
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
              <label htmlFor="basic-url">{withdrawlAmount}</label>
              <FormGroup className="mb-3">
                <CustomTextInputFormik
                  name="accountNumber"
                  placeholder={withdrawlAmount}
                  type='number'
                />
              </FormGroup>
            </Col>
          </Row>
          <div style={{ textAlign: 'end', marginBottom: '15px' }}>
            {banksAccounts?.length != 0 ?
              <Button type="submit" className="updateProfileBtn">
                {!loading && <div>{buttonName}</div>}
                {loading && <Spinner animation="border" size="sm" />}
              </Button>
              : <Button type="submit" className="updateProfileBtn">
                {!loading && <div>{buttonName}</div>}
                {loading && <Spinner animation="border" size="sm" />}
              </Button>
            }
          </div>
        </div>}

      </Accordion.Collapse>

      {
        myCharityProfile ?
          <div>
            <Accordion.Toggle as={ToggleHeader} onClick={() =>

              bankDetailsByCharity(myCharityProfile.id)} eventKey="1">

              <Heading>{myCharityProfile.name}</Heading>
              <PlusIcon size='20px'></PlusIcon>

            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              {loading ? <LoadingComponent /> :
                <div>
                  <Row>
                    <Col md={6}>
                      <label>{accountNo}</label>
                      <FormGroup className="mb-3">
                        <CustomTextInputFormik
                          name="userName"
                          placeholder={accountNo}
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
                      <label htmlFor="basic-url">{withdrawlAmount}</label>
                      <FormGroup className="mb-3">
                        <CustomTextInputFormik
                          name="accountNumber"
                          placeholder={withdrawlAmount}
                          type='number'
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div style={{ textAlign: 'end', marginBottom: '15px' }}>

                    <Button type="submit" className="updateProfileBtn">
                      {!loading && <div>{buttonName}</div>}
                      {loading && <Spinner animation="border" size="sm" />}
                    </Button>

                  </div>
                </div>
              }
            </Accordion.Collapse>

          </div> : ''}
    </Accordion>

  </div>;
}

CharityBankDetailForm.propTypes = {};

export default memo(CharityBankDetailForm);
