import React, { Component } from "react";

import { User } 		from "../../model/User";
import { Message } 	from "../../model/Message";

import RoomContext from "../../context/RoomContext";

import { ProfileContextHelpers as Profile } 	from "../../helpers/ProfileContextHelpers";
import { RoomContextHelpers } from "../../helpers/RoomContextHelpers";

import { RoomComponentContext } from "../../util/RoomComponetContext";

import MessageComponent from "../MessageComponent/MessageComponent";

import { MessagingClient } from "../../api/MessagingClient";

import SendIcon from "../../assets/send.svg";
import PlusIcon from "../../assets/plus.svg";

import "./room-chat-component.css";

type IProps = { room : RoomContext };

type IState = {
	room 					: RoomContext
	choosenImages : FileList | null
	typing				: boolean
	messages			: Message[]
};

export default class RoomChatComponent extends Component<IProps, IState>
{
	state : IState = {
		room					: this.props.room,
		choosenImages : null,
		typing				: true,
		messages			: this.props.room.data?.messages || []
	};

	componentDidMount = async () =>
	{
		// register this component to be updated on room context update
		RoomComponentContext.getInstance().registerComponent(this);
		this.scrollBottom();
	};

	componentDidUpdate = () =>
	{
		if (RoomContextHelpers.context.data !== this.state.room.data)
		{
			this.setState({ room : RoomContextHelpers.context });
		}
		/* if this component was updated and messages from context didn't match with those from
			 state -> assign messages from context to state to update the ui */
		if (RoomContextHelpers.context?.data && RoomContextHelpers.getCurrentRoomMessages() !== this.state.messages)
		{
			this.setState({ messages : RoomContextHelpers.getCurrentRoomMessages() });
		}
		this.scrollBottom();
	}

	chooseImages = async () =>
	{
		if (this.state.room.data)
		{
			const input = document.getElementById("room-choose-images");

			input && input.click();
		}
	};

	scrollBottom = () =>
	{
		const div = document.getElementsByClassName("chat-messages-container")[0];

		if (div)
		{
			div.scrollTop = div.scrollHeight;
		}
	};

	sendMessage = async () =>
	{
		if (this.state.room.data)
		{
			const input = document.getElementById(`room-${this.state.room.data.id}-input`) as HTMLInputElement;

			if (input && input.value !== "" && Profile.profileContext)
			{
				const messageBody = {
					text : input.value,
					time : new Date().getTime(),
					authorId : Profile.profileContext.profile.id
				};

				await MessagingClient.getInstance().sendMessage(messageBody, this.state.room.data.id)

				input.value = "";
			}
		}
	};

	render = () => (
		<div className="room-chat">
			<div className="room-chat-header">
				<span>{this.state.room.user?.status.toString()}</span>
				{
					this.state.typing
					&&
					<span style={{
						marginLeft: 10,
						marginRight : "auto",
						color : "grey"
					}}>typing...</span>
				}
			</div>
			<div className="room-chat-body">
				<div className="chat-messages-container" style={{ paddingTop : 10, overflow : "auto" }}>
					{this.state.messages.map(message => <MessageComponent key={message.id} data={message}/>)}
				</div>
			</div>
			<div className="room-chat-footer">
				<div>
					<input
						id="room-choose-images"
						style={{ display : "none" }}
						type="file"
						accept="image/*"
						onChange={async () => {
							const input = document.getElementById("room-choose-images") as HTMLInputElement;

							this.setState({ choosenImages : input?.files });
						}}
						multiple/>
					<button onClick={this.chooseImages}>
						<img style={{ height : 20 }} src={PlusIcon} alt="..."/>
					</button>
					<input id={`room-${this.state.room.data?.id}-input`} placeholder="Your message..."/>
					<button onClick={this.sendMessage}>
						<img style={{ height : 35 }} src={SendIcon} alt="..."/>
					</button>
				</div>
			</div>
		</div>
	);
}
