

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import Signup from 'containers/Singup/Loadable';
import forgetPass from 'containers/ForgetPassword/Loadable';
import CreateCampaign from 'containers/CampaignCreate/Loadable';
import ResetPassword from 'containers/Resetpassword/Loadable';
import AccountVerify from 'containers/AccountVerify/index';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgetPassword" component={forgetPass} />
        <Route exact path="/createCampaign" component={CreateCampaign} />
        <Route exact path="/resetPassword" component={ResetPassword} />
        {/* <Route exact path="/accountVerify" component={AccountVerify} /> */}
        <Route exact path="/accountVerify" render={(props) => <AccountVerify {...props} />} />
        <Route component={NotFoundPage} />
      </Switch>

      <GlobalStyle />
    </div>
  );
}
