import { User } from "./User";

export type AuthReponse = {
  status   : string
  message  : string
  account? : User
};