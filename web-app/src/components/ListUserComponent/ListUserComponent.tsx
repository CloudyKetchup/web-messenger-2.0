import React, { Component } from "react";

import { User } from "../../model/User";
import { Status } from "../../model/Status";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import { Room } from "../../model/Room";

import { RoomContextHelpers } from "../../helpers/RoomContextHelpers";

import "./list-user-component.css";
import { AccountClient } from "../../api/AccountClient";

type IProps = {
	data : User
};

type IState = {
	selected : boolean
};

export default class ListUserComponent extends Component<IProps> {
	state : IState = {
		selected : false
	};

	room : Room | undefined;

	statusColor = () : string => {
		switch (this.props.data.status) {
			case Status.ONLINE:
				return "#35CE8D";
			case Status.OFFLINE:
				return "#EA4343";
			case Status.DO_NOT_DISTURB:
				return "#faa628";
			default: return "unset";
		}
	};

	selectUser = async () => {
		if (Profile.profileContext)
		{
			// if room already selected stop;
			if (this.room && this.room.id === RoomContextHelpers.context?.data?.id) return;

			if (!this.room)
			{
				this.room = await AccountClient.getFriendRoom(Profile.profileContext.profile.id, this.props.data.id);
			}
			if (this.room)
			{
				const room = Profile.findRoomById(this.room.id);

				!room && Profile.addRoom(this.room);

				RoomContextHelpers.changeRoom({
					data: this.room,
					user: this.props.data,
					stats: undefined // TODO: get stats from backend
				});
			}
		}
	};

	render = () => (
		<div className="list-user" onClick={this.selectUser}>
			<div className="list-user-background">
				<div className="list-user-focus"/>
				<div className="list-user-info">
					<div className="list-user-photo">
						<img src="https://images-na.ssl-images-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg" alt=""/>
					</div>
					<div>
						<div className="list-user-nick">
							<span style={{ color : this.state.selected ? "white" : "#a9a9a9", fontSize : 15 }}>
								{this.props.data.nick}
							</span>
						</div>
						<div className="list-user-last-message">
							<span style={{ color : "gray", fontSize : 13, marginLeft : 5 }}>
								Last message
							</span>
						</div>
					</div>
					<div className="list-user-status">
						<div style={{ background : this.statusColor() }}/>
					</div>
				</div>
			</div>
		</div>
	);
}
