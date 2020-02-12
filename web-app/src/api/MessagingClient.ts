import { Room }    from "../model/Room";
import { Message } from "../model/Message";
import { ChatMessageNotification } from "../model/notification/ChatMessageNotification ";

import { RoomContextHelpers } from "../helpers/RoomContextHelpers";
import { ProfileContextHelpers as Profile } from "../helpers/ProfileContextHelpers";
import { NotificationContextHelpers } from "../helpers/NotificationContextHelpers";

import { Stomp, CompatClient } from "@stomp/stompjs";

import * as UUID from "../util/uuid/UUIDTools";
import { NotificationType } from "../model/notification/Notification";

export type MessageBody = {
	text      : string
	time      : number
	authorId  : string
};

export class MessagingClient
{
	private static instance : MessagingClient;
	private stomp : CompatClient;
	private URL = "localhost:8080";

	constructor()
	{
		this.stomp = Stomp.client(`ws://${this.URL}/room/socket/messaging`);
	}

	static getInstance = () : MessagingClient =>
	{
		if (!MessagingClient.instance)
		{
			MessagingClient.instance = new MessagingClient();
		}
		return MessagingClient.instance;
	};

	init = async () =>
	{
		this.stomp.debug = () => null;

		this.stomp.activate();

		if (Profile.profileContext)
		{
			await this.initMessageReceiver(...Profile.profileContext.rooms);
		}
	};

	private initMessageReceiver = async (...rooms : Room[]) =>
	{
		this.stomp.onConnect = () => rooms.forEach(this.subscribeRoom);
	};

	subscribeRoom = (room : Room) =>
	{
		this.stomp.subscribe(`/c/message/receive/room/${room.id}`, response =>
		{
			this.recieveMessage(JSON.parse(response.body) as Message, room);
		});
	};

	sendMessage = async (message : MessageBody, roomId : string) =>
	{
		this.stomp.send(`/app/message/add/room/${roomId}`, {}, JSON.stringify(message));
	}

	private recieveMessage = (message : Message, room : Room) =>
	{
		if (RoomContextHelpers.context?.data?.id === room.id)
		{
			RoomContextHelpers.addMessage(message);
		} else
		{
			this.getNotification(message, room);
		}
	};

	private getNotification = (message : Message, room : Room) =>
	{
		NotificationContextHelpers.getInstance().addNotification({
			id 				: UUID.generateUUIDV4(),
			text 			: `${message.author.nick} - ${message.text}`,
			type 			: NotificationType.MESSAGE,
			message		: message,
			room			: room
		} as ChatMessageNotification);
	};
}