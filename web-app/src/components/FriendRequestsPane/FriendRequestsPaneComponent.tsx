import React, { Component } from "react";

import { FriendRequest } from "../../model/request/FriendRequest";

import { FriendRequestComponent } from "../FriendRequestComponent/FriendRequestComponent";

import "./friend-requests-pane-component.css";
import { AppContextHelpers } from "../../helpers/AppContextHelpers";

type IProps = {
  requests : FriendRequest[]
  close : () => void
};

type IState = {
  requests : FriendRequest[]
};

export default class FriendRequestsPaneComponent extends Component<IProps, IState>
{
  state : IState = {
    requests : this.props.requests
  }
  div : HTMLElement | undefined;

  componentDidMount = () =>
  {
    AppContextHelpers.registerComponent(this);
  };
  
  close = () =>
  {
    const div = document.getElementsByClassName("friend-requests-pane")[0];

    div && div.setAttribute("style", "right: -300px");

    setTimeout(() => this.props.close(), 300);
  }

  render = () =>
  (
    <div className="friend-requests-pane">
      <div id="friend-requests-list">
        {this.state.requests.map(request => <FriendRequestComponent key={request.id} request={request} />)}
      </div>
      <div id="friend-requests-pane-footer">
        <button onClick={this.close}>
         <i className="fas fa-chevron-right"/> 
        </button>
      </div>
    </div>
  );
}