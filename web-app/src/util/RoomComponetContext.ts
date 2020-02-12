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
    if (!RoomComponentContext.roomComponent)
    {
      RoomComponentContext.roomComponent = this.components.filter(c => c instanceof RoomComponent)[0] as RoomComponent;
    }
    RoomComponentContext.roomComponent && RoomComponentContext.roomComponent.setState({ room : room });
  };

  updateMessages = (messages : Message[]) =>
  {
    if (!RoomComponentContext.roomChatComponent)
    {
      RoomComponentContext.roomChatComponent = this.components.filter(c => c instanceof RoomChatComponent)[0] as RoomChatComponent;
    }
    if (RoomComponentContext.roomChatComponent)
    {
      RoomComponentContext.roomChatComponent.setState({ messages : messages }, RoomComponentContext.roomChatComponent.scrollBottom)
    }
  };
}