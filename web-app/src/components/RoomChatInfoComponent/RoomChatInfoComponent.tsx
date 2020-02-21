import React, { Component, FC } from "react";

import RoomContext from "../../context/RoomContext";

import { RoomComponentContext } from "../../util/RoomComponetContext";

import { ReactComponent as UserSvg } from "../../assets/user.svg";
import { ReactComponent as PictureSvg } from "../../assets/picture.svg";

import "./room-chat-info-component.css";

type IProps = { room : RoomContext };

const Separator : FC = () => <div className="room-chat-info-separator"/>;

export default class RoomChatInfoComponent extends Component<IProps>
{
	componentDidMount = () =>
	{
		RoomComponentContext.getInstance().registerComponent(this);
	};

	render = () => (
		<div style={{
			paddingTop : "1%",
			paddingBottom : "1%",
			marginLeft : 20
		}}>
			<div className="room-chat-info">
				<div className="chat-info-user">
					<div>
						<div className="chat-info-user-photo">
							{
								this.props.room.user?.profileImage?.id
									?
									<img src={`http://localhost:8080/image/get?id=${this.props.room.user.profileImage.id}`} alt=""/>
									:
									<UserSvg/>
							}
						</div>
						<div className="chat-info-data">
							<div>
								<span>Chat info</span>
							</div>
							<div>
								<span>{this.props.room.user?.nick || "???"}</span>
							</div>
						</div>
					</div>
					<div style={{ display : "flex" }}>
						<div style={{ width : "-webkit-fill-available" }}/>
							<div className="chat-info-stats">
								<span>{this.props.room.data?.messages.length} Messages</span>
								<span>0 Images</span>
								<span>0 Documents</span>
							</div>
						</div>
				</div>
				<Separator/>
				<div className="chat-info-images">
					<div>
						<PictureSvg style={{ fill : "#808080", height : 100 }}/>
						<span>Images</span>
					</div>
				</div>
			</div>
		</div>
	);
}