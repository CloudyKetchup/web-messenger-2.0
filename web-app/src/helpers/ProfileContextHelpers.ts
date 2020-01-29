import ProfileContext from "../context/ProfileContext";

import { Room } from "../model/Room";
import { User } from "../model/User";
import { FriendRequest } from "../model/request/FriendRequest";

import { AppContextHelpers } from "./AppContextHelpers";

export class ProfileContextHelpers
{
  static profileContext : ProfileContext | null = null;

  /**
   * Creates profile context and accepts components for rerender on context update
   * 
   * @param context     {@link ProfileContext} context
   * @param components  {@link Component}'s for rerender
   */
  static createContext = (context : ProfileContext) => ProfileContextHelpers.profileContext = context;

  /**
   * Add a room to rooms list from profile
   * 
   * @param room    {@link Room}
   */
  static addRoom = (room : Room) =>
  {
    if (!ProfileContextHelpers.roomExist(room))
    {
      ProfileContextHelpers.profileContext?.rooms.push(room);
    }
  };

  /**
   * Add a frient to friends list from profile
   * 
   * @param friend  {@link User}
   */
  static addFriend = (friend : User) =>
  {
    if (ProfileContextHelpers.profileContext?.friends && !ProfileContextHelpers.friendExists(friend))
    {
      ProfileContextHelpers.profileContext.friends.push(friend);

      AppContextHelpers.updateFriendsList(ProfileContextHelpers.profileContext.friends);
    }
  };

  static addFriendRequest = (request : FriendRequest) =>
  {
    if (ProfileContextHelpers.profileContext)
    {
      ProfileContextHelpers.profileContext.friendRequests.push(request);

      AppContextHelpers.updateFriendRequestsLists(ProfileContextHelpers.profileContext.friendRequests);
    }
  };

  /**
   * Find room in rooms list from profile context by it's id
   * 
   * @param id    {@link Room} id
   * @return {@link Room} or void if not found
   */
  static findRoomById = (id : string) : Room | void =>
  {
    return ProfileContextHelpers.profileContext?.rooms.filter(r => r.id === id)[0];
  };

  /**
   * Checks if room exists in rooms list from profile context
   * 
   * @param room    {@link Room}
   * @return boolean depending on result
   */
  static roomExist = (room : Room) : Boolean =>
  {
    return ProfileContextHelpers.profileContext?.rooms.find(r => r.id === room.id) !== undefined;
  };

  /**
   * Checks if friend exists in friendslist from profile context
   * 
   * @param friend  {@link User}
   */
  static friendExists = (friend : User) : Boolean =>
  {
    return ProfileContextHelpers.profileContext?.friends.find(f => f.id === friend.id) !== undefined;
  };
}