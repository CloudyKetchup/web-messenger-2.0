import { User } from "../User";

export type FriendRequest = {
  id    : string
  from  : User
  to    : User
  text  : string
};