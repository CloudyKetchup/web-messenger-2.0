import React, { Component } from "react";

import { User } from "../../model/User";
import { Status } from "../../model/Status";

import { AppContextHelpers as AppContext } from "../../helpers/AppContextHelpers";
import { ProfileContextHelpers as Profile } from "../../helpers/ProfileContextHelpers";

import { Room } from "../../model/Room";

import "./list-user-component.css";

type IProps = {
	data : User
};

type IState = {
	selected : boolean
};

let i = 0;

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
			// TODO: work with backend
			if (!this.room)
			{
				this.room = {
					id: `${i++}`,
					users: [this.props.data, Profile.profileContext.profile],
					messages: [],
					images: 0,
					documents: 0,
					group: false
				};
			}
			if (!Profile.roomExist(this.room))
			{
				Profile.addRoom(this.room);
			}
			const r = ProfileContext.findRoomById(this.room.id);

			r && AppContext.changeRoom(r);
		}
	};

	render = () => (
		<div className="list-user" onClick={this.selectUser}>
			<div className="list-user-background">
				<div className="list-user-focus"/>
				<div className="list-user-info">
					<div className="list-user-photo">
						<img src="https://images-na.ssl-images-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg"/>
					</div>
					<div className="list-user-nick">
						<span style={{ color: this.state.selected ? "white" : "#a9a9a9" }}>
							{this.props.data.nick}
						</span>
					</div>
					<div className="list-user-status">
						<div style={{ background : this.statusColor() }}/>
					</div>
				</div>
			</div>
		</div>
	);
}
