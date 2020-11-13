/***
 *
  CharityBankDetailForm
 *
 */

import React, { memo, useEffect, useCallback } from 'react';
import { Button, FormGroup, Form, Card, Row, Col, Accordion } from 'react-bootstrap';

import CustomTextInputFormik from '../inputs/CustomTextInputFormik';
import { Heading, ToggleHeader } from '../../containers/MyProfile/myProfile';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import '../../containers/MyProfile/myProfile.scss';
import { shallowEqual, useSelector } from 'react-redux';
import LoadingComponent from '../LoadingComponent';
import MaskedInput, { conformToMask } from 'react-text-mask';
import { ErrorMessage, Formik } from 'formik';
import {
    addBankDetails,
    getBankDetails,
    getBankDetailsByCharityId,
    updateBankDetails,
    addCharityBankDetails
} from '../../utils/crud/bankDetail.crud';
import FormErrorMessage from '../FormErrorMessage';
import { Alert, AlertTitle } from '@material-ui/lab';
import EmptyComponent from '../EmptyComponent';

const CharityBankDetailForm = ({
    accountNo = 'Bank Name',


}) => {
    const { myCharityProfile } = useSelector(
        ({ charity }) => ({
            myCharityProfile: charity.myCharityProfile,
        }),
        shallowEqual,
    );
    const [loading, setLoading] = React.useState(false);
    const [banksAccounts, setBanksAccounts] = React.useState(null);
    const [charityAccountsID, setCharityAccountsID] = React.useState(null);
    const [networkError, setNetworkError] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const mask = [/\d/, '-', /\d/, '-', /\d/, '-', /\d/];
    const [selectedAccordion, setSelectedAccordion] = React.useState('0');
    // const mask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];


    const onSelectAccordion = useCallback(selected => {
        setSelectedAccordion(selected)
    })

    useEffect(() => {
        // if (title === 'Individual') {
        bankDetails();
        // } else {
        //   bankDetailsByCharity(myCharityProfile?.id);
        // }
    }, []);


    function addBank() {
        setLoading(true);
        addBankDetails()
            .then(({ data }) => {
                openStripeURL(data.response.data.accountInfo.url);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    function addCharityBank() {
        console.log(selectedAccordion);
        setLoading(true);
        addCharityBankDetails(charityAccountsID)
            .then(({ data }) => {
                openStripeURL(data.response.data.accountInfo.url);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    function updateBank() {
        let id = banksAccounts.id;
        setLoading(true)
        updateBankDetails(id)
            .then(({ data }) => {
                console.log(data);
                openStripeURL(data.response.data.accountInfo.url);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    function updateCharityBank() {
        let id = banksAccounts.id;
        setLoading(true)
        updateBankDetails(id)
            .then(({ data }) => {
                console.log(data);
                openStripeURL(data.response.data.accountInfo.url);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    function openStripeURL(url) {
        window.open(url, '_self');
    }

    function bankDetails() {
        setLoading(true);
        setBanksAccounts(null);
        getBankDetails()
            .then(({ data }) => {
                console.log('data', data);
                setLoading(false);
                setCharityAccountsID(null);
                setBanksAccounts(data.response.data?.res);
                if (data.response.data?.res.id) {
                    setShowAlert(!data.response.data.res.payoutsEnabled)
                } else {
                    setShowAlert(true)

                }
            })
            .catch(error => {
                setLoading(false);
                setNetworkError(true);
                console.log(error);
            });
    }

    function bankDetailsByCharity(id) {
        setLoading(true);
        console.log('chairty')
        setBanksAccounts(null);
        getBankDetailsByCharityId(id)
            .then(({ data }) => {
                setLoading(false);
                setCharityAccountsID(id);
                setBanksAccounts(data.response.data?.res);
                if (data.response.data?.res.id) {
                    setShowAlert(!data.response.data.res.payoutsEnabled)
                } else {
                    setShowAlert(true)

                }
            })
            .catch(error => {
                setLoading(false);
                console.log(error);
            });
    }

    return (
        <Card className="dataCard shadow mb-5 bg-white">
            <Card.Header className='bankDetailsHeader'>
                <Card.Title className="campaignHeader">
                    <span style={{ marginTop: '8px' }}>Bank Details</span>
                </Card.Title>
                {loading || (selectedAccordion == null) ? '' : (banksAccounts?.id ? <Button onClick={selectedAccordion == 0 ? updateBank : updateCharityBank}>{selectedAccordion == 0 ? 'Update Account' : 'Update Charity Account'}</Button> :
                    <Button onClick={selectedAccordion == 0 ? addBank : addCharityBank}>{selectedAccordion == 0 ? 'Add Bank' : 'Add Charity Account'}</Button>)}

            </Card.Header>

            {networkError ? (<EmptyComponent height={363} message="Service not availble! Please try again." />) :
                <Accordion defaultActiveKey="0" onSelect={onSelectAccordion}>
                    <Accordion.Toggle as={ToggleHeader} onClick={bankDetails} eventKey="0">
                        <Heading>Individual</Heading>
                        {selectedAccordion === '0' ? <ExpandLess /> : <ExpandMore />}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        {loading ? <LoadingComponent /> : (
                            banksAccounts?.id ? (
                                <div>

                                    { showAlert ?

                                        <Alert severity="error" style={{ marginTop: '5px' }}>
                                            <AlertTitle>Not Verified</AlertTitle>
                                                 Your account is not Verified  —
                                                 <strong onClick={updateBank} className='updateLink'> Click here to verify</strong>
                                        </Alert>
                                        : <Alert severity="success" style={{ marginTop: '5px' }}>
                                            <AlertTitle>Verified</AlertTitle>
                                                 Your account is Verified
                                                 </Alert>
                                    }
                                    <Card.Body
                                        style={{
                                            padding: '1.25rem 20px 1.25rem 20px',
                                        }}
                                    >
                                        <Row className="justify-content-center">
                                            <Col xs={12} sm={6}>
                                                <div className={banksAccounts?.id ? '' : 'bankDetailsAdd'}>

                                                    <div className={banksAccounts?.id ? 'updateBtnBankDetails' : ''}>
                                                    </div>
                                                    <Formik
                                                        initialValues={{
                                                            userName: banksAccounts?.bankDetails?.bankName || '',
                                                            sortCode: banksAccounts?.bankDetails?.accountLast4Digits || '',
                                                            // accountNumber: banksAccounts?.accountNo || '',
                                                        }}
                                                        enableReinitialize
                                                    >
                                                        {({ values, errors, touched, setFieldValue }) => (
                                                            <form>

                                                                <div>
                                                                    <div>
                                                                        <label>{accountNo}</label>

                                                                        <FormGroup style={{ flexGrow: '1' }}>
                                                                            <CustomTextInputFormik
                                                                                name="userName"
                                                                                disabled={true}
                                                                                placeholder={accountNo}
                                                                            />
                                                                        </FormGroup>
                                                                    </div>

                                                                    <div>
                                                                        <label htmlFor="basic-url">Account last 4 digits</label>

                                                                        <FormGroup style={{ flexGrow: '1' }}>
                                                                            <MaskedInput
                                                                                mask={mask}
                                                                                isValid={touched['sortCode'] && !errors['sortCode']}
                                                                                isInvalid={touched['sortCode'] && errors['sortCode']}
                                                                                className="form-control"
                                                                                disabled={true}
                                                                                placeholder="xx-xx-xx"
                                                                                value={
                                                                                    conformToMask(values.sortCode, mask)?.conformedValue
                                                                                }
                                                                                onChange={e => {
                                                                                    setFieldValue('sortCode', e.target?.value);
                                                                                }}
                                                                                render={(ref, props) => (
                                                                                    <Form.Control ref={ref} {...props} />
                                                                                )}
                                                                            />
                                                                            <ErrorMessage name={'sortCode'} render={FormErrorMessage} />
                                                                        </FormGroup>
                                                                    </div>
                                                                </div>

                                                            </form>
                                                        )}
                                                    </Formik>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </div>
                            ) :
                                <EmptyComponent height={150} message="No Bank Account Found." />
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
                                {loading ? <LoadingComponent /> : (
                                    banksAccounts?.id ? (
                                        <div>

                                            { showAlert ?

                                                <Alert severity="error" style={{ marginTop: '5px' }}>
                                                    <AlertTitle>Not Verified</AlertTitle>
                                                 Your account is not Verified  —
                                                 <strong onClick={updateBank} className='updateLink'> Click here to verify</strong>
                                                </Alert>
                                                : <Alert severity="success" style={{ marginTop: '5px' }}>
                                                    <AlertTitle>Verified</AlertTitle>
                                                 Your account is Verified
                                                 </Alert>
                                            }
                                            <Card.Body
                                                style={{
                                                    padding: '1.25rem 20px 1.25rem 20px',
                                                }}
                                            >
                                                <Row className="justify-content-center">
                                                    <Col xs={12} sm={6}>
                                                        <div className={banksAccounts?.id ? '' : 'bankDetailsAdd'}>

                                                            <div className={banksAccounts?.id ? 'updateBtnBankDetails' : ''}>
                                                            </div>
                                                            <Formik
                                                                initialValues={{
                                                                    userName: banksAccounts?.bankDetails?.bankName || '',
                                                                    sortCode: banksAccounts?.bankDetails?.accountLast4Digits || '',
                                                                    // accountNumber: banksAccounts?.accountNo || '',
                                                                }}
                                                                enableReinitialize
                                                            >
                                                                {({ values, errors, touched, setFieldValue }) => (
                                                                    <form>

                                                                        <div>
                                                                            <div>
                                                                                <label>{accountNo}</label>

                                                                                <FormGroup style={{ flexGrow: '1' }}>
                                                                                    <CustomTextInputFormik
                                                                                        name="userName"
                                                                                        disabled={true}
                                                                                        placeholder={accountNo}
                                                                                    />
                                                                                </FormGroup>
                                                                            </div>

                                                                            <div>
                                                                                <label htmlFor="basic-url">Account last 4 digits</label>

                                                                                <FormGroup style={{ flexGrow: '1' }}>
                                                                                    <MaskedInput
                                                                                        mask={mask}
                                                                                        isValid={touched['sortCode'] && !errors['sortCode']}
                                                                                        isInvalid={touched['sortCode'] && errors['sortCode']}
                                                                                        className="form-control"
                                                                                        disabled={true}
                                                                                        placeholder="xx-xx-xx"
                                                                                        value={
                                                                                            conformToMask(values.sortCode, mask)?.conformedValue
                                                                                        }
                                                                                        onChange={e => {
                                                                                            setFieldValue('sortCode', e.target?.value);
                                                                                        }}
                                                                                        render={(ref, props) => (
                                                                                            <Form.Control ref={ref} {...props} />
                                                                                        )}
                                                                                    />
                                                                                    <ErrorMessage name={'sortCode'} render={FormErrorMessage} />
                                                                                </FormGroup>
                                                                            </div>
                                                                        </div>

                                                                    </form>
                                                                )}
                                                            </Formik>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </div>
                                    ) :
                                        <EmptyComponent height={150} message="No Charity Bank Account Found." />
                                )}
                            </Accordion.Collapse>
                        </div>
                    ) : (
                            ''
                        )}
                </Accordion>
            }
        </Card>
    );
};

export default memo(CharityBankDetailForm);
