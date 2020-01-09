import React, { Component } from "react";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import { Status } from "../../model/Status";

import { Link } from "react-router-dom";

import "../../css/animated-squares.css";

export class RegistrationWindowComponent extends Component {

  pictureOverlay : HTMLElement      | undefined;
  pictureIcon    : HTMLElement      | undefined;
  pictureChooser : HTMLInputElement | undefined;

  componentDidMount = () => {
    if (!this.pictureOverlay)
      this.pictureOverlay = document.getElementById("profile-picture-overlay") || undefined;
    if (!this.pictureIcon)
      this.pictureIcon = document.getElementById("profile-picture-icon") || undefined;

    if (this.pictureOverlay && this.pictureIcon) {
      this.pictureOverlay.addEventListener("mouseover", this.pictureMouseOver);
      this.pictureOverlay.addEventListener("mouseout", this.pictureMouseOut);
    }
  };

  componentWillUnmount = () => {
    this.pictureOverlay && this.pictureOverlay.removeEventListener("mouseover", this.pictureMouseOver);
    this.pictureOverlay && this.pictureOverlay.removeEventListener("mouseout", this.pictureMouseOut);
  };

  private pictureMouseOver = () => {
    this.pictureMouseEvent("#00000040", this.pictureOverlay);
    this.pictureIconMouseEvent("block", this.pictureIcon);
  };

  private pictureMouseOut = () => {
    this.pictureMouseEvent("unset", this.pictureOverlay);
    this.pictureIconMouseEvent("none", this.pictureIcon);
  };

  private pictureMouseEvent = async (color : string, picture? : HTMLElement) => {
    if (picture) picture.style.background = color;
  }

  private pictureIconMouseEvent = async (display : string, icon? : HTMLElement) => {
    if (icon) icon.style.display = display;
  }

  private triggerImageChooser = async () => {
    if (!this.pictureChooser)
      this.pictureChooser = document.getElementById("choose-profile-picture") as HTMLInputElement || undefined;

    this.pictureChooser && this.pictureChooser.click();
  }

  swapPicture = async () => {
    const picture = document.getElementById("profile-picture") as HTMLImageElement;

    if (picture && this.pictureChooser) {
      const pictureFile = this.pictureChooser.files;

      if (pictureFile) {
        const fr = new FileReader();

        fr.onload = (e) => {
          picture.src = e.target?.result as string;
        };
        fr.readAsDataURL(pictureFile[0]);
      }
    }
  };

  createContext = () => {
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

  render = () => (
    <div className="registration-window">
      <div className="area" >
        <div className="form-pane" style={{ maxHeight : 450 }}>
          <div className="form-pane-header">
            <div style={{ position : "relative" }}>
              <div
                id="profile-picture-overlay"
                style={{ position : "absolute", zIndex : 99, cursor : "pointer", textAlign : "center" }}
                onClick={this.triggerImageChooser}
              >
                <i id="profile-picture-icon" className="fas fa-image"/> 
              </div>
              <img id="profile-picture" src="https://www.xda-developers.com/files/2019/09/OP7T_1_4k.jpg" alt="..."/>
            </div>
            <div className="form-pane-header-inputs">
              <input placeholder="Email" type="email"/>
              <input placeholder="Nickname" type="name"/>
              <input placeholder="Password" type="password"/>
            </div>
          </div>
          <div className="form-pane-footer">
            <Link onClick={this.createContext} to="/chat"><i className="fas fa-check"/></Link>
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
      </div>
      <input
        id="choose-profile-picture"
        onChange={this.swapPicture}
        style={{ display : "nonoe" }}
        type="file"
        accept="image/*"/>
    </div>
  );
};