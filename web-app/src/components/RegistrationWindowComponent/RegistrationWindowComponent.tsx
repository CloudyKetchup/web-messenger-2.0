import React, { Component } from "react";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import { AccountClient } from "../../api/AccountClient";

import { History } from "history";

import "../../css/animated-squares.css";

export class RegistrationWindowComponent extends Component<{ history : History }>
{
  pictureOverlay : HTMLElement      | undefined;
  pictureIcon    : HTMLElement      | undefined;
  pictureChooser : HTMLInputElement | undefined;

  componentDidMount = () =>
  {
    if (!this.pictureOverlay)
      this.pictureOverlay = document.getElementById("profile-picture-overlay") || undefined;
    if (!this.pictureIcon)
      this.pictureIcon = document.getElementById("profile-picture-icon") || undefined;

    if (this.pictureOverlay && this.pictureIcon) {
      this.pictureOverlay.addEventListener("mouseover", this.pictureMouseOver);
      this.pictureOverlay.addEventListener("mouseout", this.pictureMouseOut);
    }
  };

  componentWillUnmount = () =>
  {
    this.pictureOverlay && this.pictureOverlay.removeEventListener("mouseover", this.pictureMouseOver);
    this.pictureOverlay && this.pictureOverlay.removeEventListener("mouseout", this.pictureMouseOut);
  };

  private pictureMouseOver = () =>
  {
    this.pictureMouseEvent("#00000040", this.pictureOverlay);
    this.pictureIconMouseEvent("block", this.pictureIcon);
  };

  private pictureMouseOut = () =>
  {
    this.pictureMouseEvent("unset", this.pictureOverlay);
    this.pictureIconMouseEvent("none", this.pictureIcon);
  };

  private pictureMouseEvent = async (color : string, picture? : HTMLElement) =>
  {
    if (picture) picture.style.background = color;
  }

  private pictureIconMouseEvent = async (display : string, icon? : HTMLElement) =>
  {
    if (icon) icon.style.display = display;
  }

  private triggerImageChooser = async () =>
  {
    if (!this.pictureChooser)
      this.pictureChooser = document.getElementById("choose-profile-picture") as HTMLInputElement || undefined;

    this.pictureChooser && this.pictureChooser.click();
  }

  swapPicture = async () =>
  {
    const picture = document.getElementById("profile-picture") as HTMLImageElement;

    if (picture && this.pictureChooser)
    {
      const pictureFile = this.pictureChooser.files;

      if (pictureFile)
      {
        const fr = new FileReader();

        fr.onload = e =>
        {
          picture.src = e.target?.result as string;
        };
        fr.readAsDataURL(pictureFile[0]);
      }
    }
  };

  register = async () =>
  {
    const emailInput = document.getElementById("registration-email-input") as HTMLInputElement;
    const nickInput  = document.getElementById("registration-nick-input") as HTMLInputElement;
    const passwordInput = document.getElementById("registration-password-input") as HTMLInputElement;

    if (emailInput && nickInput && passwordInput)
    {
      const result = await AccountClient.register(nickInput.value, emailInput.value, passwordInput.value);

      if (result && result.status === "OK" && result.account)
      {
        Profile.createContext({
          profile : result.account,
          friends : await AccountClient.getFriends(result.account.id),
          rooms   : await AccountClient.getRooms(result.account.id),
          friendRequests : await AccountClient.getFriendRequests(result.account.id)
        })
        this.props.history.push("/chat");
      }
    }
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
              <input id="registration-email-input" placeholder="Email" type="email"/>
              <input id="registration-nick-input" placeholder="Nickname" type="name"/>
              <input id="registration-password-input" placeholder="Password" type="password"/>
            </div>
          </div>
          <div className="form-pane-footer">
            <button onClick={this.register}><i className="fas fa-check"/></button>
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