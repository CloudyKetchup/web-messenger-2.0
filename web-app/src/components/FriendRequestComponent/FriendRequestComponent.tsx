import React, { FC } from "react";

import { FriendRequest } from "../../model/request/FriendRequest";

import { FriendRequestClient } from "../../api/FriendRequestClient";

import { ProfileDataUpdater } from "../../helpers/ProfileDataUpdater";

import { Link } from "react-router-dom";

import "./friend-request-component.css";

type IProps = { request : FriendRequest };

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

  const name = (name : string) =>
  {
    return name.length > 32 ? `${name.substring(0, 33)}...` : name;
  };

  return (
    <div className="friend-request">
      <Link to={`/chat/user/info?id=${props.request.from.id}`}>
        <span>{name(props.request.text)}</span>
      </Link>
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