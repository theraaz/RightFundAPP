/***
 *
  CharityBankDetailForm
 *
 */

import React, { memo, useCallback } from 'react';
import {
  Row,
  Col,
  Button,
  Spinner,
  FormGroup,
  Accordion,
} from 'react-bootstrap';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

import CustomTextInputFormik from '../inputs/CustomTextInputFormik';
import { Heading, ToggleHeader } from '../../containers/MyProfile/myProfile';
import '../../containers/MyProfile/myprofile.scss';
import { shallowEqual, useSelector } from 'react-redux';
import LoadingComponent from '../LoadingComponent';
import PlusIcon from '../svg-icons/plus';

const CharityBankDetailForm = ({
  subHeading,
  loading,
  banksAccounts,
  bankDetailsByCharity,
  bankDetails,
  buttonName = 'Update',
  accountNo = 'Account Holder Name',
  withdrawlAmount = 'Account Number',

}) => {

  const [selectedAccordion, setSelectedAccordion] = React.useState('0');

  const { myCharityProfile } = useSelector(
    ({ charity }) => ({
      myCharityProfile: charity.myCharityProfile,
    }),
    shallowEqual,
  );
  const onSelectAccordion = useCallback(selected => {
    setSelectedAccordion(selected);
  }, []);

  return (
    <div>
      <Accordion defaultActiveKey="0" onSelect={onSelectAccordion}>
        <Accordion.Toggle as={ToggleHeader} onClick={bankDetails} eventKey="0">
          <Heading>{subHeading}</Heading>
          {selectedAccordion === '0' ? <ExpandLess /> : <ExpandMore />}
          {/* <PlusIcon size="20px" /> */}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          {loading ? (
            <LoadingComponent />
          ) : (
              <div>
                <Row style={{ justifyContent: 'center' }}>
                  <Col md={6}>

                    <Col md={12}>
                      <div className='bankDetailsFormDiv'>
                        <Col md={4}>
                          <label>{accountNo}</label>
                        </Col>
                        <Col md={8}>
                          <FormGroup style={{ flexGrow: '1' }}>
                            <CustomTextInputFormik
                              name="userName"
                              placeholder={accountNo}
                            />
                          </FormGroup>
                        </Col>

                      </div>
                    </Col>
                    <Col md={12}>
                      <div className='bankDetailsFormDiv'>
                        <Col md={4}>
                          <label htmlFor="basic-url">Sort Code</label>
                        </Col>
                        <Col md={8}>
                          <FormGroup style={{ flexGrow: '1' }}>
                            <CustomTextInputFormik
                              name="sortCode"
                              placeholder="Sort Code"
                            />
                          </FormGroup>
                        </Col>

                      </div>
                    </Col>
                    <Col md={12}>
                      <div className='bankDetailsFormDiv'>
                        <Col md={4}>
                          <label htmlFor="basic-url">{withdrawlAmount}</label>
                        </Col>
                        <Col md={8}>
                          <FormGroup style={{ flexGrow: '1' }}>
                            <CustomTextInputFormik
                              name="accountNumber"
                              placeholder={withdrawlAmount}
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </div>
                    </Col>

                    <div style={{ textAlign: 'end', marginBottom: '15px', marginRight: '26px' }}>
                      <Button type="submit" className="updateProfileBtn">
                        {!loading && <div>{banksAccounts ? 'Update' : 'Add'}</div>}
                        {loading && <Spinner animation="border" size="sm" />}
                      </Button>
                    </div>
                  </Col>

                </Row>


              </div>
            )}
        </Accordion.Collapse>

        {myCharityProfile ? (
          <div>
            <Accordion.Toggle
              as={ToggleHeader}
              onClick={() => bankDetailsByCharity(myCharityProfile.id)}
              eventKey="1"
            >
              <Heading>{myCharityProfile.name}</Heading>
              {selectedAccordion === '1' ? <ExpandLess /> : <ExpandMore />}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              {loading ? (
                <LoadingComponent />
              ) : (
                  <div>
                    <Row style={{ justifyContent: 'center' }}>
                      <Col md={6}>

                        <Col md={12}>
                          <div className='bankDetailsFormDiv'>
                            <Col md={4}>
                              <label>{accountNo}</label>
                            </Col>
                            <Col md={8}>
                              <FormGroup style={{ flexGrow: '1' }}>
                                <CustomTextInputFormik
                                  name="userName"
                                  placeholder={accountNo}
                                />
                              </FormGroup>
                            </Col>

                          </div>
                        </Col>
                        <Col md={12}>
                          <div className='bankDetailsFormDiv'>
                            <Col md={4}>
                              <label htmlFor="basic-url">Sort Code</label>
                            </Col>
                            <Col md={8}>
                              <FormGroup style={{ flexGrow: '1' }}>
                                <CustomTextInputFormik
                                  name="sortCode"
                                  placeholder="Sort Code"
                                />
                              </FormGroup>
                            </Col>

                          </div>
                        </Col>
                        <Col md={12}>
                          <div className='bankDetailsFormDiv'>
                            <Col md={4}>
                              <label htmlFor="basic-url">{withdrawlAmount}</label>
                            </Col>
                            <Col md={8}>
                              <FormGroup style={{ flexGrow: '1' }}>
                                <CustomTextInputFormik
                                  name="accountNumber"
                                  placeholder={withdrawlAmount}
                                  type="number"
                                />
                              </FormGroup>
                            </Col>
                          </div>
                        </Col>

                        <div style={{ textAlign: 'end', marginBottom: '15px', marginRight: '26px' }}>
                          <Button type="submit" className="updateProfileBtn">
                            {!loading && <div>{buttonName}</div>}
                            {loading && <Spinner animation="border" size="sm" />}
                          </Button>
                        </div>
                      </Col>

                    </Row>


                  </div>
                )}
            </Accordion.Collapse>
          </div>
        ) : (
            ''
          )}
      </Accordion>
    </div>
  );
};

CharityBankDetailForm.propTypes = {};

export default memo(CharityBankDetailForm);
