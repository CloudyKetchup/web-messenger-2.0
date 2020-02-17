import React, { Component } from 'react';

import LeftPanelComponent from "./components/LeftPanel/LeftPanelComponent";
import RoomComponent 			from "./components/RoomComponent/RoomComponent";
import SearchComponent 		from "./components/SearchComponent/SearchComponent";
import UserInfoComponent	from "./components/UserInfoComponent/UserInfoComponent";
import FriendRequestsPaneComponent from "./components/FriendRequestsPane/FriendRequestsPaneComponent";
import { NotificationPad } from "./components/Notification/NotificationPad/NotificationPad"

import { ProfileContextHelpers as Profile } 	from "./helpers/ProfileContextHelpers";
import { AppContextHelpers as AppContext }  	from "./helpers/AppContextHelpers";
import { RoomContextHelpers as RoomContext } 	from "./helpers/RoomContextHelpers";

import { MessagingClient } from './api/MessagingClient';
import { AccountSocketClient } from "./api/AccountSocketClient";

import { Switch, Route, match } from 'react-router';

import { History } from "history";

import * as PageEvents from "./util/events/PageEvents";

import './index.css';

type IProps = {
	match : match
	history : History
};

type IState = {
	friendRequestsPane : boolean
};

export default class App extends Component<IProps, IState>
{
	state : IState = {
		friendRequestsPane : false
	};

	componentDidMount = () =>
	{
		if (!Profile.profileContext)
		{
			this.props.history.push("/login");
		}
		AppContext.createContext({ roomSelected : null }, this);

		MessagingClient.getInstance().init();
		AccountSocketClient.getInstance().init();

		PageEvents.initExitListener();
	};

	toggleFriendRequestsPane = () => this.setState({ friendRequestsPane : !this.state.friendRequestsPane });

	render = () => (
		<div className="main-container">
			<LeftPanelComponent friends={Profile.profileContext?.friends || []} match={this.props.match}/>
			<RoomComponent room={RoomContext.context} />
			<Switch>
				<Route path={`${this.props.match.url}/search`} component={SearchComponent}/>
				<Route path={`${this.props.match.url}/user/info`} render={props => <UserInfoComponent {...props}/>}/>
			</Switch>
			{
				!this.state.friendRequestsPane
				?
				<button
					id="friend-requests-pane-toggle"
					style={{ color : "white" }}
					onClick={this.toggleFriendRequestsPane}
				>
					<i className="fas fa-user-plus"/>
				</button>
				:
				<FriendRequestsPaneComponent
					requests={Profile.profileContext?.friendRequests || []}
					close={this.toggleFriendRequestsPane}
				/>
			}
			<NotificationPad app={this}/>
		</div>
	);
}