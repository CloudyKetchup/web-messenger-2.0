import ComponentContext from "./ComponentContext";

import RoomContext from "../context/RoomContext";

import { Message } from "../model/Message";

import RoomComponent from "../components/RoomComponent/RoomComponent";
import RoomChatComponent from "../components/RoomChatComponent/RoomChatComponent";

export class RoomComponentContext extends ComponentContext
{
  private static instance : RoomComponentContext;
  private static roomChatComponent : RoomChatComponent;
  private static roomComponent : RoomComponent;

  static getInstance = () : RoomComponentContext =>
  {
    if (!RoomComponentContext.instance)
    {
      RoomComponentContext.instance = new RoomComponentContext();
    }
    return RoomComponentContext.instance;
  };

  updateRoom = (room: RoomContext) =>
  {
    const setState = () =>
    {
      RoomComponentContext.roomComponent.setState({ empty : false, room : room });
    };

    if (RoomComponentContext.roomComponent)
    {
      setState();
      return;
    } else
    {
      const roomComponent = this.components.filter(c => c instanceof RoomComponent)[0] as RoomComponent;

      if (roomComponent)
      {
        RoomComponentContext.roomComponent = roomComponent;

        setState();
      }
    }
  };

  updateMessages = (messages : Message[]) =>
  {
    const roomChatComponent = RoomComponentContext.roomChatComponent;

    if (roomChatComponent)
    {
      roomChatComponent.setState({ messages: messages }, roomChatComponent.scrollBottom);
      return;
    } else
    {
      const roomChatComponent = this.components.filter(c => c instanceof RoomChatComponent)[0] as RoomChatComponent;

      if (roomChatComponent)
      {
        RoomComponentContext.roomChatComponent = roomChatComponent;

        roomChatComponent.setState({ messages: messages }, roomChatComponent.scrollBottom);
      }
    }
  };
};