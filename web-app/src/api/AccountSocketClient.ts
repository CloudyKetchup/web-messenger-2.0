import { Stomp, CompatClient, messageCallbackType, IMessage } from "@stomp/stompjs";

import { ProfileContextHelpers as Profile } from "../helpers/ProfileContextHelpers";

import { User } from "../model/User";
import { FriendRequest } from "../model/request/FriendRequest";

export class AccountSocketClient
{
  private static stomp : CompatClient;

  static init = async () =>
  {
      AccountSocketClient.stomp = Stomp.client("ws://localhost:8300/user-service/socket");
      AccountSocketClient.stomp.debug = () => null;

      AccountSocketClient.stomp.activate();
      AccountSocketClient.initMessageReceiver();
  };

  static initMessageReceiver = () =>
  {
    AccountSocketClient.stomp.onConnect = () =>
    {
      if (Profile.profileContext)
      {
        AccountSocketClient.stomp.subscribe(`/acc/user/${Profile.profileContext.profile.id}/receive/new-friend`, AccountSocketClient.recieveNewFriend);
        AccountSocketClient.stomp.subscribe(`/acc/user/${Profile.profileContext.profile.id}/receive/friend-request`, AccountSocketClient.receiveFriendRequest);
      }
    };
  };

  private static recieveNewFriend = (response : IMessage) => Profile.addFriend(JSON.parse(response.body) as User);

  private static receiveFriendRequest = (response : IMessage) => Profile.addFriendRequest(JSON.parse(response.body) as FriendRequest);
}