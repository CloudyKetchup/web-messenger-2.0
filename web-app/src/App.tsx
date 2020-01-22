import React, { Component } from 'react';

import LeftPanelComponent from "./components/LeftPanel/LeftPanelComponent";
import RoomComponent 			from "./components/RoomComponent/RoomComponent";

import { ProfileContextHelpers as Profile } 	from "./helpers/ProfileContextHelpers";
import { AppContextHelpers as AppContext }  	from "./helpers/AppContextHelpers";
import { RoomContextHelpers as RoomContext } 	from "./helpers/RoomContextHelpers";

import { MessagingClient } from './api/MessagingClient';

import './index.css';

export default class App extends Component
{

	componentDidMount = () =>
	{
		AppContext.createContext({ roomSelected : null }, this);
		MessagingClient.init();
	};

	render = () => (
		<div className="main-container">
			<LeftPanelComponent users={Profile.profileContext?.friends || []}/>
			{
				RoomContext.context
				&&
				RoomContext.context.data
				&&
				<RoomComponent data={RoomContext.context.data}/>
			}
		</div>
	);
}
