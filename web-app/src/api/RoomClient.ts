import axios from "axios";

import { Message } from "../model/Message";

const URL = "http://localhost:8080/room";

export class RoomClient
{
	
	static getMessages = (id : string) : Promise<Message[]> =>
	(
		axios.get(`${URL}/get/messages?id=${id}`)
			.then(response => response.data)
			.catch(console.log)
	);
}
