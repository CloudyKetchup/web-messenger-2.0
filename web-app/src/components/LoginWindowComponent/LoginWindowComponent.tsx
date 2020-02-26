import React from "react";

import { Link } from "react-router-dom";

import { History } from "history";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import { AccountClient }  from "../../api/AccountClient";

import * as CookieManager from "../../util/cookie/CookieManager";

import { AuthPageComponent, AuthPageState } from "../AuthPageComponent/AuthPageComponent";
import { AuthPageAlerts } from "../AuthPageComponent/AuthPageAlerts";

import { ReactComponent as UserIcon } from "../../assets/user-2.svg";

import "./login-window-component.css";
import "../../css/animated-squares.css";

interface IProps { history : History }

interface IState extends AuthPageState {}

export class LoginWindowComponent extends AuthPageComponent<IProps, IState>
{
  loginOnClick = async () =>
  {
    const emailInput    = document.getElementById("login-email-input") as HTMLInputElement;
    const passwordInput = document.getElementById("login-password-input") as HTMLInputElement;

    emailInput && passwordInput && this.login(emailInput.value, passwordInput.value);
  };

  login = async (email : string, password : string) =>
  {
    const result = AccountClient.login(email, password);

    await Profile.createBasedOnAuth(
      await result,
      result => this.errorAlert(result?.message),
			() => { CookieManager.saveCredentials(email, password); this.props.history.push("/chat"); });
  };

  render = () => (
    <div className="login-window">
      <div className="area" >
        <div className="form-pane">
          <div className="form-pane-header">
            <div>
              <span>Login</span>
            </div>
            <div style={{ textAlign : "center" }}>
              <UserIcon fill="gray" style={{ height : "90%", width : "90%" }}/>
            </div>
            <div className="form-pane-header-inputs">
              <input id="login-email-input" placeholder="Email" type="email"/>
              <input id="login-password-input" placeholder="Password" type="password"/>
            </div>
          </div>
          <div className="form-pane-footer">
            <button onClick={this.loginOnClick}><i className="fas fa-check"/></button>
            <Link to="/register">
              Register?
            </Link>
          </div>
        </div>
        <ul className="circles">
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
        </ul>
      </div>
	    <AuthPageAlerts alerts={this.state.snackbars} onClose={alert => this.removeAlert(alert.id)}/>
    </div>
  );
}
