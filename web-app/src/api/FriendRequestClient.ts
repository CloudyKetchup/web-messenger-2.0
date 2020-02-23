import axios from "axios";

import { User } from "../model/User";

import { GLOBAL_URL} from "./ApiConfig";

const URL = `http://${GLOBAL_URL}/account/request`;

export class FriendRequestClient
{
  static sendRequest = (from : string, to : string) : Promise<String> =>
  (
    axios.post(`${URL}/friendship/send?from=${from}&to=${to}`)
      .then(response => response.data)
      .catch(console.log)
  );

  static requestIsSent = (from : string, to : string) : Promise<Boolean> =>
  (
    axios.get(`${URL}/friendship/sent?from=${from}&to=${to}`)
      .then(response => response.data)
      .catch(console.log)
  );

  static acceptRequest = (requestId : string) : Promise<User> =>
  (
    axios.post(`${URL}/friendship/accept?id=${requestId}`)
      .then(response => response.data)
      .catch(console.log)
  );

  static deleteRequest = (id : string) => axios.delete(`${URL}/delete/friend-request?id=${id}`).catch(console.log);
}