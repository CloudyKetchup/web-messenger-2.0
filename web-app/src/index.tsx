import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { LoginWindowComponent }         from "./components/LoginWindowComponent/LoginWindowComponent";
import { RegistrationWindowComponent }  from "./components/RegistrationWindowComponent/RegistrationWindowComponent";

import { ProfileContextHelpers as Profile } from './helpers/ProfileContextHelpers';

import { Route, BrowserRouter as Router, Redirect, Switch } from "react-router-dom";

import './index.css';
import * as serviceWorker from './serviceWorker';

export default class AppWrapper extends Component {

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
