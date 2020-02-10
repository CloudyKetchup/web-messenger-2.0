import React, { Component, FC } from "react";

import RoomContext from "../../context/RoomContext";

import { RoomComponentContext } from "../../util/RoomComponetContext";

import "./room-chat-info-component.css";

import UserSvg 		from "../../assets/user.svg";
import DeleteChat from "../../assets/delete-message.svg";

type IProps = {
	room : RoomContext
};

const Separator : FC = () => <div className="room-chat-info-separator"/>;

export default class RoomChatInfoComponent extends Component<IProps>
{
	componentDidMount = () =>
	{
		RoomComponentContext.getInstance().registerComponent(this);
	};

	render = () => (
		<div className="room-chat-info">
			<div className="room-chat-info-header">
				<span>Chat info</span>
			</div>
			<Separator/>
			<div className="room-chat-info-user">
				<div>
					<div id="room-chat-info-user-photo">
						{
							this.props.room.user?.profileImage?.id
							?
							<img src={`http://localhost:8080/image/get?id=${this.props.room.user.profileImage.id}`} alt="" />
							:
							<img src={UserSvg} alt=""/>
						}
					</div>
					<div>
						<span>{this.props.room.user?.nick}</span>
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
					<img src={DeleteChat} alt=""/>
					<span>Delete Chat</span>
				</button>
			</div>
			<Separator/>
			<div className="room-chat-info-files">
			</div>
		</div>
	);
}