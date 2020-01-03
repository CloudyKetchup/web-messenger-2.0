import { Component } from "react";

import AppContext from "../context/AppContext";

import { Room }     from "../model/Room";
import { Message }  from "../model/Message";

import { RoomContextHelpers as RoomContext } from "./RoomContextHelpers";

export class AppContextHelpers {
  static context : AppContext | null = null;  // context with app data for easier access from far away components
  private static components : Component[];    // components that will be rerendered on context update

  /**
   * @param context     {@link AppContext} object
   * @param components  components for rerendering on context update
   */
  static createContext = (context : AppContext, ...components : Component[]) => {
    AppContextHelpers.context    = context;
    AppContextHelpers.components = components;
  }

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
   * update update related room context
   * 
   * @param message   {@link Message} objectk
   */
  static sendMessage = async (message : Message) => {
    if (RoomContext.context?.data)
    {
      RoomContext.addMessage(message);
    }
    AppContextHelpers.components.forEach(c => c.forceUpdate());
  };
}