import ProfileContext from "../context/ProfileContext";

import { Room } from "../model/Room";
import { User } from "../model/User";
import { FriendRequest } from "../model/request/FriendRequest";
import { AuthReponse } from "../model/AuthResponse";

import { AccountClient } from "../api/AccountClient";

import { RoomContextHelpers } from "../helpers/RoomContextHelpers";

import { FriendRequestComponentContext } from "../util/FriendRequestComponentContext";
import { LeftPanelComponentContext } from "../util/LeftPanelComponentContext";

import { MessagingClient } from "../api/MessagingClient";

/**
 * A model similar to @type {ProfileContext} except that profile
 * have type of @type {User} instead of @type {User}
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
     * @param user    @type {User}
     * @return @type {ProfileContext}
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
   * @param result    result from api @type {AuthReponse}
   * @param fallback  function called if not authenticated
   * @param callback  optional function called on success
   */
  static createBasedOnAuth = async (result : AuthReponse, fallback? : (result : AuthReponse) => void, callback? : (account : User) => void) =>
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

      callback && callback(result.account);
    }
    else fallback && fallback(result);
  };

  /**
   * Creates profile context
   * 
   * @param context     @type {ProfileContext} context
   */
  static createContext = (context : ProfileContext) => ProfileContextHelpers.profileContext = context;

  /**
   * Add a room to rooms list from profile
   * 
   * @param room    @type {Room}
   */
  static addRoom = (room : Room) =>
  {
    if (!ProfileContextHelpers.roomExist(room))
    {
      ProfileContextHelpers.profileContext?.rooms.push(room);

      MessagingClient.getInstance().subscribeRoom(room);
    }
  };

  /**
   * Update room from list, finds target by id
   * 
   * @param room    @type {Room}
   */
	static updateRoom = (room : Room) =>
	{
		if (ProfileContextHelpers.profileContext)
		{
			const index = ProfileContextHelpers.profileContext.rooms.findIndex(r => r.id === room.id);
		
			ProfileContextHelpers.profileContext.rooms[index] = room;
		}
	};

  /**
   * Update friend from friends list, find by id, after that
   * updates it's component
   * 
   * @param friend  @type {User}
   */
  static updateFriend = (friend : User) =>
  {
    if (ProfileContextHelpers.profileContext)
    {
      const index = ProfileContextHelpers.profileContext.friends.findIndex(f => f.id === friend.id);

      ProfileContextHelpers.profileContext.friends[index] = friend;

      LeftPanelComponentContext.getInstance().updateFriend(friend);

			if (RoomContextHelpers.context)
			{
				const newRoomContext = RoomContextHelpers.context;

				newRoomContext.user = friend;

				RoomContextHelpers.updateContext(newRoomContext);
			}
    }
  };

  /**
   * Add a friend to friends list from profile
   * 
   * @param friend  @type {User}
   */
  static addFriend = (friend : User) =>
  {
    if (ProfileContextHelpers.profileContext?.friends && !ProfileContextHelpers.friendExists(friend))
    {
      ProfileContextHelpers.profileContext.friends.push(friend);

      LeftPanelComponentContext.getInstance().updateFriendsList(ProfileContextHelpers.profileContext.friends);

      // get room for that friend and add it to context
      AccountClient.getFriendRoom(ProfileContextHelpers.profileContext.profile.id, friend.id)
        .then(room => room && ProfileContextHelpers.addRoom(room));
    }
  };

  /**
   * Add friend request to list
   * 
   * @param request     @type {FriendRequest}
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
   * @param id    @type {Room} id
   * @return @type {Room} or void if not found
   */
  static findRoomById = (id : string) =>
  {
    return ProfileContextHelpers.profileContext?.rooms.filter(r => r.id === id)[0];
  };

  /**
   * Checks if room exists in rooms list from profile context
   * 
   * @param room    @type {Room}
   * @return boolean depending on result
   */
  static roomExist = (room : Room) : Boolean =>
  {
    return ProfileContextHelpers.profileContext?.rooms.find(r => r.id === room.id) !== undefined;
  };

  /**
   * Checks if friend exists in friendslist from profile context
   * 
   * @param friend  @type {User}
   */
  static friendExists = (friend : User) : Boolean =>
  {
    return ProfileContextHelpers.profileContext?.friends.find(f => f.id === friend.id) !== undefined;
  };
}
