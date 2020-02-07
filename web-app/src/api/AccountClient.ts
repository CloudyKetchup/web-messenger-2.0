import axios from "axios";

import { AuthReponse } from "../model/AuthResponse";
import { User } from "../model/User";
import { Room } from "../model/Room";
import { FriendRequest } from "../model/request/FriendRequest";
import { Status } from "../model/Status";

const URL = "http://localhost:8080/account";

export class AccountClient
{
  static login = (email : string, password : string) : Promise<AuthReponse> =>
  (
    axios.get(`${URL}/login?email=${email}&password=${password}`)
      .then(response => response.data)
      .catch(console.log)
  );

  static register = (nick : string, email : string, password : string) : Promise<AuthReponse> =>
  (
    axios.post(`${URL}/register?nick=${nick}&email=${email}&password=${password}`)
      .then(response => response.data)
      .catch(console.log)
  );

  static getFriends = (id : string) : Promise<User[]> =>
  (
    axios.get(`${URL}/get/friends?id=${id}`)
      .then(response => response.data)
      .catch(console.log)
  );

  static getRooms = (id : string) : Promise<Room[]> => 
  (
    axios.get(`${URL}/get/rooms?id=${id}`)
      .then(response => response.data)
      .catch(e => { console.log(e); return [] })
  );

  static getFriendRequests = (id : string) : Promise<FriendRequest[]> =>
  (
    axios.get(`${URL}/get/friend-requests?id=${id}`)
      .then(response => response.data)
      .catch(console.log)
  );

  static getFriendRoom = (id : string, friendId : string) : Promise<Room | null> =>
  (
    axios.get(`${URL}/get/room?userId=${id}&friendId=${friendId}`)
      .then(response => response.data)
      .catch(console.log)
  );
  
  static setStatus = (id : string, status : Status) =>
  (
    axios.post(`${URL}/set/status?id=${id}&status=${status}`)
      .then(response => response.data)
      .catch(console.log)
  );
}