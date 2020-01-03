import { User } from "./User";

export enum State {
  READ,
  UNREAD
};

export interface Message {
  id      : string
  text    : string
  author  : User
  time    : number
  state   : State
}