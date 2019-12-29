import { User } from "../model/User";
import { Room } from "../model/Room";

export default interface ProfileContext {
  profile : User
  friends : User[]
  rooms : Room[]
}