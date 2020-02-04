import React, { Component } from "react";

import RoomChatComponent 			from "../RoomChatComponent/RoomChatComponent";
import RoomChatInfoComponent	from "../RoomChatInfoComponent/RoomChatInfoComponent";
import { EmptyRoomComponent } from "../EmptyRoomComponent/EmptyRoomComponent";

import RoomContext from "../../context/RoomContext";

import { RoomComponentContext } from "../../util/RoomComponetContext";

import "./room-component.css";

type IProps = {
	room? : RoomContext
};

type IState = {
	empty 	: boolean
	room? 	: RoomContext
};

export default class RoomComponent extends Component<IProps, IState>
{
	state : IState = {
		empty 	: this.props.room === undefined,
		room 		: this.props.room
	};

	componentDidMount = () => RoomComponentContext.getInstance().registerComponent(this);

	render = () => (
		<div className="room-component">
			{
				this.state.room
				?
				<>
					<RoomChatComponent room={this.state.room} />
					<RoomChatInfoComponent room={this.state.room} />
				</>
				:
				<EmptyRoomComponent/>
			}
		</div>
	);
}