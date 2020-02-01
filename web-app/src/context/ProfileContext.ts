import { User } from "../model/User";
import { Room } from "../model/Room";
import { FriendRequest } from "../model/request/FriendRequest";

export default interface ProfileContext {
  profile : User
  friends : User[]
  rooms   : Room[]
  friendRequests : FriendRequest[]
}