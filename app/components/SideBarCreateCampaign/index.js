import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Row, Col, ListGroup, Container,
} from 'react-bootstrap/';
import './sideCampaign.scss';
import { Formik } from 'formik';
import { shallowEqual, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Form1 from '../Forms/Form1/index';
import Form2 from '../Forms/Form2/index';
import Form3 from '../Forms/Form3/index';
import Form4 from '../Forms/Form4/index';
import { createCampaign, updateCampaign } from '../../utils/crud/campain.crud';

const SideBarCreateCampaign = (editCampaignData) => {
  const [activeLink, setActiveLink] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [campaignId, setCampaignId] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { myCharityProfile, user } = useSelector(
    ({ charity, auth }) => ({
      myCharityProfile: charity.myCharityProfile,
      user: auth.user,
    }),
    shallowEqual,
  );
  const getBase64 = (base64, file) => new Promise((resolve, reject) => {
    if (base64) {
      resolve(base64);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }
  });
  const showAlert = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };
  const onSubmit = async (values) => {
    setLoading(true);
    if (activeLink === 1) {
      let titleImage = '';
      if (
        selectedFiles[0] !== undefined
        || (values.base64 && values.base64 !== '')
      ) {
        titleImage = await getBase64(values.base64 || false, selectedFiles[0]);
        values.base64 = titleImage
      }

      const data = {
        zakatEligible: values.zakatEligible,
        description: values.editorValue,
        titleImage,
        video: values.video,
      };
      updateCampaign(data, editCampaignData?.editCampaignData?.id || campaignId)
        .then(() => {
          setLoading(false);
          setActiveLink(2);
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 413) {
            showAlert('error', 'Image size is too large!');
          } else {
            showAlert('error', 'Something Went Wrong!, try again!');
          }
        });
    } else if (activeLink === 2) {
      setLoading(false);
      setActiveLink(3);
    } else if (activeLink === 3) {
      setLoading(false);
    } else {
      const address = {
        line1: values.line1,
        line2: values.line2,
        city: values.city,
        state: values.state,
        country: values.country,
      };
      const newData = {
        title: values.campaignTitle,
        amount: JSON.parse(values.amount),
        address: JSON.stringify(address),
        endDate: values.date,
        categoryId: values.categories,
        parentCampaignId: values.parentCampaign ? values.parentCampaign.id : null,
        charityId:
          user.isCharity && values.fundraiser === 'charity'
            ? myCharityProfile.id
            : undefined,
        amountSymbolId: values.currencySymbol,
      };
      const editData = editCampaignData?.editCampaignData
        ? {
          titleImage: values.base64 || '',
        }
        : {};
      const call = editCampaignData.editCampaignData
        ? updateCampaign
        : createCampaign;
      call(
        { ...newData, ...editData },
        editCampaignData?.editCampaignData?.id || campaignId,
      )
        .then(({ data }) => {
          setLoading(false);
          setCampaignId(data?.response?.data?.id || '');
          setActiveLink(prevState => prevState + 1);
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 413) {
            showAlert('error', 'Image size is too large!');
          } else {
            showAlert('error', 'Something Went Wrong!, try again!');
          }
        });
    }
  };

  const validate = (
    values,
  ) => {
    const errors = {};
    if (activeLink === 0) {
      if (!values.amount) {
        errors.amount = 'Required';
      } else if (values.amount < 5) {
        errors.amount = 'Minimum will be 5 pound.';
      } else if (!values.campaignTitle) {
        errors.campaignTitle = 'Required';
      } else if (values.campaignTitle.length < 3) {
        errors.campaignTitle = 'Campaign title must be more then three letter.';
      } else if (!values.date) {
        errors.date = 'Select date';
      } else if (!values.categories) {
        errors.categories = 'Required';
      }
    }
    // if (activeLink === 1) {
    // if (!values.editorValue) {
    //   errors.editorValue = 'Required';
    // } else if (values.editorValue < 5) {
    //   errors.editorValue = 'Enter Description';
    // }
    // }
    // if (!values.email) {
    //   errors.email = 'Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = 'Invalid email address';
    // }

    // ...

    return errors;
  };

  const address = editCampaignData?.editCampaignData?.address
    && editCampaignData.editCampaignData.address !== ''
    ? JSON.parse(editCampaignData.editCampaignData.address)
    : {};
  return (
    <div>
      <Container
        className="mt-n5"
        style={
          activeLink === 1 ? { minHeight: '900px' } : { minHeight: '700px' }
        }
      >
        <Row className="main">
          <div className="main-box shadow">
            <Col md={3} sm={12} className="firstCol p-0">
              <ListGroup
                variant="flush"
                className="d-flex flex-row flex-md-column listGroupDiv"
              >
                <ListGroup.Item
                  className="listItem"
                  onClick={() => editCampaignData.editCampaignData ? setActiveLink(0) : null
                  }
                >
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
                  onClick={() => editCampaignData.editCampaignData ? setActiveLink(1) : null
                  }
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
                    if (editCampaignData.editCampaignData) {
                      setActiveLink(2);
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
                  onClick={() => editCampaignData.editCampaignData ? setActiveLink(3) : null
                  }
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
                      Campaign Status
                      {' '}
                    </span>
                  </div>
                </ListGroup.Item>
                {/* <div className='line'></div> */}
              </ListGroup>
            </Col>
            <Col md={9} sm={12} className="formsMain">
              <Formik
                initialValues={{
                  currencySymbol:
                    editCampaignData?.editCampaignData?.amountSymbolId?.id || 1,
                  fundraiser: editCampaignData?.editCampaignData?.charityId
                    ? 'charity'
                    : 'individual',
                  date: editCampaignData?.editCampaignData?.endDate || null,
                  campaignTitle:
                    editCampaignData?.editCampaignData?.title || '',
                  address: editCampaignData?.editCampaignData?.address || '',
                  categories:
                    editCampaignData?.editCampaignData?.categoryId?.id || '',
                  parentCampaign:
                    editCampaignData?.editCampaignData?.isParent ? ''
                      : editCampaignData?.editCampaignData?.parentCampaignId,
                  amount: editCampaignData?.editCampaignData?.amount || null,
                  editorValue: editCampaignData?.editCampaignData?.description
                    ? editCampaignData.editCampaignData.description
                    : '',
                  zakatEligible:
                    editCampaignData?.editCampaignData?.zakatEligible || false,
                  base64: editCampaignData?.editCampaignData?.titleImage || '',
                  video: editCampaignData?.editCampaignData?.video || '',
                  line1: address?.line1 || '',
                  line2: address?.line2 || '',
                  city: address?.city || '',
                  state: address?.state || '',
                  country: address?.country || '',
                }}
                enableReinitialize
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={onSubmit}
              >
                {({
                  values, setFieldValue, errors, handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                      {activeLink === 0 && (
                        <Form1
                          setActiveLink={setActiveLink}
                          setFieldValue={setFieldValue}
                          values={values}
                          errors={errors}
                          loading={loading}
                          edit={editCampaignData?.editCampaignData}
                        />
                      )}
                      {activeLink === 1 && (
                        <Form2
                          setActiveLink={setActiveLink}
                          setFieldValue={setFieldValue}
                          values={values}
                          errors={errors}
                          selectedFiles={selectedFiles}
                          setSelectedFiles={setSelectedFiles}
                          loading={loading}
                          campaignId={campaignId}
                        />
                      )}
                      {activeLink === 2 && (
                        <Form3
                          setActiveLink={setActiveLink}
                          id={
                            editCampaignData.editCampaignData
                              ? editCampaignData.editCampaignData.id
                              : campaignId
                          }
                        />
                      )}
                      {activeLink === 3 && (
                        <Form4
                          setActiveLink={setActiveLink}
                          id={
                            editCampaignData.editCampaignData
                              ? editCampaignData.editCampaignData.id
                              : campaignId
                          }
                          statusId={
                            editCampaignData.editCampaignData
                              ? editCampaignData.editCampaignData.statusId?.id
                              : ''
                          }
                          values={values}
                        />
                      )}
                    </form>
                  )}
              </Formik>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
};

SideBarCreateCampaign.propTypes = {};

export default memo(SideBarCreateCampaign);
