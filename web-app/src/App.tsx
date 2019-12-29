import React, { Component } from 'react';

import LeftPanelComponent 									from "./components/LeftPanel/LeftPanelComponent";
import RoomComponent 												from "./components/RoomComponent/RoomComponent";

import { ProfileContextHelpers as Profile } from "./helpers/ProfileContextHelpers";
import { AppContextHelpers as AppContext }  from "./helpers/AppContextHelpers";

import './index.css';

export default class App extends Component {

	componentDidMount = () => {
		AppContext.createContext({
			roomSelected : null
		}, this);
	};

	render = () => (
		<div className="main-container">
			<LeftPanelComponent users={Profile.profileContext?.friends || []}/>
			{
				AppContext.context?.roomSelected
				&&
				<RoomComponent data={AppContext.context.roomSelected}/>
			}
		</div>
	);
}
