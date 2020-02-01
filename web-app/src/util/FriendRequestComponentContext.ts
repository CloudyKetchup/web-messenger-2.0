import ComponentContext from "../util/ComponentContext";

import { FriendRequest } from "../model/request/FriendRequest";

import FriendRequestsPaneComponent from "../components/FriendRequestsPane/FriendRequestsPaneComponent";

export class FriendRequestComponentContext extends ComponentContext
{
  private static instance : FriendRequestComponentContext;

  static getInstance = () : FriendRequestComponentContext =>
  {
    if (!FriendRequestComponentContext.instance)
    {
      FriendRequestComponentContext.instance = new FriendRequestComponentContext();
    }
    return FriendRequestComponentContext.instance;
  };

  updateFriendRequestsLists = (requests: FriendRequest[]) =>
  {
    const friendRequestsComponent = this.components.filter(c => c instanceof FriendRequestsPaneComponent)[0];

    friendRequestsComponent && friendRequestsComponent.setState({ requests : requests });
  };
}