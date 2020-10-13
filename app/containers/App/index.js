import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import MyProfile from 'containers/MyProfile/index';
import CharityProfile from 'containers/CharityProfile/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import Signup from 'containers/Singup/Loadable';
import forgetPass from 'containers/ForgetPassword/Loadable';
import CreateCampaign from 'containers/CampaignCreate/Loadable';
import EditCampaign from 'containers/EditCampaign/Loadable';
import ResetPassword from 'containers/Resetpassword/Loadable';
import AccountVerify from 'containers/AccountVerify/index';
import CampaignUpdatesContainer from 'containers/CampaignUpdatesContainer/index';
import CampaignViewContainer from 'containers/CampaignViewContainer/index';
import DonationsContainer from 'containers/DonationsContainer/index';
import AccountVerification from 'containers/AccountVerification/index';
import AllDonations from 'containers/AllDonations/index';

import { shallowEqual, useSelector } from 'react-redux';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import AuthRoute from '../../components/AuthRoutes';
import LoginRoute from '../../components/routes';
export default function App() {
  // localStorage.getItem('token')
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual,
  );
  return (
    <div>
      <Switch>
        <AuthRoute exact path="/" component={HomePage} />
        <AuthRoute exact path="/profile" component={MyProfile} />
        <AuthRoute exact path="/charity-profile" component={CharityProfile} />
        {/* {!localStorage.getItem('token') && <Route path="/login" component={LoginPage} exact />} */}
        <LoginRoute exact path="/login" component={LoginPage} />
        <LoginRoute exact path="/signup" component={Signup} />
        <LoginRoute exact path="/forgetPassword" component={forgetPass} />
        <AuthRoute exact path="/createCampaign" component={CreateCampaign} />
        <AuthRoute
          exact
          path="/addCampaignUpdates/:id"
          component={CampaignUpdatesContainer}
        />
        <AuthRoute exact path="/donations/:id" component={DonationsContainer} />
        <AuthRoute exact path="/editCampaign/:id" component={EditCampaign} />
        <LoginRoute exact path="/resetPassword" component={ResetPassword} />
        {user?.statusId ? <LoginRoute exact path="/accountVerification" component={AccountVerification} /> : null}

        <LoginRoute exact path="/accountVerify" component={AccountVerify} />
        <AuthRoute
          exact
          path="/campaignView/:id"
          component={CampaignViewContainer}
        />
        <AuthRoute exact path="/donations" component={AllDonations} />
        {/* <LoginRoute exact path="/accountVerify" render={(props) => <AccountVerify {...props} />} /> */}
        <Route component={NotFoundPage} />
      </Switch>

      <GlobalStyle />
    </div>
  );
}
