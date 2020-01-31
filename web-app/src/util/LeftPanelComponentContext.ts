import ComponentContext from "./ComponentContext";

import { User } from "../model/User";

import LeftPanelComponent from "../components/LeftPanel/LeftPanelComponent";

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
}