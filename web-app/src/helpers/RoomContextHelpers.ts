import RoomContext from "../context/RoomContext";

import { ProfileContextHelpers as Profile } from "./ProfileContextHelpers";
import { AppContextHelpers } from "./AppContextHelpers";

import { RoomClient } from "../api/RoomClient";

import { RoomComponentContext } from "../util/RoomComponetContext";

import { Message }  from "../model/Message";

export class RoomContextHelpers
{
	static context : RoomContext;

	/**
	 * Create room context
	 * 
	 * @param context     {@link RoomContext} object
	 */
	static createContext = (context : RoomContext) => RoomContextHelpers.context = context;

	/**
	 * Update room context
	 * 
	 * @param room    {@link RoomContext} for swaping
	 */
	static changeRoom = async (room : RoomContext) =>
	{
		const roomContextWasNull = RoomContextHelpers.context === undefined;

		if (room.data)
		{
			room.data.messages = await RoomClient.getMessages(room.data.id);

			room.data.messages.sort((m1, m2) => m1.time - m2.time);

			Profile.updateRoom(room.data);

			RoomContextHelpers.createContext(room);

			if (roomContextWasNull)
			{
				AppContextHelpers.refreshMainComponent();
			} else
			{
				RoomComponentContext.getInstance().updateRoom(room);
			}
		}
	};

	static getCurrentRoomMessages = () : Message[] =>
	{
		if (RoomContextHelpers.context?.data)
		{
			return RoomContextHelpers.context.data.messages;
		}
		return [];
	};

	/**
	 * Add message to context
	 * 
	 * @param message   {@link Message}
	 */
	static addMessage = async (message : Message) =>
	{
		if (RoomContextHelpers.context && RoomContextHelpers.context.data)
		{
			// find current room in rooms list from profile context
			const room = Profile.findRoomById(RoomContextHelpers.context.data.id);

			if (room && room.messages)
			{
				// push message to room from profile context
				room.messages.push(message);
				// assign room from profile to context data
				RoomContextHelpers.context.data = room;

				RoomComponentContext.getInstance().updateMessages(RoomContextHelpers.context.data.messages);
			}
		}
	};
}
