import { User } from "./User";
import { Message } from "./Message";

export type Room = {
    id          : string
    name?       : string
    messages    : Message[]
    images      : number
    documents   : number
    users       : User[]
    group       : boolean
};