import { Notification } from "./Notification";
import { Room } from "../Room";
import { Message } from "../Message";

export interface ChatMessageNotification extends Notification
{
  message : Message
  room    : Room
}