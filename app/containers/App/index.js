/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import Signup from 'containers/Singup/Loadable';
import forgetPass from 'containers/ForgetPassword/Loadable';
import CreateCampaign from 'containers/CampaignCreate/Loadable';

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
        <Route component={NotFoundPage} />
      </Switch>

      <GlobalStyle />
    </div>
  );
}
