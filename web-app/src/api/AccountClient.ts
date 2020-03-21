import axios from "axios";

import { AuthReponse } from "../model/AuthResponse";
import { User } from "../model/User";
import { Room } from "../model/Room";
import { FriendRequest } from "../model/request/FriendRequest";
import { Status } from "../model/Status";

import { GLOBAL_URL } from "./ApiConfig";

const URL = `http${GLOBAL_URL}/account`;

export class AccountClient
{
  private static fallback = (...args : any[]) : void | undefined => undefined;

  static setFallback = (fallback : (...args : any[]) => void) => AccountClient.fallback = fallback;

  static login = (email : string, password : string) : Promise<AuthReponse> =>
  (
    axios.get(`${URL}/login?email=${email}&password=${password}`)
      .then(response => response.data)
      .catch(AccountClient.fallback)
  );

  static register = (nick : string, email : string, password : string) : Promise<AuthReponse> =>
  (
    axios.post(`${URL}/register?nick=${nick}&email=${email}&password=${password}`)
      .then(response => response.data)
      .catch(AccountClient.fallback || { status : "500", message : "error occurred" } as AuthReponse)
  );

  static findById = (id : string) : Promise<User | undefined> =>
  (
    axios.get(`${URL}/get?id=${id}`)
      .then(response => response.data)
      .catch(AccountClient.fallback)
  );

  static getFriends = (id : string) : Promise<User[]> =>
  (
    axios.get(`${URL}/get/friends?id=${id}`)
      .then(response => response.data)
      .catch(AccountClient.fallback || [])
  );

  static getRooms = (id : string) : Promise<Room[]> =>
  (
    axios.get(`${URL}/get/rooms?id=${id}`)
      .then(response => response.data)
      .catch(AccountClient.fallback || [])
  );

  static getFriendRequests = (id : string) : Promise<FriendRequest[]> =>
  (
    axios.get(`${URL}/get/friend-requests?id=${id}`)
      .then(response => response.data)
      .catch(AccountClient.fallback || [])
  );

  static getFriendRoom = (id : string, friendId : string) : Promise<Room | null> =>
  (
    axios.get(`${URL}/get/room?userId=${id}&friendId=${friendId}`)
      .then(response => response.data)
      .catch(AccountClient.fallback || null)
  );

  static setStatus = (id : string, status : Status) =>
  (
    axios.post(`${URL}/set/status?id=${id}&status=${status}`)
      .then(response => response.data)
      .catch(AccountClient.fallback)
  );

  static setProfilePicture = (id : string, imageId : string, fallback? : () => void) =>
  (
    axios.post(`${URL}/set/profile-image?id=${id}&imageId=${imageId}`)
      .then(response => response.data)
      .catch(fallback)
  );
}
