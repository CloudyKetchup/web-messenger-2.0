import React, { Component } from 'react';
import { Switch, Route, match } from 'react-router';

import LeftPanelComponent from "./components/LeftPanel/LeftPanelComponent";
import RoomComponent 			from "./components/RoomComponent/RoomComponent";
import SearchComponent 		from "./components/SearchComponent/SearchComponent";
import UserInfoComponent	from "./components/UserInfoComponent/UserInfoComponent";
import { NotificationPad }from "./components/Notification/NotificationPad/NotificationPad"
import FriendRequestsPaneComponent from "./components/FriendRequestsPane/FriendRequestsPaneComponent";

import { ProfileContextHelpers as Profile } 	from "./helpers/ProfileContextHelpers";
import { RoomContextHelpers as RoomContext } 	from "./helpers/RoomContextHelpers";

import * as PageEvents from "./util/events/PageEvents";

import { MessagingClient } from './api/MessagingClient';
import { AccountSocketClient } from "./api/AccountSocketClient";

import { History } from "history";

import './index.css';

type IProps = {
	match    : match
	history  : History
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
		this.initSockets();

		PageEvents.initExitListener();
	};

  initSockets = () =>
  {
    MessagingClient.getInstance().init();
		AccountSocketClient.getInstance().init();
  };

	toggleFriendRequestsPane = () => this.setState({ friendRequestsPane : !this.state.friendRequestsPane });

	render = () => (
		<div className="main-container">
			<LeftPanelComponent friends={Profile.profileContext?.friends || []}/>
			<RoomComponent room={RoomContext.context} />
			<Switch>
				<Route path={`${this.props.match.url}/search`} component={SearchComponent}/>
				<Route path={`${this.props.match.url}/user/info`} component={UserInfoComponent}/>
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
