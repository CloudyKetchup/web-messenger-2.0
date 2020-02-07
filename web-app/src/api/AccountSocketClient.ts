import { Stomp, CompatClient, IMessage } from "@stomp/stompjs";

import { ProfileContextHelpers as Profile } from "../helpers/ProfileContextHelpers";

import { User } from "../model/User";
import { Status } from "../model/Status";

import { AccountClient } from "./AccountClient";

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

        this.stomp.subscribe(`/acc/user/${Profile.profileContext.profile.id}/receive/new-friend`, this.recieveNewFriend);
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

  private recieveNewFriend = (response : IMessage) => Profile.addFriend(JSON.parse(response.body));

  private receiveFriendRequest = (response : IMessage) => Profile.addFriendRequest(JSON.parse(response.body));
}