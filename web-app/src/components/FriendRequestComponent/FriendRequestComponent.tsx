import React, { FC } from "react";

import { FriendRequest } from "../../model/request/FriendRequest";

import { FriendRequestClient } from "../../api/FriendRequestClient";

import { ProfileDataUpdater } from "../../helpers/ProfileDataUpdater";

import "./friend-request-component.css";

type IProps = {
  request : FriendRequest
};

export const FriendRequestComponent : FC<IProps> = props =>
{
  const acceptRequest = () => 
  {
    FriendRequestClient.acceptRequest(props.request.id)
      .then(() => ProfileDataUpdater.getInstance().refreshFriendRequestsList(props.request.to.id));
  }

  const deleteRequest = () => 
  {
    FriendRequestClient.deleteRequest(props.request.id)
      .then(() => ProfileDataUpdater.getInstance().refreshFriendRequestsList(props.request.to.id));
  }

  return (
    <div className="friend-request">
      <div>
        <span>{props.request.text}</span>
      </div>
      <div id="friend-request-control-buttons">
        <button onClick={acceptRequest}>
          <i className="fas fa-check"/>
        </button>
        <button onClick={deleteRequest}>
          <i className="fas fa-ban"/>
        </button>
      </div>
    </div>
  );
};