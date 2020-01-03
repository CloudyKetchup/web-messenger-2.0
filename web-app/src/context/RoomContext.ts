import { User } from "../model/User";
import { Room } from "../model/Room";

type Stats = {
  images    : number
  messages  : number
  documents : number
};

export default interface RoomContext {
  data  : Room | undefined
  user  : User | undefined
  stats : Stats| undefined
}