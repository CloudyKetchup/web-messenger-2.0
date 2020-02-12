import ComponentContext from "./ComponentContext";

import { User } from "../model/User";

import LeftPanelComponent from "../components/LeftPanel/LeftPanelComponent";
import ListUserComponent from "../components/ListUserComponent/ListUserComponent";

export class LeftPanelComponentContext extends ComponentContext
{
  private static instance : LeftPanelComponentContext;

  static getInstance = () : LeftPanelComponentContext =>
  {
    if (!LeftPanelComponentContext.instance)
    {
      LeftPanelComponentContext.instance = new LeftPanelComponentContext();
    }
    return LeftPanelComponentContext.instance;
  };

  updateFriendsList = (friends : User[]) =>
  {
    const friendsComponent = this.components.filter(c => c instanceof LeftPanelComponent)[0];

    friendsComponent && friendsComponent.setState({ friends : friends });
  };

  updateFriend = (friend : User) =>
  {
    const components = this.components.filter(async c => c instanceof ListUserComponent) as ListUserComponent[];
    const listUserComponent = components.filter(c => c.state.data && c.state.data.id === friend.id)[0];

    listUserComponent.setState({ data : friend });
  };
}