import React, { Component } from 'react';

import LeftPanelComponent from "./components/LeftPanel/LeftPanelComponent";
import RoomComponent 			from "./components/RoomComponent/RoomComponent";
import SearchComponent 		from "./components/SearchComponent/SearchComponent";
import FriendRequestsPaneComponent from "./components/FriendRequestsPane/FriendRequestsPaneComponent";

import { ProfileContextHelpers as Profile } 	from "./helpers/ProfileContextHelpers";
import { AppContextHelpers as AppContext }  	from "./helpers/AppContextHelpers";
import { RoomContextHelpers as RoomContext } 	from "./helpers/RoomContextHelpers";

import { MessagingClient } from './api/MessagingClient';
import { AccountSocketClient } from "./api/AccountSocketClient";

import { Switch, Route, match } from 'react-router';

import './index.css';

type IProps = {
	match : match
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
		AppContext.createContext({ roomSelected : null }, this);

		MessagingClient.init();
		AccountSocketClient.init();
	};

	toggleFriendRequestsPane = () => this.setState({ friendRequestsPane : !this.state.friendRequestsPane });

	render = () => (
		<div className="main-container">
			<LeftPanelComponent friends={Profile.profileContext?.friends || []} match={this.props.match}/>
			{
				RoomContext.context
				&&
				RoomContext.context.data
				&&
				<RoomComponent room={RoomContext.context}/>
			}
			<Switch>
				<Route path={`${this.props.match.url}/search`} component={SearchComponent}/>
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
		</div>
	);
}