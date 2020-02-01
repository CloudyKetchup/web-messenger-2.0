import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { LoginWindowComponent }         from "./components/LoginWindowComponent/LoginWindowComponent";
import { RegistrationWindowComponent }  from "./components/RegistrationWindowComponent/RegistrationWindowComponent";

import { ProfileContextHelpers as Profile } from './helpers/ProfileContextHelpers';

import { Route, BrowserRouter as Router, Redirect, Switch } from "react-router-dom";

import * as CookieManager from "./util/cookie/CookieManager";

import * as serviceWorker from './serviceWorker';

import './index.css';

export default class AppWrapper extends Component
{

  UNSAFE_componentWillMount = () =>
  {
    const profile = CookieManager.loadProfile();

    if (profile !== null)
    {
      Profile.createContext(profile);
    };
  };

  render = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Redirect to={Profile.profileContext ? "/chat" : "/login"} />} />
        <Route exact path="/login" component={LoginWindowComponent}/>
        <Route exact path="/register" component={RegistrationWindowComponent}/>
        <Route path="/chat" component={App} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<AppWrapper/>, document.getElementById('root'));

serviceWorker.unregister();
