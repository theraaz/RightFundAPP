
import React, { memo, useState, useRef } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Row, Col, ListGroup, Dropdown, Button, Container, ProgressBar } from 'react-bootstrap/'
import './sideCampaign.scss';
import Form1 from '../Forms/Form1/Loadable';
import Form2 from '../Forms/Form2/Loadable';
import Form3 from '../Forms/Form3/Loadable';
import Form4 from '../Forms/Form4/index';
import { Formik } from 'formik';
// const [selectedFiles, setSelectedFiles] = useState([]);


const SideBarCreateCampaign = ({ children }) => {
  const [activeLink, setActiveLink] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [campaignId, setCampaignId] = useState('');
  // const [imageBase64, setImageBase64] = useState('');


  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  function handleSubmit(event) {
    const token = localStorage.getItem('token')
    console.log(selectedFiles[0]);

    if (activeLink == 1) {
      // getBase64()
      getBase64(selectedFiles[0], (result) => {
        // console.log(result)
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'authorization': token
          },
          body: JSON.stringify({ zakatEligible: event.zakatEligible, description: event.editorValue, titleImage: result })

        };

        setActiveLink(2)
        fetch(`${process.env.baseURL}/compaign/${campaignId}`, requestOptions).then(response => response.json())
          .then(res => {

            console.log(res)

          }).catch(error => {
            console.log(error)
          });


      });


    }
    else if (activeLink == 2) {
      setActiveLink(3)
    }
    else if (activeLink == 3) {
      // setActiveLink(3)
      console.log('reached')
    }
    else {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify({ title: event.campaignTitle, amount: event.amount, address: event.address, endDate: event.date, categoryId: event.categories, amountSymbolId: event.currencySymbol })

      };

      console.log(event.amount.length)
      fetch(`${process.env.baseURL}/compaign`, requestOptions).then(response => response.json())
        .then(res => {
          setCampaignId(res.response.data.id);
          console.log(res)
          setActiveLink(1)

        }).catch(error => {
          console.log(error)
        });
    }
    console.log(event);
  }



  const validate = (values, props /* only available when using withFormik */) => {
    console.log(values)
    const errors = {};
    if (activeLink === 0) {

      if (!values.amount) {
        errors.amount = 'Required';
      } else if (values.amount < 5) {
        errors.amount = 'Enter amount';
      }

      else if (!values.campaignTitle) {
        errors.campaignTitle = 'Required';
      } else if (values.campaignTitle.length < 3) {
        errors.campaignTitle = 'Enter campaign title';
      }

      else if (!values.address) {
        errors.address = 'Required';
      } else if (values.address.length < 3) {
        errors.address = 'Enter address';
      }

      else if (!values.date) {
        errors.date = 'Enter date';
      }

      else if (!values.categories) {
        errors.categories = 'Required';
      }
      else if (values.categories.length < 3) {
        errors.categories = 'Select Categories';
      }


    }
    if (activeLink == 1) {
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

    //...

    return errors;
  };

  return (
    <div>
      <Container className="mt-n5">
        <Row className='main'>
          <div className="main-box">
            <Col md={3} className='firstCol'>
              <ListGroup variant="flush" className='d-flex flex-row flex-sm-column' style={{ marginTop: '15px' }}>

                <ListGroup.Item className='listItem'
                //  onClick={() => setActiveLink(0)}
                >
                  {console.log(activeLink)}
                  <div className={`text-decoration-none listItem ${activeLink === 0 ? '' : ''}`} >
                    <div className='iconImage'>
                      <span className={`${activeLink === 0 ? 'tagNumberActive' : 'tagNumber'}`} > 01</span>
                    </div>

                    <span>Campaign Information</span>
                  </div>
                </ListGroup.Item>

                {/* <div className='line'></div> */}
                <ListGroup.Item className='listItem'
                // onClick={() => setActiveLink(1)}
                >

                  <div className={`text-decoration-none listItem ${activeLink === 1 ? '' : ''}`}>
                    <div className='iconImage'>
                      <span className={`${activeLink === 1 ? 'tagNumberActive' : 'tagNumber'}`}>02</span>
                    </div>
                    Tell your story
                    </div>


                </ListGroup.Item>
                {/* <div className='line'></div> */}

                <ListGroup.Item className='listItem'
                // onClick={() => setActiveLink(2)}
                >
                  <div className={`text-decoration-none listItem ${activeLink === 2 ? '' : ''}`}>
                    <div className='iconImage'>
                      <span className={`${activeLink === 2 ? 'tagNumberActive' : 'tagNumber'}`}>03</span>
                    </div>


    Campaign Packages
</div>

                </ListGroup.Item>
                {/* <div className='line'></div> */}

                <ListGroup.Item className='listItem'
                //  onClick={() => setActiveLink(3)}
                >
                  <div className={`text-decoration-none listItem ${activeLink === 3 ? '' : ''}`}>
                    <div className='iconImage'>
                      <span className={`${activeLink === 3 ? 'tagNumberActive' : 'tagNumber'}`}>04</span>
                    </div>
                      Campaign Status
                      </div>


                </ListGroup.Item>
                {/* <div className='line'></div> */}


              </ListGroup>
            </Col>
            <Col md={9}>
              <Formik
                initialValues={{ currencySymbol: '', fundraiser: '', date: new Date(), campaignTitle: '', address: '', categories: '', amount: null, editorValue: '', zakatEligible: false, image: [] }}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={handleSubmit

                }
              >
                {props => (
                  <form onSubmit={props.handleSubmit}>
                    {activeLink === 0 && <Form1 setActiveLink={setActiveLink} setFieldValue={props.setFieldValue} values={props.values} errors={props.errors} />}
                    {activeLink === 1 && <Form2 setActiveLink={setActiveLink} setFieldValue={props.setFieldValue} values={props.values} errors={props.errors} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />}
                    {activeLink === 2 && <Form3 setActiveLink={setActiveLink} id={campaignId} />}
                    {activeLink === 3 && <Form4 setActiveLink={setActiveLink} />}
                  </form>
                )}
              </Formik>
            </Col>
          </div>

        </Row>
      </Container>
    </div >
  );
}

SideBarCreateCampaign.propTypes = {};

export default memo(SideBarCreateCampaign);
