import { User } from "./User";

export interface Message {
  id      : string
  text    : string
  author  : User
  time    : number
}