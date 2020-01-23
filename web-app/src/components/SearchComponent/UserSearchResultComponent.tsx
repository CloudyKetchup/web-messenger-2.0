import React, { FC } from "react";

import { AccountClient } from "../../api/AccountClient";

import { UserSearchResult } from "../../model/search/UserSearchResult";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import "./user-search-result-component.css";

type IProps = { data : UserSearchResult };

export const UserSearchResultComponent : FC<IProps> = props => 
{
  const sendFriendRequest = async () =>
  {
    if (Profile.profileContext)
    {
      await AccountClient.sendFriendRequest(Profile.profileContext.profile.id, props.data.user.id);
    }
  };

  return (
    <div className="search-result-user">
      <div className="search-user-picture">
        <div>
          {/* image with dot status */}
        </div>
      </div>
      <div className="search-user-nick">
        <span>{props.data.user.nick}</span>
      </div>
      <div className="search-user-status-quote">
        {/* status qoute */}
        <span>fjkdshjkfhksdbkfjbkjdsbjkfbk</span>
      </div>
      {
        !props.data.friends
        &&
        <div className="search-user-friend-request-button">
          {/* send friend request */}
          <button><i className="far fa-paper-plane" /></button>
        </div>
      }
    </div>
  );
};