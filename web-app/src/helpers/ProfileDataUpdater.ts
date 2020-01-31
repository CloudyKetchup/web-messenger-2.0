import { AccountClient } from "../api/AccountClient";

import { ProfileContextHelpers as Profile } from "./ProfileContextHelpers";

import { FriendRequestComponentContext } from "../util/FriendRequestComponentContext";
import { LeftPanelComponentContext } from "../util/LeftPanelComponentContext";

export class ProfileDataUpdater
{
  private static instance : ProfileDataUpdater;

  private constructor() {}

  static getInstance = () =>
  {
    if (!ProfileDataUpdater.instance)
    {
      ProfileDataUpdater.instance = new ProfileDataUpdater();
    }
    return ProfileDataUpdater.instance;
  };

  refreshFriendsList = async (id : string) =>
  {
    if (Profile.profileContext)
    {
      Profile.profileContext.friends = await AccountClient.getFriends(id);

      LeftPanelComponentContext.getInstance().updateFriendsList(Profile.profileContext.friends);
    }
  };

  refreshRoomsList = async (id : string) =>
  {
    if (Profile.profileContext)
    {
      Profile.profileContext.rooms = await AccountClient.getRooms(id);
    }
  };

  refreshFriendRequestsList = async (id : string) =>
  {
    if (Profile.profileContext)
    {
      Profile.profileContext.friendRequests = await AccountClient.getFriendRequests(id);

      FriendRequestComponentContext.getInstance().updateFriendRequestsLists(Profile.profileContext.friendRequests);
    }
  };
};