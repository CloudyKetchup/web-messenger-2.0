import RoomContext from "../context/RoomContext";

import { ProfileContextHelpers as Profile } from "./ProfileContextHelpers";

import { RoomClient } from "../api/RoomClient";

import { RoomComponentContext } from "../util/RoomComponetContext";

import { Message }  from "../model/Message";

export class RoomContextHelpers
{
	static context : RoomContext;

	/**
	 * @param context     @type {RoomContext} object
	 */
	static createContext = (context : RoomContext) => RoomContextHelpers.context = context;

	/**
	 * Change current selected room to new one,
	 * will update context then update room related component
	 * 
	 * @param room    @type {RoomContext} for swaping
	 */
	static changeRoom = async (room : RoomContext) =>
	{
		if (room.data)
		{
			room.data.messages = await RoomClient.getMessages(room.data.id);

			room.data.messages.sort((m1, m2) => m1.time - m2.time);

			Profile.updateRoom(room.data);

			RoomContextHelpers.updateContext(room);
		}
	};

	/**
	 * @param room 		@type {RoomContext}
	 */
	static updateContext = (room : RoomContext) =>
	{
		RoomContextHelpers.createContext(room);

		RoomComponentContext.getInstance().updateRoom(room);
	};

	/**
	 * get messages from current selected room
	 * 
	 * @return array of @type {Message}
	 */
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
	 * @param message   @type {Message}
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
