import React, { FC } from "react";

import { Link } from "react-router-dom";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import { AccountClient }  from "../../api/AccountClient";

import { History } from "history";

import "./login-window-component.css";
import "../../css/animated-squares.css";

export const LoginWindowComponent : FC<{ history : History }> = props =>
{
  const loginOnClick = async () =>
  {
    const emailInput    = document.getElementById("login-email-input") as HTMLInputElement;
    const passwordInput = document.getElementById("login-password-input") as HTMLInputElement;

    emailInput && passwordInput && login(emailInput.value, passwordInput.value);
  }

  const login = async (email : string, password : string) =>
  {
    const result = await AccountClient.login(email, password);

    console.log(result)

    if (result && result.status === "OK" && result.account)
    {
      Profile.createContext({
        profile : result.account,
        friends : await AccountClient.getFriends(result.account.id),
        rooms   : await AccountClient.getRooms(result.account.id),
        friendRequests : await AccountClient.getFriendRequests(result.account.id)
      });
      props.history.push("/chat");
    }
  };

  return (
    <div className="login-window">
      <div className="area" >
        <div className="form-pane">
          <div className="form-pane-header">
            <div>
              <img src="https://www.xda-developers.com/files/2019/09/OP7T_1_4k.jpg" alt="..."/>
            </div>
            <div className="form-pane-header-inputs">
              <input id="login-email-input" placeholder="Email" type="email"/>
              <input id="login-password-input" placeholder="Password" type="password"/>
            </div>
          </div>
          <div className="form-pane-footer">
            <button onClick={loginOnClick}><i className="fas fa-check"/></button>
            <Link to="/register">
              Register?
            </Link>
          </div>
        </div>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >
    </div>
  );
}