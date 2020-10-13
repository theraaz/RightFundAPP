/**
 *
 * Layout
 *
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Row, Col, Card, Image, Spinner, Alert, Button } from 'react-bootstrap';

import MainTabs from '../MainTabs/Loadable';

import {
  Title,
  Description,
  Heading,
} from '../../containers/HomePage/dashboard-styles';
import '../../containers/HomePage/dashboard.scss';
import Header from '../Header/Loadable';
import Footer from '../Footer/Loadable';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { updateProfile } from '../../utils/crud/auth.crud';
import { authActions } from '../../utils/action-creators/auth.action.creator';
import { useSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import { isCharityProfileCompleted } from '../../utils/helper';

const profileImg = require('../../images/placeholder.png');

function Layout({ children, updateUser, ...props }) {
  const token = localStorage.getItem('token');

  const { user, myCharityProfile } = useSelector(
    ({ auth, charity }) => ({
      user: auth.user,
      myCharityProfile: charity.myCharityProfile,
    }),
    shallowEqual,
  );
  const [totalCampaign, setTotalCampaign] = React.useState(0);
  const [activeCampaign, setActiveCampaign] = React.useState(0);
  const [giftAid, setGiftAid] = React.useState(0);
  const [totalRaised, setTotalRaised] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const uploadedImage = React.useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, message) => {
    console.log(variant);
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };
  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;

      setLoading(true);
      reader.onload = e => {
        updateProfile({
          image: current.src,
        })
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              console.log(user);
              current.src = e.target.result;
              updateUser({
                image: current.src,
              });
              handleClickVariant(
                'success',
                'Profile Image Updated Successfully',
              );
            } else {
              handleClickVariant('error', res.data.response.message);
            }
          })
          .catch(error => {
            setLoading(false);
            handleClickVariant('error', 'Could not Update Profile Image');
          });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    // Account Details

    fetch(`${process.env.baseURL}/accountDetails`, requestOptions)
      .then(response => response.json())
      .then(user => {
        if (user.statusCode == 200) {
          setTotalCampaign(user.response.data.totalCampaigns);
          setActiveCampaign(user.response.data.totalLive);
          setGiftAid(user.response.data.giftAid);
          setTotalRaised(user.response.data.totalRaised);
        } else {
          // setMessage('Something went missing, Please try again');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const userAddress = user ? JSON.parse(user?.address) : '';
  return (
    <div>
      <Header
        title="Dashboard"
        firstName={user?.firstName}
        lastName={user?.lastName}
      />
      <div className="container mt-n5" style={{ minHeight: '700px' }}>
        <Row>
          <Col xs={12} sm={12} md={7}>
            <div className="card card-header-main  shadow bg-white rounded">
              <Row>
                <Col xs={12} sm={5} md={5}>
                  <div className="card-header card-img border-0">
                    <label htmlFor="myInputImage">
                      {/* <img className={s.img} alt="complex"  /> */}
                      <div className="editIconDiv">
                        <svg
                          className="editIcon"
                          version="1.1"
                          id="Capa_1"
                          width="20px"
                          height="20px"
                          viewBox="0 0 512 512"
                        >
                          <g>
                            <g>
                              <path d="M481.996,30.006C462.647,10.656,436.922,0,409.559,0c-27.363,0-53.089,10.656-72.438,30.005L50.826,316.301    c-2.436,2.436-4.201,5.46-5.125,8.779L0.733,486.637c-1.939,6.968,0.034,14.441,5.163,19.542c3.8,3.78,8.892,5.821,14.106,5.821    c1.822,0,3.66-0.25,5.463-0.762l161.557-45.891c6.816-1.936,12.1-7.335,13.888-14.192c1.788-6.857-0.186-14.148-5.189-19.167    L93.869,329.827L331.184,92.511l88.258,88.258L237.768,361.948c-7.821,7.8-7.838,20.463-0.038,28.284    c7.799,7.822,20.464,7.838,28.284,0.039l215.98-215.392C501.344,155.53,512,129.805,512,102.442    C512,75.079,501.344,49.354,481.996,30.006z M143.395,436.158L48.827,463.02l26.485-95.152L143.395,436.158z M453.73,146.575    l-5.965,5.949l-88.296-88.297l5.938-5.938C377.2,46.495,392.88,40,409.559,40c16.679,0,32.358,6.495,44.152,18.29    C465.505,70.083,472,85.763,472,102.442C472,119.121,465.505,134.801,453.73,146.575z" />
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
                      </div>
                    </label>
                    <input
                      id="myInputImage"
                      type="file"
                      accept="image/*"
                      hidden
                      multiple="false"
                      onChange={handleImageUpload}
                      onClick={event => {
                        event.target.value = null;
                      }}
                    />

                    <div className="sub-card-img position-relative">
                      {/* <input type="file" accept="image/*" hidden onChange={handleImageUpload} multiple="false" /> */}
                      {loading && (
                        <div
                          className="d-flex align-items-center justify-content-center position-absolute"
                          style={{
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(255,255,255,0.7)',
                            zIndex: 0,
                          }}
                        >
                          <Spinner
                            animation="border"
                            style={{ color: '#fafafa' }}
                          />
                        </div>
                      )}

                      <Image
                        ref={uploadedImage}
                        src={user?.image || profileImg}
                        alt=""
                      />
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={7} md={7} className="titleCol">
                  <div className="card-block card-data px-2">
                    <div className="card-title">
                      <Title>
                        {user?.firstName} {user?.lastName}
                      </Title>
                      <p className="card-text">{user?.phoneNumber}</p>
                      <p className="card-text">{user?.email}</p>
                    </div>
                    {userAddress && (
                      <p>
                        {userAddress.line1 !== ''
                          ? `${userAddress.line1}, `
                          : ''}
                        {userAddress.line2 !== ''
                          ? `${userAddress.line2}, `
                          : ''}
                        {userAddress.city !== '' ? `${userAddress.city}, ` : ''}
                        {userAddress.state !== ''
                          ? `${userAddress.state}, `
                          : ''}
                        {userAddress.country !== '' ? userAddress.country : ''}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} sm={12} md={5}>
            <Card className="card-header-main shadow  bg-white">
              <Card.Body className="complaints-data">
                <div className="compaignData">
                  <Row>
                    <Col className="table-col1 tableRight">
                      <Heading>{totalCampaign}</Heading>
                      <Description>Total Campaign Created</Description>
                    </Col>
                    <Col className="table-col1">
                      <Heading>{activeCampaign}</Heading>
                      <Description>Active Campaign</Description>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="table-col tableRight">
                      <Heading className="mt-4">{giftAid}</Heading>
                      <Description>Gift Aids</Description>
                    </Col>
                    <Col className="table-col">
                      <Heading className="mt-4">£ {totalRaised}</Heading>
                      <Description>Total Raised</Description>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row style={{ marginTop: 15, marginBottom: 15 }}>
          {isCharityProfileCompleted(myCharityProfile) && (
            <Col xs={12}>
              <Alert show={true} variant="warning" onClose={() => {}}>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Please Complete Your Charity Profile!</span>
                  <Button
                    onClick={() => props.history.push('/charity-profile')}
                    // variant="outline-warning"
                    className="btn btn-warning"
                    style={{ color: '#856404' }}
                  >
                    Complete Now!
                  </Button>
                </div>
              </Alert>
            </Col>
          )}

          <Col sm={12} md={3}>
            <Card className="shadow mb-5 bg-white sideNav dataCard">
              <MainTabs />
            </Card>
          </Col>
          <Col>{children}</Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

Layout.propTypes = {};

export default withRouter(
  connect(
    null,
    authActions,
  )(memo(Layout)),
);
