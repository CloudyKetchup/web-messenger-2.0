import React, { Component } from "react";

import RoomChatComponent 			from "../RoomChatComponent/RoomChatComponent";
import RoomChatInfoComponent	from "../RoomChatInfoComponent/RoomChatInfoComponent";

import { Room } from "../../model/Room";

import { RoomContextHelpers as RoomContext } from "../../helpers/RoomContextHelpers";

import "./room-component.css";

type IProps = {
	data : Room
};

export default class RoomComponent extends Component<IProps> {

	componentDidMount = () => {
		RoomContext.registerComponent(this);
	}

	render = () => (
		<div className="room-component">
			<RoomChatComponent data={this.props.data}/>
			<RoomChatInfoComponent/>
		</div>
	);
}