import { Component } from "react";

import AppContext from "../context/AppContext";

import { Room }     from "../model/Room";
import { Message }  from "../model/Message";

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
    if (AppContextHelpers.context) {
      AppContextHelpers.context.roomSelected = room;
    }
    AppContextHelpers.components.forEach(c => c.forceUpdate());
  };

  /**
   * Get message from currently selected chat {@link Room}
   * 
   * @return {@link Message} list or undefined if context/selected room is null
   */
  static getMessages = () : Message[] | undefined => AppContextHelpers.context?.roomSelected?.messages;

  static sendMessage = async (message : Message) => {
    AppContextHelpers.context?.roomSelected?.messages.push(message);
    AppContextHelpers.components.forEach(c => c.forceUpdate());
  };
}