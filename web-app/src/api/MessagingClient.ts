import { Room }    from "../model/Room";
import { Message } from "../model/Message";

import { RoomContextHelpers } from "../helpers/RoomContextHelpers";

import { Stomp, CompatClient } from "@stomp/stompjs";

type MessageBody = {
  text      : string
  time      : number
  authorId  : string
};

export class MessagingClient
{
  private static stomp : CompatClient;

  static init = async () =>
  {
      MessagingClient.stomp = Stomp.client("ws://localhost:8100/room/socket/messaging");
      // MessagingClient.stomp.debug = () => null;

      MessagingClient.stomp.activate();
      await MessagingClient.initMessageReciever();
  };

  private static initMessageReciever = async (...rooms : Room[]) =>
  {
    MessagingClient.stomp.onConnect = () =>
    {
      rooms.forEach(async room =>
      {
        MessagingClient.stomp.subscribe(`/c/message/receive/room/${room.id}`, response =>
        {
          MessagingClient.recieveMessage(JSON.parse(response.body) as Message, rooms[0]);
        });
      });
    };
  };

  static sendMessage = (message : MessageBody, roomId : string) =>
  {
    MessagingClient.stomp.send(`/app/message/add/room/${roomId}`, {}, JSON.stringify(message));
  }

  private static recieveMessage = (message : Message, room : Room) =>
  {
    if (RoomContextHelpers.context?.data?.id === room.id)
    {
      RoomContextHelpers.addMessage(message);
    }
    else
    {
      MessagingClient.getNotification(message);
    }
  };

  private static getNotification = (message : Message) => console.log(message + "\n");
}