import React, { Component } from "react";

import { User } from "../../model/User";
import { Status } from "../../model/Status";

import "./list-user-component.css";

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

	render = () => (
		<div className="list-user">
			<div className="list-user-background">
				<div className="list-user-focus"/>
				<div className="list-user-info">
					<div className="list-user-photo">
						<img src="https://images-na.ssl-images-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg"/>
					</div>
					<div className="list-user-nick">
						<span style={{ color : this.state.selected ? "white" : "#a9a9a9" }}>Loli Master</span>
					</div>
					<div className="list-user-status">
						<div style={{ background : this.statusColor() }}/>
					</div>
				</div>
			</div>
		</div>
	);
}
