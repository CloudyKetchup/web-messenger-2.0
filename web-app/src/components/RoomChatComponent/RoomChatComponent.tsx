import React, { Component } from "react";

import { Room } from "../../model/Room";
import { User } from "../../model/User";
import { Message } from "../../model/Message";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";
import { AppContextHelpers as AppContext } from "../../helpers/AppContextHelpers";

import "./room-chat-component.css";

type IProps = {
	data : Room
};

type IState = {
	choosenImages : FileList | null
	user 					: User | null
	typing 				: boolean
};

export default class RoomChatComponent extends Component<IProps> {
	state : IState = {
		choosenImages : null,
		user 					: null,
		typing 				: true
	};

	componentDidMount = async () => {
		const user = this.props.data.users.filter(u => u.id !== Profile.profileContext?.profile.id)[0];

		user && this.setState({ user : user });
	};

	chooseImages = async () => {
		const input = document.getElementById(`room-${this.props.data.id}-choose-images`);

		input && input.click();
	};

	sendMessage = async () => {
		const input = document.getElementById(`room-${this.props.data.id}-input`) as HTMLInputElement;

		if (input && input.value !== "" && Profile.profileContext) {
			await AppContext.sendMessage({
				id: "1",
				text: input.value,
				author: Profile.profileContext?.profile,
				time : new Date().getTime()
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
				<div>
					<input
						placeholder="search..."
					/>
				</div>
			</div>
			<div className="room-chat-body">
				<div className="chat-messages-container">
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