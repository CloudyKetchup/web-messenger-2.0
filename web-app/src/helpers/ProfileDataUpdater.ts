import { AccountClient } from "../api/AccountClient";

import { ProfileContextHelpers as Profile } from "./ProfileContextHelpers";
import { AppContextHelpers } from "./AppContextHelpers";

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

      AppContextHelpers.updateFriendsList(Profile.profileContext.friends);
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

      AppContextHelpers.updateFriendRequestsLists(Profile.profileContext.friendRequests);
    }
  };
};