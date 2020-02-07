import React, { Component } from "react";

import { User } 	from "../../model/User";
import { Status } from "../../model/Status";
import { Room } 	from "../../model/Room";

import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";
import { RoomContextHelpers } from "../../helpers/RoomContextHelpers";

import { AccountClient } from "../../api/AccountClient";

import { LeftPanelComponentContext } from "../../util/LeftPanelComponentContext";

import "./list-user-component.css";

type IProps = { data : User };

type IState = {
	data : User
	selected : boolean
};

export default class ListUserComponent extends Component<IProps>
{
	state : IState = {
		data : this.props.data,
		selected : false
	};

	room : Room | null = null;

	componentDidMount = () =>
	{
		LeftPanelComponentContext.getInstance().registerComponent(this);
	};

	statusColor = () : string =>
	{
		switch (this.state.data.status)
		{
			case Status.ONLINE:
				return "#35CE8D";
			case Status.OFFLINE:
				return "#EA4343";
			case Status.DO_NOT_DISTURB:
				return "#faa628";
			default: return "unset";
		}
	};

	selectUser = async () =>
	{
		if (Profile.profileContext)
		{
			// if room already selected stop;
			if (this.room && this.room.id === RoomContextHelpers.context?.data?.id) return;

			if (!this.room)
			{
				this.room = await AccountClient.getFriendRoom(Profile.profileContext.profile.id, this.state.data.id);
			}
			if (this.room)
			{
				const room = Profile.findRoomById(this.room.id);

				!room && Profile.addRoom(this.room);

				RoomContextHelpers.changeRoom({
					data: this.room,
					user: this.state.data,
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
								{this.state.data.nick}
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
