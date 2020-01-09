import React, { FC } from "react";

import { Link } from "react-router-dom";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import { Status } from "../../model/Status";

import "./login-window-component.css";
import "../../css/animated-squares.css";

export const LoginWindowComponent : FC = () => {

  const createContext = () => {
    Profile.createContext({
      profile: {
        id: "1",
        nick: "John Wick",
        status: Status.ONLINE
      },
      friends: [{
        id: "2",
        nick: "Hideo Kojima",
        status: Status.ONLINE
      }],
      rooms: []
    });
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
              <input placeholder="Email" type="email"/>
              <input placeholder="Password" type="password"/>
            </div>
          </div>
          <div className="form-pane-footer">
            <Link onClick={createContext} to="/chat"><i className="fas fa-check"/></Link>
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