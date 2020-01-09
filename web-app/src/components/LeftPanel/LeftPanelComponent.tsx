import React, { Component } from "react";

import ListUserComponent from "../ListUserComponent/ListUserComponent";

import { User } from "../../model/User";

import "./list-panel-component.css";

type IProps = { users: User[] };

export default class LeftPanelComponent extends Component<IProps> {

	render = () => (
		<div className="left-panel">
			<div className="people-pane">
				{this.props.users.map(user => <ListUserComponent key={user.id} data={user} />)}
			</div>
			<div className="left-panel-control-buttons">
				<div>
					<button><i className="fas fa-plus" /></button>
					<button><i className="fas fa-search" /></button>
				</div>
			</div>
		</div>
	);
}
