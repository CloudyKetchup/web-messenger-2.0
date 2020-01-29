import { Component } from "react";

import { RoomContextHelpers as RoomContext } from "./RoomContextHelpers";
import AppContext from "../context/AppContext";

import LeftPanelComponent from "../components/LeftPanel/LeftPanelComponent";
import FriendRequestsPaneComponent from "../components/FriendRequestsPane/FriendRequestsPaneComponent";

import { Room }     from "../model/Room";
import { Message }  from "../model/Message";
import { User } from "../model/User";
import { FriendRequest } from "../model/request/FriendRequest";

//TODO: update documentation
export class AppContextHelpers
{
  static context : AppContext | null = null;    // context with app data for easier access from far away components
  private static components : Component[] = []; // components that will be rerendered on context update

  /**
   * @param context     {@link AppContext} object
   * @param components  components for rerendering on context update
   */
  static createContext = (context : AppContext, ...components : Component[]) => {
    AppContextHelpers.context = context;
    components.forEach(AppContextHelpers.registerComponent);
  }

  static registerComponent = (component : Component) =>
  {
    const alreadyExists = () =>
    {
      AppContextHelpers.components.forEach(c => {
        if (c == component)
          return true;
      });
      return false;
    };

    !alreadyExists() && AppContextHelpers.components.push(component);
  };

  /**
   * Updates selected room in context and updated components related to it
   * 
   * @param room  {@link Room} selected
   */
  static changeRoom = (room : Room) => {
    if (!RoomContext.context)
    {
      RoomContext.createContext({
        data  : room,
        user  : undefined,
        stats : undefined
      });
      AppContextHelpers.components.forEach(c => c.forceUpdate());
    }
    RoomContext.changeRoom(room);
  };

  /**
   * Send message to server side and after that depending on response,
   * update related room
   * 
   * @param message   {@link Message} objectk
   */
  static sendMessage = async (message : Message) => {
    //TODO: fix that shit, more exactly do like in updateFriendsList method, you know what this means:))
    if (RoomContext.context?.data)
    {
      RoomContext.addMessage(message);
    }
    AppContextHelpers.components.forEach(c => c.forceUpdate());
  };

  static updateFriendsList = (friends : User[]) =>
  {
    const friendsComponent = AppContextHelpers.components.filter(c => c instanceof LeftPanelComponent)[0];

    friendsComponent && friendsComponent.setState({ friends : friends });
  };

  static updateFriendRequestsLists = (requests : FriendRequest[]) =>
  {
    const friendRequestsComponent = AppContextHelpers.components.filter(c => c instanceof FriendRequestsPaneComponent)[0];

    friendRequestsComponent && friendRequestsComponent.setState({ requests : requests });
  };
}