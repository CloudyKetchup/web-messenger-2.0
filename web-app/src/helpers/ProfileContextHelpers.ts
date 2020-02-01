import ProfileContext from "../context/ProfileContext";

import { Room } from "../model/Room";
import { User } from "../model/User";
import { FriendRequest } from "../model/request/FriendRequest";
import { AuthReponse } from "../model/AuthResponse";

import { AccountClient } from "../api/AccountClient";

import { FriendRequestComponentContext } from "../util/FriendRequestComponentContext";
import { LeftPanelComponentContext } from "../util/LeftPanelComponentContext";

/**
 * A model similar to {@link ProfileContext} except that profile
 * have type of {@link User | null} instead of {@link User}
 */
type ProfileContextLike = {
  profile : User | null
  rooms   : Room[]
  friends : User[]
  friendRequests : FriendRequest[]
};

export class ProfileContextHelpers
{
  static profileContext : ProfileContext | null = null;

  /**
   * Builder class for easy context creation
   */
  static Builder = class
  {
    private instance : ProfileContextLike = {
      profile : null,
      rooms   : [],
      friends : [],
      friendRequests : []
    };

    rooms = (rooms : Room[]) =>
    {
      this.instance.rooms = rooms;

      return this;
    };

    friends = (friends : User[]) =>
    {
      this.instance.friends = friends;

      return this;
    };

    friendRequests = (friendRequests : FriendRequest[]) =>
    {
      this.instance.friendRequests = friendRequests;

      return this;
    };

    /**
     * Build context
     * 
     * @param user    {@link User}
     * @return {ProfileContext}
     */
    build = (user : User) : ProfileContext =>
    {
      this.instance.profile = user;

      return this.instance as ProfileContext;
    };
  }

  /**
   * Create context based on result from authentication request
   * 
   * @param result    result from api {@link AuthReponse}
   * @param fallback  function called if not authenticated
   * @param callback  optional function called on success
   */
  static createBasedOnAuth = async (result : AuthReponse, fallback : (result : AuthReponse) => void, callback? : () => void) =>
  {
    if (result && result.status === "OK" && result.account)
    {
      const friends         = AccountClient.getFriends(result.account.id);
      const rooms           = AccountClient.getRooms(result.account.id);
      const friendRequests  = AccountClient.getFriendRequests(result.account.id)
      
      const profile = new ProfileContextHelpers.Builder()
        .friends(await friends)
        .rooms(await rooms)
        .friendRequests(await friendRequests)
        .build(result.account);

      ProfileContextHelpers.createContext(profile);

      callback && callback();
    }
    else fallback(result);
  };

  /**
   * Creates profile context
   * 
   * @param context     {@link ProfileContext} context
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

	static updateRoom = (room : Room) =>
	{
		if (ProfileContextHelpers.profileContext)
		{
			const index = ProfileContextHelpers.profileContext.rooms.findIndex(r => r.id === room.id);
		
			ProfileContextHelpers.profileContext.rooms[index] = room;
		}
	};

  /**
   * Add a friend to friends list from profile
   * 
   * @param friend  {@link User}
   */
  static addFriend = (friend : User) =>
  {
    if (ProfileContextHelpers.profileContext?.friends && !ProfileContextHelpers.friendExists(friend))
    {
      ProfileContextHelpers.profileContext.friends.push(friend);

      LeftPanelComponentContext.getInstance().updateFriendsList(ProfileContextHelpers.profileContext.friends);
    }
  };

  /**
   * Add friend request to list
   * 
   * @param request     {@link FriendRequest}
   */
  static addFriendRequest = (request : FriendRequest) =>
  {
    if (ProfileContextHelpers.profileContext)
    {
      ProfileContextHelpers.profileContext.friendRequests.push(request);

      FriendRequestComponentContext.getInstance().updateFriendRequestsLists(ProfileContextHelpers.profileContext.friendRequests);
    }
  };

  /**
   * Find room in rooms list from profile context by it's id
   * 
   * @param id    {@link Room} id
   * @return {@link Room} or void if not found
   */
  static findRoomById = (id : string) =>
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
