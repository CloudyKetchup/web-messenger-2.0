import React from "react";

import { User } from "../../model/User";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import { AccountClient } from "../../api/AccountClient";
import { MediaClient } from "../../api/MediaClient";

import { History } from "history";

import * as CookieManager from "../../util/cookie/CookieManager";

import { AuthPageComponent, AuthPageState } from "../AuthPageComponent/AuthPageComponent";
import { AuthPageAlerts } from "../AuthPageComponent/AuthPageAlerts";

import "../../css/animated-squares.css";

interface IProps { history : History }

interface IState extends AuthPageState {
  profilePictureURL : string
  profilePictureFile : File | null
}

export class RegistrationWindowComponent extends AuthPageComponent<IProps, IState>
{
  state : IState = {
    snackbars : [],
    profilePictureURL : "https://images.vexels.com/media/users/3/137479/isolated/preview/19939e8d7a742bbfac2f5519108e216e-mountain-climbing-hiking-snow-by-vexels.png",
    profilePictureFile : null
  };

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

  private pictureMouseOver = async () =>
  {
    this.pictureMouseEvent("#fafafa99", this.pictureOverlay);
    this.pictureIconMouseEvent("block", this.pictureIcon);
  };

  private pictureMouseOut = async () =>
  {
    this.pictureMouseEvent("unset", this.pictureOverlay);
    this.pictureIconMouseEvent("none", this.pictureIcon);
  };

  private pictureMouseEvent = async (color : string, picture? : HTMLElement) =>
  {
    if (picture) picture.style.background = color;
  };

  private pictureIconMouseEvent = async (display : string, icon? : HTMLElement) =>
  {
    if (icon) icon.style.display = display;
  };

  private triggerImageChooser = async () =>
  {
    if (!this.pictureChooser)
      this.pictureChooser = document.getElementById("choose-profile-picture") as HTMLInputElement || undefined;

    this.pictureChooser && this.pictureChooser.click();
  };

  swapPicture = async () =>
  {
    if (this.pictureChooser)
    {
      const pictureFile = this.pictureChooser.files;

      if (pictureFile)
      {
        this.setState({ profilePictureFile : pictureFile[0] } as IState);

        const fr = new FileReader();

        fr.onload = e =>
        {
          this.setState({ profilePictureURL : e.target?.result as string } as IState);
        };
        fr.readAsDataURL(pictureFile[0]);
      }
    }
  };

  register = async () =>
  {
    const emailInput    = document.getElementById("registration-email-input") as HTMLInputElement;
    const nickInput     = document.getElementById("registration-nick-input") as HTMLInputElement;
    const passwordInput = document.getElementById("registration-password-input") as HTMLInputElement;

    if (emailInput && nickInput && passwordInput)
    {
      const result = AccountClient.register(nickInput.value, emailInput.value, passwordInput.value);

      await Profile.createBasedOnAuth(
        await result,
        result => this.errorAlert(result?.message),
        async account =>
        {
          CookieManager.saveCredentials(emailInput.value, passwordInput.value);

          await this.setProfilePicture(
            account,
            this.errorAlert,
            () => this.props.history.push("/chat"));
        });
    }
  };

  private setProfilePicture = async (account : User, fallback? : () => void, callback? : (result : any) => void) =>
  {
    if (this.state.profilePictureFile)
    {
      const image = await MediaClient.saveProfileImage(account.id, this.state.profilePictureFile);

      if (image)
      {
        const result = await AccountClient.setProfilePicture(account.id, image.id, fallback);

        callback && callback(result);
      }
    }
  };

  render = () => (
    <div className="registration-window">
      <div className="area" >
        <div className="form-pane" style={{ maxHeight : 450 }}>
          <div className="form-pane-header">
            <div>
              <span>Register</span>
            </div>
            <div style={{ position : "relative" }}>
              <div
                id="profile-picture-overlay"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                  position : "absolute",
                  zIndex : 99,
                  cursor : "pointer",
                  textAlign : "center"
                }}
                onClick={this.triggerImageChooser}
              >
                <i style={{ color : "black" }} id="profile-picture-icon" className="fas fa-image"/>
              </div>
              <img id="profile-picture" src={this.state.profilePictureURL} alt=""/>
            </div>
            <div className="form-pane-header-inputs">
              <input id="registration-email-input" placeholder="Email" type="email"/>
              <input id="registration-nick-input" placeholder="Nickname" type="name"/>
              <input id="registration-password-input" placeholder="Password" type="password"/>
            </div>
          </div>
          <div className="form-pane-footer" style={{ height : 300 }}>
            <button onClick={this.register}><i className="fas fa-check"/></button>
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
        </ul>
      </div>
      <AuthPageAlerts alerts={this.state.snackbars} onClose={alert => this.removeAlert(alert.id)}/>
      <input
        id="choose-profile-picture"
        onChange={this.swapPicture}
        style={{ display : "none" }}
        type="file"
        accept="image/*"/>
    </div>
  );
}
