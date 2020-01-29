import { Component } from "react";

import RoomContext from "../context/RoomContext";

import { ProfileContextHelpers as Profile } from "./ProfileContextHelpers";

import { Room }     from "../model/Room";
import { Message }  from "../model/Message";

export class RoomContextHelpers
{
  static context : RoomContext | null = null;
  private static components : Component[] = [];

  /**
   * Create room context, can also accept components for registration, see more info below
   * at ,,components,, param
   * 
   * @param context     {@link RoomContext} object
   * @param components  {@link Component}'s for registration see see {@see RoomContextHelpers.registerComponent} docs
   */
  static createContext = (context : RoomContext, ...components : Component[]) =>
  {
    RoomContextHelpers.context = context;
    components.forEach(RoomContextHelpers.registerComponent);
  };

  /**
   * Register any component for to components list, those components can be updated
   * on any context data update, used in methods below
   * 
   * @param component   {@link Component} to be registered to list
   */
  static registerComponent = (component : Component) =>
  {
    const alreadyExists = () =>
    {
      RoomContextHelpers.components.forEach(c => {
        if (c == component)
          return true;
      });
      return false;
    };

    !alreadyExists() && RoomContextHelpers.components.push(component);
  };

  /**
   * Change room data from context to given one
   * 
   * @param room    {@link Room} for swaping
   */
  static changeRoom = (room : Room) =>
  {
    if (RoomContextHelpers.context)
    {
      RoomContextHelpers.context.data = room;
      RoomContextHelpers.components.forEach(c => c.forceUpdate());
    }
  };

  /**
   * Get messages from room inside context, can return empty list, see details below
   * 
   * @return {Message} list or empty list if context or context data is null
   */
  static getCurrentRoomMessages = () : Message[] =>
  {
    if (RoomContextHelpers.context?.data)
    {
      return RoomContextHelpers.context.data.messages;
    }
    return [];
  };

  /**
   * Add a message to room from profile and assign this room again to context data,
   * basically we add message to current selected room
   * 
   * @param message   {@link Message}
   */
  static addMessage = async (message : Message) =>
  {
    if (RoomContextHelpers.context && RoomContextHelpers.context.data)
    {
      // find current room in rooms list from profile context
      const room = Profile.findRoomById(RoomContextHelpers.context.data.id);

      if (room)
      {
        // push message to room from profile context
        room.messages.push(message);
        // assign room from profile to context data
        RoomContextHelpers.context.data = room;

        RoomContextHelpers.components.forEach(c => c.forceUpdate());
      }
    }
  };
}