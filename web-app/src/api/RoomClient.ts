import axios from "axios";

import { Message } from "../model/Message";

import { GLOBAL_URL } from "./ApiConfig";

const URL = `http://${GLOBAL_URL}/room`;

export class RoomClient
{
	
	static getMessages = (id : string) : Promise<Message[]> =>
	(
		axios.get(`${URL}/get/messages?id=${id}`)
			.then(response => response.data)
			.catch(console.log)
	);
}
