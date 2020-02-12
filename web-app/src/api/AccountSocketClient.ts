import { Stomp, CompatClient, IMessage } from "@stomp/stompjs";

import { ProfileContextHelpers as Profile } from "../helpers/ProfileContextHelpers";
import { NotificationContextHelpers } from "../helpers/NotificationContextHelpers";

import { AccountClient } from "./AccountClient";

import { User }                       from "../model/User";
import { Status }                     from "../model/Status";
import { FriendRequest }              from "../model/request/FriendRequest";
import { FriendRequestNotification }  from "../model/notification/FriendRequestNotification";
import { NotificationType }           from "../model/notification/Notification";

import * as UUID from "../util/uuid/UUIDTools";

export class AccountSocketClient
{
  private static instance : AccountSocketClient;
  private stomp : CompatClient;

  constructor()
  {
    this.stomp = Stomp.client("ws://localhost:8300/user-service/socket");
  }

  static getInstance = () : AccountSocketClient =>
  {
    if (!AccountSocketClient.instance)
    {
      AccountSocketClient.instance = new AccountSocketClient();
    }
    return AccountSocketClient.instance;
  };

  init = () =>
  {
    this.stomp.debug = () => null;

    this.stomp.activate();
    this.stomp.onDisconnect = () =>
    {
      if (Profile.profileContext)
      {
        AccountClient.setStatus(Profile.profileContext.profile.id, Status.OFFLINE);
      }
    };
    this.initMessageReceiver();
  };

  initMessageReceiver = () =>
  {
    this.stomp.onConnect = async () =>
    {
      if (Profile.profileContext)
      {
        AccountClient.setStatus(Profile.profileContext.profile.id, Status.ONLINE);

        this.stomp.subscribe(`/acc/user/${Profile.profileContext.profile.id}/receive/new-friend`, this.receiveNewFriend);
        this.stomp.subscribe(`/acc/user/${Profile.profileContext.profile.id}/receive/friend-request`, this.receiveFriendRequest);

        this.subscribeFriendUpdates(Profile.profileContext.friends);
      }
    };
  };

  private subscribeFriendUpdates = (friends : User[]) =>
  {
    friends.forEach(friend =>
    {
      this.stomp.subscribe(`/acc/user/${friend.id}/friend/updated`, response =>
      {
        Profile.updateFriend(JSON.parse(response.body));
      });
    });
  };

  private receiveNewFriend = (response : IMessage) => Profile.addFriend(JSON.parse(response.body));

  private receiveFriendRequest = (response : IMessage) =>
  {
    const request = JSON.parse(response.body) as FriendRequest;

    Profile.addFriendRequest(request);

    const from = request.from.nick;

    NotificationContextHelpers.getInstance().addNotification({
      id : UUID.generateUUIDV4(),
      text : `You've got a friend request from ${from.length > 3 ? `${from.substring(0, 3)}...` : from}`,
      from : request.from.nick,
      type : NotificationType.FRIEND_REQUEST
    } as FriendRequestNotification);
  }
}