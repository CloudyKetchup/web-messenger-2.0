import axios from "axios";

import { AuthReponse } from "../model/AuthResponse";
import { User } from "../model/User";
import { Room } from "../model/Room";

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
      .catch(console.log)
  );

  static sendFriendRequest = (id : string, targetId : string) : Promise<String>=>
  (
    axios.post(`${URL}/request/friendship/send?from=${id}&to=${targetId}`)
      .then(response => response.data)
      .catch(console.log)
  );
}