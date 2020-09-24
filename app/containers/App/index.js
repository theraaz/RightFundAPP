import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import MyProfile from 'containers/MyProfile/index';
import LoginPage from 'containers/LoginPage/Loadable';
import Signup from 'containers/Singup/Loadable';
import forgetPass from 'containers/ForgetPassword/Loadable';
import CreateCampaign from 'containers/CampaignCreate/Loadable';
import EditCampaign from 'containers/EditCampaign/Loadable';
import ResetPassword from 'containers/Resetpassword/Loadable';
import AccountVerify from 'containers/AccountVerify/index';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import MyCampaigns from '../../components/MyCampaigns/Loadable';
import AuthRoute from '../../components/AuthRoutes';
import LoginRoute from '../../components/routes';
export default function App() {
  // localStorage.getItem('token')
  return (
    <div>
      <Switch>
        <AuthRoute exact path="/" component={HomePage} />
        <AuthRoute exact path="/profile" component={MyProfile} />
        {/* {!localStorage.getItem('token') && <Route path="/login" component={LoginPage} exact />} */}
        <LoginRoute exact path="/login" component={LoginPage} />
        <LoginRoute exact path="/signup" component={Signup} />
        <LoginRoute exact path="/forgetPassword" component={forgetPass} />
        <AuthRoute exact path="/createCampaign" component={CreateCampaign} />
        <AuthRoute exact path="/editCampaign" component={EditCampaign} />
        <LoginRoute exact path="/resetPassword" component={ResetPassword} />
        <LoginRoute exact path="/accountVerify" component={AccountVerify} />
        {/* <LoginRoute exact path="/accountVerify" render={(props) => <AccountVerify {...props} />} /> */}
        <Route component={NotFoundPage} />
      </Switch>

      <GlobalStyle />
    </div>
  );
}
