import React, { Component, FC } from "react";

import { Room } from "../../model/Room";

import "./room-chat-info-component.css";

import UserSvg 		from "../../assets/user.svg";
import DeleteChat from "../../assets/delete-message.svg";

type IProps = {
	data : Room
};

const Separator : FC = () => <div className="room-chat-info-separator"/>;

export default class RoomChatInfoComponent extends Component<IProps> {

	render = () => (
		<div className="room-chat-info">
			<div className="room-chat-info-header">
				<span>Chat info</span>
			</div>
			<Separator/>
			<div className="room-chat-info-user">
				<div>
					<div id="room-chat-info-user-photo">
						<img src={UserSvg}/>
					</div>
					<div>
						<span>Hideo Kojima</span>
					</div>
				</div>
				<div>
					<span>321 Messages</span>
					<span>136 Images</span>
					<span>3 Documents</span>
				</div>
			</div>
			<Separator/>
			<div className="room-chat-info-control">
				<button>
					<i className="fas fa-user-minus"/>
					<span>Delete User</span>
				</button>
				<button>
					<img src={DeleteChat}/>
					<span>Delete Chat</span>
				</button>
			</div>
			<Separator/>
			<div className="room-chat-info-files">
			</div>
		</div>
	);
}