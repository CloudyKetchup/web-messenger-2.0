import ComponentContext from "./ComponentContext";

import RoomContext from "../context/RoomContext";

import { Message } from "../model/Message";

import RoomComponent from "../components/RoomComponent/RoomComponent";
import RoomChatComponent from "../components/RoomChatComponent/RoomChatComponent";

export class RoomComponentContext extends ComponentContext
{
  private static instance : RoomComponentContext;

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
    const roomComponent = this.components.filter(c => c instanceof RoomComponent)[0];

    roomComponent && roomComponent.setState({ room : room });
  };

  updateMessages = (messages : Message[]) =>
  {
    const roomChatComponent = this.components.filter(c => c instanceof RoomChatComponent)[0] as RoomChatComponent;

    roomChatComponent && roomChatComponent.setState({ messages : messages }, roomChatComponent.scrollBottom);
  };
};