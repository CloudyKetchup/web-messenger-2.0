import React, { Component } from "react";

import RoomChatComponent 			from "../RoomChatComponent/RoomChatComponent";
import RoomChatInfoComponent	from "../RoomChatInfoComponent/RoomChatInfoComponent";

import RoomContext from "../../context/RoomContext";

import { RoomComponentContext } from "../../util/RoomComponetContext";

import "./room-component.css";

type IProps = {
	room : RoomContext
};

type IState = {
	room : RoomContext
};

export default class RoomComponent extends Component<IProps, IState> {
	state : IState = {
		room : this.props.room
	};

	componentDidMount = () => {
		RoomComponentContext.getInstance().registerComponent(this);
	}

	render = () => (
		<div className="room-component">
			<RoomChatComponent room={this.state.room}/>
			<RoomChatInfoComponent room={this.state.room}/>
		</div>
	);
}