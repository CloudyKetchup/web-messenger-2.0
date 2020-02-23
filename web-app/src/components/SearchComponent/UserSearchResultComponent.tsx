import React, { FC } from "react";

import { FriendRequestClient } from "../../api/FriendRequestClient";

import { UserSearchResult } from "../../model/search/UserSearchResult";
import { Status } from "../../model/Status";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import { GLOBAL_URL } from "../../api/ApiConfig";

import "./user-search-result-component.css";

type IProps = { data : UserSearchResult };

export const UserSearchResultComponent : FC<IProps> = props => 
{
  const sendFriendRequest = async () =>
  {
    if (Profile.profileContext)
    {
      await FriendRequestClient.sendRequest(Profile.profileContext.profile.id, props.data.user.id);
    }
  };

  return (
    <div className="search-result-user">
      <div className="search-user-picture">
        <div style={{ height : "100%", width : "100%", borderRadius : 100 }}>
	        <img src={`http://${GLOBAL_URL}/image/get?id=${props.data.user.profileImage?.id}`} alt=""/>
        </div>
      </div>
      <div className="search-user-nick">
        <span>{props.data.user.nick}</span>
      </div>
      <div className="search-user-status">
        <div style={{
          color : props.data.user.status === Status.OFFLINE ? "red" : "green"
        }}/>
      </div>
      {
        props.data.friends
        &&
        <div className="search-user-friend-request-button">
          <button onClick={sendFriendRequest}><i className="far fa-paper-plane" /></button>
        </div>
      }
    </div>
  );
};