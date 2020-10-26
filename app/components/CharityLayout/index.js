/**
 *
 * CharityLayout
 *
 */

import React, { useEffect } from 'react';
import { Row, Col, Card, Image, Alert, Button } from 'react-bootstrap';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import MainTabs from '../MainTabs/Loadable';

import {
  Title,
  Description,
  Heading,
} from '../../containers/HomePage/dashboard-styles';
import '../../containers/HomePage/dashboard.scss';
import Header from '../Header/Loadable';
import Footer from '../Footer/Loadable';

import { authActions } from '../../utils/action-creators/auth.action.creator';

import { isCharityProfileInComplete } from '../../utils/helper';
import SessionExpired from '../SessionExpired';
import PencilIcon from '../svg-icons/PencilIcon';
import { charityActions } from '../../utils/action-creators/charity.action.creator';
import { updateCharity } from '../../utils/crud/charity.crud';
import ProfileLoadingOverlay from '../ProfileLoadingOverlay';
import { getCharityAccountDetails } from '../../utils/crud/auth.crud';

const profileImg = require('../../images/placeholder.png');

function CharityLayout({ children, updateMyCharityProfile, ...props }) {
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
        updateCharity(
          {
            image: e.target.result,
            userPhotoId: myCharityProfile.userPhotoId,
            constitutionDoc: myCharityProfile.userPhotoId,
          },
          myCharityProfile.id,
        )
          .then(res => {
            setLoading(false);
            if (res.status === 200) {
              current.src = e.target.result;
              updateMyCharityProfile({
                image: current.src,
              });
              handleClickVariant(
                'success',
                'Charity Image Updated Successfully',
              );
            } else {
              handleClickVariant('error', res.data.response.message);
            }
          })
          .catch(() => {
            setLoading(false);
            handleClickVariant('error', 'Could not Update Charity Image');
          });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getCharityAccountDetails(myCharityProfile.id)
      .then(({ data, status }) => {
        if (status === 200) {
          setTotalCampaign(data.response.data.totalCampaigns);
          setActiveCampaign(data.response.data.totalLive);
          setGiftAid(data.response.data.giftAid);
          setTotalRaised(data.response.data.totalRaised);
        } else {
          // setMessage('Something went missing, Please try again');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header
        title="Dashboard"
        firstName={user?.firstName}
        lastName={user?.lastName}
      />
      <div className="container mt-n5">
        <Row style={{ marginBottom: '30px' }}>
          <Col xs={12} sm={12} lg={7} xl={7}>
            <div className="card card-header-main  shadow bg-white rounded">
              <Row>
                <Col xs={12} sm={5} md={5}>
                  <div className="card-header card-img border-0">
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

                    <div className="userImgMain position-relative">
                      <div className="sub-card-img">
                        {loading && <ProfileLoadingOverlay />}

                        <Image
                          ref={uploadedImage}
                          src={myCharityProfile?.image || profileImg}
                          alt=""
                        />
                      </div>
                      <label htmlFor="myInputImage">
                        <div className="editIconDiv">
                          <PencilIcon size="16px" />
                        </div>
                      </label>
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={7} md={7} className="titleCol">
                  <div className="card-block card-data px-2">
                    <div className="card-title">
                      <Title>{myCharityProfile?.name}</Title>
                      <p className="card-text">{myCharityProfile?.regNo}</p>
                      <p className="card-text text-capitalize">
                        {myCharityProfile?.position}
                      </p>
                      <p className="card-text">
                        {myCharityProfile?.charityWeb}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} sm={12} lg={5} xl={5}>
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
                      <Heading className="mt-4">£{totalRaised}</Heading>
                      <Description>Total Raised</Description>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row style={{ marginTop: 15, marginBottom: 15 }}>
          {isCharityProfileInComplete(myCharityProfile) && (
            <Col xs={12}>
              <Alert show variant="warning" onClose={() => {}}>
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
      <SessionExpired />
      <Footer />
    </div>
  );
}

export default withRouter(
  connect(
    null,
    { ...authActions, ...charityActions },
  )(CharityLayout),
);
