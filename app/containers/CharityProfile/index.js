/**
 *
 * CharityProfileIcon
 *
 */

import React from 'react';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Button, Card, Col, FormGroup, Row, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Heading } from '../MyProfile/myProfile';
import CustomTextInputFormik from '../../components/inputs/CustomTextInputFormik';
import BootstrapInput from '../../components/inputs/BootstrapInput';
import Layout from '../../components/Layout';
import './charity-profile.scss';
import DropZone from '../../components/DropZone';
import { updateCharity } from '../../utils/crud/charity.crud';
import { charityActions } from '../../utils/action-creators/charity.action.creator';
import DocumentIcon from '../../components/svg-icons/DocumentIcon';
import { isCharityProfileInComplete } from '../../utils/helper';
export function CharityProfile({ updateMyCharityProfile }) {
  const { myCharityProfile } = useSelector(
    ({ charity }) => ({
      myCharityProfile: charity.myCharityProfile,
    }),
    shallowEqual,
  );
  const [loading, setLoading] = React.useState(false);
  const [userPhotoId, setUserPhotoId] = React.useState([]);
  const [constitutionDoc, setConstitutionDoc] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const showAlert = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };
  const isProfileCompleted = !isCharityProfileInComplete(myCharityProfile);
  const handleSubmit = async values => {
    if (!isCharityProfileInComplete(myCharityProfile)) return;
    let base64UserPhotoId = '';
    let base64ConstitutionDoc = '';
    if (userPhotoId.length > 0) {
      base64UserPhotoId = await getBase64(userPhotoId[0]);
    }
    if (constitutionDoc.length > 0) {
      base64ConstitutionDoc = await getBase64(constitutionDoc[0]);
    }
    const userDetails = {
      firstName: values.userFirstName || null,
      lastName: values.userLastName || null,
      phoneNumber: values.userPhoneNumber || null,
      email: values.userEmail || null,
    };
    const trusteeDetails = {
      firstName: values.trusteeFirstName || null,
      lastName: values.trusteeLastName || null,
      phoneNumber: values.trusteePhoneNumber || null,
      email: values.trusteeEmail || null,
    };

    const data = {
      name: values.charityName || '',
      regNo: values.regNo ? values.regNo.toString() : '',
      position: values.position || '',
      userDetails: JSON.stringify(userDetails) || '',
      trusteeDetails: JSON.stringify(trusteeDetails) || '',
      charityWeb: values.charityWeb || '',
      constitutionDoc: base64ConstitutionDoc || values.constitutionDoc || '',
      userPhotoId: base64UserPhotoId || values.userPhotoId || '',
    };
    setLoading(true);
    updateCharity(data, myCharityProfile.id)
      .then(res => {
        setLoading(false);

        if (res.status === 200) {
          showAlert('success', res.data.response.message);
          updateMyCharityProfile(data);
          console.log(res.data);
        } else {
          showAlert('error', res.data.response.message);
        }
      })
      .catch(error => {
        setLoading(false);
        if (error?.response?.status === 413) {
          showAlert('error', 'Document(s) size is too large!');
        } else {
          showAlert('error', 'Could not Update Charity!');
        }
      });
  };
  const validate = (
    values,
    props /* only available when using withFormik */,
  ) => {
    const errors = {};
    if (values.charityWeb && !isUrl(values.charityWeb)) {
      errors.charityWeb = 'Invalid!';
    }
    if (
      values.userEmail &&
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.userEmail,
      )
    ) {
      errors.userEmail = 'Invalid Email!';
    }
    if (
      values.position === 'trustee' &&
      values.trusteeEmail &&
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.trusteeEmail,
      )
    ) {
      errors.trusteeEmail = 'Invalid Email!';
    }
    return errors;
  };
  const getUserDetails = () => {
    let details = {};
    if (myCharityProfile.userDetails) {
      details = JSON.parse(myCharityProfile.userDetails);
    }
    return details;
  };
  const getTrusteeDetails = () => {
    let details = {};
    if (myCharityProfile.trusteeDetails) {
      details = JSON.parse(myCharityProfile.trusteeDetails);
    }
    return details;
  };
  const isUrl = text =>
    text.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gm,
    ) ||
    text.match(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gm,
    );

  const getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  return (
    <Layout>
      <Helmet>
        <title>CharityProfileIcon</title>
        <meta name="description" content="Description of CharityProfileIcon" />
      </Helmet>
      <Card className="dataCard shadow mb-5 bg-white">
        <Card.Header style={{ background: 'transparent' }}>
          <Card.Title className="campaignHeader">
            <span style={{ marginTop: '8px' }}>Charity Profile</span>
          </Card.Title>
        </Card.Header>

        <Card.Body
          style={{
            padding: '1.25rem 20px 1.25rem 20px',
          }}
        >
          <Formik
            initialValues={{
              charityName: myCharityProfile.name || '',
              regNo: myCharityProfile.regNo || '',
              charityWeb: myCharityProfile.charityWeb || '',
              position: myCharityProfile.position || '',
              userFirstName: getUserDetails()?.firstName || '',
              userLastName: getUserDetails()?.lastName || '',
              userEmail: getUserDetails()?.email || '',
              userPhoneNumber: getUserDetails()?.phoneNumber || '',
              trusteeFirstName: getTrusteeDetails()?.firstName || '',
              trusteeLastName: getTrusteeDetails()?.lastName || '',
              trusteeEmail: getTrusteeDetails()?.email || '',
              trusteePhoneNumber: getTrusteeDetails()?.phoneNumber || '',
              userPhotoId: myCharityProfile.userPhotoId,
              constitutionDoc: myCharityProfile.constitutionDoc,
            }}
            enableReinitialize
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values, handleSubmit, errors, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                {console.log('values', values)}
                <Heading>Basic Info</Heading>
                <Row>
                  <Col md={6}>
                    <label htmlFor="charityName">Charity Name</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="charityName"
                        placeholder="Charity Name"
                        disabled={isProfileCompleted}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="regNo">Registration Number</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="regNo"
                        placeholder="Registration Number"
                        disabled={isProfileCompleted}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label htmlFor="position">Position</label>
                    <FormGroup className="mb-3">
                      <Select
                        fullWidth
                        className="selectClass"
                        value={values.position}
                        disabled={isProfileCompleted}
                        onChange={event =>
                          setFieldValue('position', event.target.value)
                        }
                        input={<BootstrapInput />}
                      >
                        <MenuItem value="trustee">Trustee</MenuItem>
                        <MenuItem value="employee">Employee</MenuItem>
                      </Select>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="charityWeb">Website</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="charityWeb"
                        placeholder="Website"
                        disabled={isProfileCompleted}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Heading>User Contact Info</Heading>
                <Row>
                  <Col md={6}>
                    <label htmlFor="userFirstName">First Name</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="userFirstName"
                        placeholder="First Name"
                        disabled={isProfileCompleted}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="userLastName">Last Name</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="userLastName"
                        placeholder="Last Name"
                        disabled={isProfileCompleted}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="userEmail">Email</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="userEmail"
                        placeholder="Email"
                        type="email"
                        disabled={isProfileCompleted}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <label htmlFor="userPhoneNumber">Phone Number</label>
                    <FormGroup className="mb-3">
                      <CustomTextInputFormik
                        name="userPhoneNumber"
                        placeholder="Phone Number"
                        disabled={isProfileCompleted}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {values.position === 'trustee' && (
                  <>
                    <Heading>Trustee Contact Info</Heading>
                    <Row>
                      <Col md={6}>
                        <label htmlFor="trusteeFirstName">First Name</label>
                        <FormGroup className="mb-3">
                          <CustomTextInputFormik
                            name="trusteeFirstName"
                            placeholder="First Name"
                            disabled={isProfileCompleted}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <label htmlFor="trusteeLastName">Last Name</label>
                        <FormGroup className="mb-3">
                          <CustomTextInputFormik
                            name="trusteeLastName"
                            placeholder="Last Name"
                            disabled={isProfileCompleted}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <label htmlFor="trusteeEmail">Email</label>
                        <FormGroup className="mb-3">
                          <CustomTextInputFormik
                            name="trusteeEmail"
                            placeholder="Email"
                            type="email"
                            disabled={isProfileCompleted}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <label htmlFor="trusteePhoneNumber">Phone Number</label>
                        <FormGroup className="mb-3">
                          <CustomTextInputFormik
                            name="trusteePhoneNumber"
                            placeholder="Phone Number"
                            disabled={isProfileCompleted}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </>
                )}
                <Row>
                  <Col md={6}>
                    <Heading>User Photo</Heading>
                    <div style={{ position: 'relative' }} className="mt-3">
                      {values.userPhotoId ? (
                        <div className="base64ImageHandling">
                          <img className="base64Img" src={values.userPhotoId} />
                          <button
                            className="btn btn-icon btn-sm"
                            disabled={isProfileCompleted}
                            onClick={() => setFieldValue('userPhotoId', null)}
                          >
                            <svg
                              version="1.1"
                              className="closeIcon"
                              id="Capa_1"
                              x="0px"
                              y="0px"
                              viewBox="0 0 496 496"
                            >
                              <g>
                                <g>
                                  <g>
                                    <path d="M248,0C111.033,0,0,111.033,0,248s111.033,248,248,248s248-111.033,248-248C495.841,111.099,384.901,0.159,248,0z M248,480C119.87,480,16,376.13,16,248S119.87,16,248,16s232,103.87,232,232C479.859,376.072,376.072,479.859,248,480z" />
                                    <path d="M361.136,134.864c-3.124-3.123-8.188-3.123-11.312,0L248,236.688L146.176,134.864c-3.069-3.178-8.134-3.266-11.312-0.197c-3.178,3.069-3.266,8.134-0.197,11.312c0.064,0.067,0.13,0.132,0.197,0.197L236.688,248L134.864,349.824c-3.178,3.07-3.266,8.134-0.196,11.312c3.07,3.178,8.134,3.266,11.312,0.196c0.067-0.064,0.132-0.13,0.196-0.196L248,259.312l101.824,101.824c3.178,3.07,8.242,2.982,11.312-0.196c2.995-3.1,2.995-8.016,0-11.116L259.312,248l101.824-101.824C364.259,143.052,364.259,137.988,361.136,134.864z" />
                                  </g>
                                </g>
                              </g>
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <DropZone
                          selectedFiles={userPhotoId}
                          setSelectedFiles={setUserPhotoId}
                          accept={['image/jpeg', 'image/jpg', 'image/png']}
                        />
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <Heading>Constitution Document</Heading>
                    <div style={{ position: 'relative' }} className="mt-3">
                      {values.constitutionDoc ? (
                        <div className="base64ImageHandling">
                          <div style={{ color: '#c1c0c0', width: 50 }}>
                            <DocumentIcon />
                          </div>
                          <button
                            className="btn btn-icon btn-sm"
                            disabled={isProfileCompleted}
                            onClick={() =>
                              setFieldValue('constitutionDoc', null)
                            }
                          >
                            <svg
                              version="1.1"
                              className="closeIcon"
                              id="Capa_1"
                              x="0px"
                              y="0px"
                              viewBox="0 0 496 496"
                            >
                              <g>
                                <g>
                                  <g>
                                    <path d="M248,0C111.033,0,0,111.033,0,248s111.033,248,248,248s248-111.033,248-248C495.841,111.099,384.901,0.159,248,0z M248,480C119.87,480,16,376.13,16,248S119.87,16,248,16s232,103.87,232,232C479.859,376.072,376.072,479.859,248,480z" />
                                    <path d="M361.136,134.864c-3.124-3.123-8.188-3.123-11.312,0L248,236.688L146.176,134.864c-3.069-3.178-8.134-3.266-11.312-0.197c-3.178,3.069-3.266,8.134-0.197,11.312c0.064,0.067,0.13,0.132,0.197,0.197L236.688,248L134.864,349.824c-3.178,3.07-3.266,8.134-0.196,11.312c3.07,3.178,8.134,3.266,11.312,0.196c0.067-0.064,0.132-0.13,0.196-0.196L248,259.312l101.824,101.824c3.178,3.07,8.242,2.982,11.312-0.196c2.995-3.1,2.995-8.016,0-11.116L259.312,248l101.824-101.824C364.259,143.052,364.259,137.988,361.136,134.864z" />
                                  </g>
                                </g>
                              </g>
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <DropZone
                          selectedFiles={constitutionDoc}
                          setSelectedFiles={setConstitutionDoc}
                          accept={[
                            'application/msword',
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            'application/pdf',
                          ]}
                          label="Choose a document from your computer."
                          isDocument
                        />
                      )}
                    </div>
                  </Col>
                </Row>
                <div className="text-right mt-4">
                  <Button
                    type="submit"
                    disabled={isProfileCompleted}
                    className="updateCharityBtn"
                  >
                    {!loading && <div>Save</div>}
                    {loading && <Spinner animation="border" size="sm" />}
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Layout>
  );
}

const withConnect = connect(
  null,
  charityActions,
);

export default compose(withConnect)(CharityProfile);
