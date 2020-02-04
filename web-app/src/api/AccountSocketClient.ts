import { Stomp, CompatClient, IMessage } from "@stomp/stompjs";

import { ProfileContextHelpers as Profile } from "../helpers/ProfileContextHelpers";

import { User } from "../model/User";
import { FriendRequest } from "../model/request/FriendRequest";

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
    this.initMessageReceiver();
  };

  initMessageReceiver = () =>
  {
    this.stomp.onConnect = () =>
    {
      if (Profile.profileContext)
      {
        this.stomp.subscribe(`/acc/user/${Profile.profileContext.profile.id}/receive/new-friend`, this.recieveNewFriend);
        this.stomp.subscribe(`/acc/user/${Profile.profileContext.profile.id}/receive/friend-request`, this.receiveFriendRequest);
      }
    };
  };

  private recieveNewFriend = (response : IMessage) => Profile.addFriend(JSON.parse(response.body) as User);

  private receiveFriendRequest = (response : IMessage) => Profile.addFriendRequest(JSON.parse(response.body) as FriendRequest);
}