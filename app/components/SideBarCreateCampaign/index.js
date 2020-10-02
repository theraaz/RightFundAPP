import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Row, Col, ListGroup, Container } from 'react-bootstrap/';
import './sideCampaign.scss';
import { Formik } from 'formik';
import Form1 from '../Forms/Form1/Loadable';
import Form2 from '../Forms/Form2/Loadable';
import Form3 from '../Forms/Form3/Loadable';
import Form4 from '../Forms/Form4/index';

const SideBarCreateCampaign = (editCampaignData) => {
  const [activeLink, setActiveLink] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [campaignId, setCampaignId] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(editCampaignData.editCampaignData);

  const getBase64 = (base64, file, cb) => {
    if (base64) {
      cb(base64);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }

  };

  function handleSubmit(event) {
    console.log(event)
    const token = localStorage.getItem('token');
    setLoading(true);
    if (activeLink === 1) {

      getBase64(event.base64 ? event.base64 : false, selectedFiles[0], result => {
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
          body: JSON.stringify({
            zakatEligible: event.zakatEligible,
            description: event.editorValue,
            titleImage: result,
          }),
        };

        if (editCampaignData.editCampaignData != undefined) {
          fetch(`${process.env.baseURL}/campaign/${editCampaignData.editCampaignData.id}`, requestOptions)
            .then(response => response.json())
            .then(res => {
              setLoading(false);
              console.log(res)
              setActiveLink(2);
            })
            .catch(error => {
              console.log(error);
            });
        }
        else {
          fetch(`${process.env.baseURL}/campaign/${campaignId}`, requestOptions)
            .then(response => response.json())
            .then(() => {
              setLoading(false);
              setActiveLink(2);
            })
            .catch(error => {
              console.log(error);
            });
        }

      });
    } else if (activeLink === 2) {
      setLoading(false);
      setActiveLink(3);
    } else if (activeLink === 3) {
      setLoading(false);
      // setActiveLink(3)
      console.log('reached');
    } else {
      let address = {
        line1: event.line1,
        line2: event.line2,
        city: event.city,
        state: event.state,
        country: event.country,
      }
      if (editCampaignData.editCampaignData != undefined) {
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
          body: JSON.stringify({
            title: event.campaignTitle,
            amount: event.amount,
            address: JSON.stringify(address),
            endDate: event.date,
            categoryId: event.categories,
            amountSymbolId: event.currencySymbol,
          }),
        };
        console.log(editCampaignData.editCampaignData)

        fetch(`${process.env.baseURL}/campaign/${editCampaignData.editCampaignData.id}`, requestOptions)
          .then(response => response.json())
          .then(res => {
            setLoading(false);
            // setCampaignId(res.response.data.id);
            console.log(res);
            setActiveLink(1);
          })
          .catch(error => {
            console.log(error);
          });



      } else {

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
          body: JSON.stringify({
            title: event.campaignTitle,
            amount: event.amount,
            address: JSON.stringify(address),
            endDate: event.date,
            categoryId: event.categories,
            amountSymbolId: event.currencySymbol,
          }),
        };

        fetch(`${process.env.baseURL}/campaign`, requestOptions)
          .then(response => response.json())
          .then(res => {
            setLoading(false);
            setCampaignId(res.response.data.id);
            console.log(res);
            setActiveLink(1);
          })
          .catch(error => {
            console.log(error);
          });
      }

    }
    console.log(event);
  }

  const validate = (
    values,
    props /* only available when using withFormik */,
  ) => {
    console.log(values);
    const errors = {};
    if (activeLink === 0) {
      if (!values.amount) {
        errors.amount = 'Required';
      } else if (values.amount < 5) {
        errors.amount = 'Enter amount';
      } else if (!values.campaignTitle) {
        errors.campaignTitle = 'Required';
      } else if (values.campaignTitle.length < 3) {
        errors.campaignTitle = 'Enter campaign title';
      }
      // else if (!values.address) {
      //   errors.address = 'Required';
      // } else if (values.address.length < 3) {
      //   errors.address = 'Enter address';
      // }
      else if (!values.date) {
        errors.date = 'Enter date';
      } else if (!values.categories) {
        errors.categories = 'Required';
      } else if (values.categories.length < 3) {
        errors.categories = 'Select Categories';
      }
    }
    if (activeLink === 1) {
      if (!values.editorValue) {
        errors.editorValue = 'Required';
      } else if (values.editorValue < 5) {
        errors.editorValue = 'Enter Description';
      }
    }
    // if (!values.email) {
    //   errors.email = 'Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = 'Invalid email address';
    // }

    // ...

    return errors;
  };

  return (
    <div>
      <Container className="mt-n5" style={activeLink === 1 ? { minHeight: '900px' } : { minHeight: '700px' }}>
        <Row className="main">
          <div className="main-box shadow">
            <Col md={3} sm={12} className="firstCol p-0">
              <ListGroup
                variant="flush"
                className="d-flex flex-row flex-md-column listGroupDiv"
              >
                <ListGroup.Item
                  className="listItem"
                  onClick={() => editCampaignData.editCampaignData ? setActiveLink(0) : null}
                >
                  {console.log(activeLink)}
                  <div
                    className={`text-decoration-none d-flex iconMainDiv ${activeLink === 0 ? '' : ''
                      }`}
                  >
                    <div
                      className={`${activeLink === 0 ? 'iconImageActive' : 'iconImage'
                        }`}
                    >
                      <span
                        className={`${activeLink === 0 ? 'tagNumberActive' : 'tagNumber'
                          }`}
                      >
                        {' '}
                        01
                      </span>
                    </div>

                    <span
                      className={`${activeLink === 0
                        ? 'sidebartitleListActive'
                        : 'sidebartitleList'
                        }`}
                    >
                      Campaign Information
                    </span>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item
                  className="listItem"
                  onClick={() => editCampaignData.editCampaignData ? setActiveLink(1) : null}
                >
                  <div
                    className={`text-decoration-none d-flex iconMainDiv ${activeLink === 1 ? '' : ''
                      }`}
                  >
                    <div
                      className={`${activeLink === 1 ? 'iconImageActive' : 'iconImage'
                        }`}
                    >
                      <span
                        className={`${activeLink === 1 ? 'tagNumberActive' : 'tagNumber'
                          }`}
                      >
                        02
                      </span>
                    </div>
                    <span
                      className={`${activeLink === 1
                        ? 'sidebartitleListActive'
                        : 'sidebartitleList'
                        }`}
                    >
                      Tell your story
                    </span>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item
                  className="listItem"
                  onClick={() => {
                    console.log(editCampaignData)
                    if (editCampaignData.editCampaignData) {
                      setActiveLink(2)
                    }
                  }}
                >
                  <div
                    className={`text-decoration-none d-flex iconMainDiv ${activeLink === 2 ? '' : ''
                      }`}
                  >
                    <div
                      className={`${activeLink === 2 ? 'iconImageActive' : 'iconImage'
                        }`}
                    >
                      <span
                        className={`${activeLink === 2 ? 'tagNumberActive' : 'tagNumber'
                          }`}
                      >
                        03
                      </span>
                    </div>
                    <span
                      className={`${activeLink === 2
                        ? 'sidebartitleListActive'
                        : 'sidebartitleList'
                        }`}
                    >
                      Campaign Packages
                    </span>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item
                  className="listItem"
                  onClick={() => editCampaignData.editCampaignData ? setActiveLink(3) : null}
                >
                  <div
                    className={`text-decoration-none d-flex iconMainDiv ${activeLink === 3 ? '' : ''
                      }`}
                  >
                    <div
                      className={`${activeLink === 3 ? 'iconImageActive' : 'iconImage'
                        }`}
                    >
                      <span
                        className={`${activeLink === 3 ? 'tagNumberActive' : 'tagNumber'
                          }`}
                      >
                        04
                      </span>
                    </div>
                    <span
                      className={`${activeLink === 3
                        ? 'sidebartitleListActive'
                        : 'sidebartitleList'
                        }`}
                    >
                      Campaign Status{' '}
                    </span>
                  </div>
                </ListGroup.Item>
                {/* <div className='line'></div> */}
              </ListGroup>
            </Col>
            <Col md={9} sm={12} className="formsMain">
              <Formik
                initialValues={editCampaignData.editCampaignData ? {
                  currencySymbol: editCampaignData.editCampaignData.amountSymbolId.id,
                  fundraiser: '',
                  date: editCampaignData.editCampaignData.endDate,
                  campaignTitle: editCampaignData.editCampaignData.title,
                  // address: editCampaignData.editCampaignData.address,
                  categories: editCampaignData.editCampaignData.categoryId.id,
                  amount: editCampaignData.editCampaignData.amount,
                  editorValue: editCampaignData.editCampaignData.description ? editCampaignData.editCampaignData.description : "",
                  zakatEligible: editCampaignData.editCampaignData.zakatEligible,
                  base64: editCampaignData.editCampaignData.titleImage,
                  line1: JSON.parse(editCampaignData.editCampaignData.address).line1,
                  line2: JSON.parse(editCampaignData.editCampaignData.address).line2,
                  city: JSON.parse(editCampaignData.editCampaignData.address).city,
                  state: JSON.parse(editCampaignData.editCampaignData.address).state,
                  country: JSON.parse(editCampaignData.editCampaignData.address).country,

                } : {
                    currencySymbol: 1,
                    fundraiser: '',
                    date: null,
                    campaignTitle: '',
                    // address: '',
                    categories: '',
                    amount: null,
                    editorValue: '',
                    zakatEligible: false,
                    image: [],
                  }}
                enableReinitialize
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={handleSubmit}
              >
                {props => (
                  <form onSubmit={props.handleSubmit}>
                    {activeLink === 0 && (
                      <Form1
                        setActiveLink={setActiveLink}
                        setFieldValue={props.setFieldValue}
                        values={props.values}
                        errors={props.errors}
                        loading={loading}
                      />
                    )}
                    {activeLink === 1 && (
                      <Form2
                        setActiveLink={setActiveLink}
                        setFieldValue={props.setFieldValue}
                        values={props.values}
                        errors={props.errors}
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                        loading={loading}

                      />
                    )}
                    {activeLink === 2 && (
                      <Form3 setActiveLink={setActiveLink} id={editCampaignData.editCampaignData ? editCampaignData.editCampaignData.id : campaignId} />
                    )}
                    {activeLink === 3 && (
                      <Form4 setActiveLink={setActiveLink} />
                    )}
                  </form>
                )}
              </Formik>

            </Col>
          </div>
        </Row>
      </Container>
    </div >
  );
};

SideBarCreateCampaign.propTypes = {};

export default memo(SideBarCreateCampaign);
