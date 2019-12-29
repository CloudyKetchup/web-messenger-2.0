import React, { Component } from "react";

import { User } from "../../model/User";
import ListUserComponent from "../ListUserComponent/ListUserComponent";

import "./list-panel-component.css";

type IProps = {
	users : User[]
};

type IState = {

};

export default class LeftPanelComponent extends Component<IProps, IState> {
	state : IState = {};

	render = () => (
		<div className="left-panel">
			<div className="people-pane">
				{this.props.users.map(user => <ListUserComponent data={user}/>)}
			</div>
			<div className="left-panel-control-buttons">
				<div>
					<button><i className="fas fa-plus"/></button>
					<button><i className="fas fa-search"/></button>
				</div>
			</div>
		</div>
	);
}
