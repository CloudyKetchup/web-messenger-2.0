import React, { Component } from 'react';

import LeftPanelComponent from "./components/LeftPanel/LeftPanelComponent";
import { Status } from "./model/Status";

import './index.css';

export default class App extends Component {

	render = () => (
		<div className="main-container">
			<LeftPanelComponent users={[
				{
					id : "1",
					nick : "loli master",
					status : Status.ONLINE
				},
				{
					id : "2",
					nick : "kojima",
					status : Status.OFFLINE
				}
			]}/>
		</div>
	);
}
