import React, { Component } from "react";

import { Room } from "../../model/Room";
import { User } from "../../model/User";
import { Message, State } from "../../model/Message";

import { ProfileContextHelpers as Profile } 	from "../../helpers/ProfileContextHelpers";
import { AppContextHelpers as AppContext } 		from "../../helpers/AppContextHelpers";
import { RoomContextHelpers as RoomContext } 	from "../../helpers/RoomContextHelpers";

import MessageComponent from "../MessageComponent/MessageComponent";

import "./room-chat-component.css";

type IProps = { data : Room };

type IState = {
	choosenImages : FileList | null
	user 					: User | null
	typing 				: boolean
	messages 			: Message[]
};

let i = 0;

export default class RoomChatComponent extends Component<IProps, IState> {
	state : IState = {
		choosenImages : null,
		user 					: null,
		typing 				: true,
		messages 			: []
	};

	componentDidMount = async () => {
		const user = this.props.data.users.filter(u => u.id !== Profile.profileContext?.profile.id)[0];

		if (RoomContext.context?.data)
		{
			user && this.setState({ user : user })

			this.setState({ messages : RoomContext.context.data.messages });
		}
		// register this component to be updated on room context update
		RoomContext.registerComponent(this);
	};

	componentDidUpdate = () => {
		/* if this component was updated and messages from context didn't match with those from
			 state -> assign messages from context to state to update the ui */
		if (RoomContext.context?.data && RoomContext.getCurrentRoomMessages() !== this.state.messages)
		{
			this.setState({ messages : RoomContext.getCurrentRoomMessages() });
		}
	}

	chooseImages = async () => {
		const input = document.getElementById(`room-${this.props.data.id}-choose-images`);

		input && input.click();
	};

	sendMessage = async () => {
		const input = document.getElementById(`room-${this.props.data.id}-input`) as HTMLInputElement;

		if (input && input.value !== "" && Profile.profileContext)
		{
			await AppContext.sendMessage({
				id		: `${i++}`,
				text	: input.value,
				author: Profile.profileContext?.profile,
				time 	: new Date().getTime(),
				state : State.UNREAD
			});
		}
	};

	render = () => (
		<div className="room-chat">
			<div className="room-chat-header">
				<span>{this.state.user?.status.toString()}</span>
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
				<div className="chat-messages-container">
					{this.state.messages.map(m => <MessageComponent key={m.id} data={m}/>)}
				</div>
			</div>
			<div className="room-chat-footer">
				<div>
					<input
						id={`room-${this.props.data.id}-choose-images`}
						style={{ display : "none" }}
						type="file"
						accept="image/*"
						onChange={async () => {
							const input = document.getElementById(`room-${this.props.data.id}-choose-images`) as HTMLInputElement;

							this.setState({ choosenImages : input?.files });
						}}
						multiple/>
					<button onClick={this.chooseImages}><i className="fas fa-paperclip"/></button>
					<input id={`room-${this.props.data.id}-input`} placeholder="Your message..."/>
					<button onClick={this.sendMessage}><i className="fas fa-paper-plane"/></button>
				</div>
			</div>
		</div>
	);
}