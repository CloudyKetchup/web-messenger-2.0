import React, { Component } from "react";

import { Link, match } from "react-router-dom";

import ListUserComponent from "../ListUserComponent/ListUserComponent";

import { User } from "../../model/User";

import "./list-panel-component.css";
import { AppContextHelpers } from "../../helpers/AppContextHelpers";

type IProps = {
	friends : User[]
	match : match
};

type IState = { friends : User[] };

export default class LeftPanelComponent extends Component<IProps> {
	state : IState = {
		friends : this.props.friends
	};

	componentDidMount = () =>
	{
		AppContextHelpers.registerComponent(this);
	};

	render = () => (
		<div className="left-panel">
			<div className="people-pane">
				{this.state.friends.map(user => <ListUserComponent key={user.id} data={user} />)}
			</div>
			<div className="left-panel-control-buttons">
				<div>
					<button><i className="fas fa-plus" /></button>
					<Link to={`${this.props.match.url}/search`}><i className="fas fa-search" /></Link>
				</div>
			</div>
		</div>
	);
}
