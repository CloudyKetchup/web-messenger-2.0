import React, { Component } from "react";

import { User } from "../../model/User";
import { Message, State } from "../../model/Message";

import RoomContext from "../../context/RoomContext";

import { ProfileContextHelpers as Profile } 	from "../../helpers/ProfileContextHelpers";
import { AppContextHelpers as AppContext } 		from "../../helpers/AppContextHelpers";

import MessageComponent from "../MessageComponent/MessageComponent";

import { RoomComponentContext } from "../../util/RoomComponetContext";

import "./room-chat-component.css";

type IProps = { room : RoomContext };

type IState = {
	choosenImages : FileList | null
	user 					: User | undefined
	typing 				: boolean
	messages 			: Message[]
};

let i = 0;

export default class RoomChatComponent extends Component<IProps, IState> {
	state : IState = {
		choosenImages : null,
		user 					: this.props.room.user,
		typing 				: true,
		messages 			: this.props.room.data?.messages || []
	};

	componentDidMount = async () => {
		// register this component to be updated on room context update
		RoomComponentContext.getInstance().registerComponent(this);
	};

	chooseImages = async () => {
		if (this.props.room.data)
		{
			const input = document.getElementById(`room-${this.props.room.data.id}-choose-images`);

			input && input.click();
		}
	};

	sendMessage = async () => {
		if (this.props.room.data)
		{
			const input = document.getElementById(`room-${this.props.room.data.id}-input`) as HTMLInputElement;

			if (input && input.value !== "" && Profile.profileContext)
			{
				await AppContext.sendMessage({
					id: `${i++}`,
					text: input.value,
					author: Profile.profileContext?.profile,
					time: new Date().getTime(),
					state: State.UNREAD
				});
			}
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
						id="room-choose-images"
						style={{ display : "none" }}
						type="file"
						accept="image/*"
						onChange={async () => {
							const input = document.getElementById("room-choose-images") as HTMLInputElement;

							this.setState({ choosenImages : input?.files });
						}}
						multiple/>
					<button onClick={this.chooseImages}><i className="fas fa-paperclip"/></button>
					<input id={`room-${this.props.room.data?.id}-input`} placeholder="Your message..."/>
					<button onClick={this.sendMessage}><i className="fas fa-paper-plane"/></button>
				</div>
			</div>
		</div>
	);
}