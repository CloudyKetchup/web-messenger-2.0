import React, { Component } from "react";

import { Link } from "react-router-dom";

import ListUserComponent from "../ListUserComponent/ListUserComponent";

import { User } from "../../model/User";

import { LeftPanelComponentContext } from "../../util/LeftPanelComponentContext";
import { ProfileContextHelpers } from "../../helpers/ProfileContextHelpers";

import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";

import "./left-panel-component.css";

type ICommon = { friends : User[] };

export default class LeftPanelComponent extends Component<ICommon, ICommon>
{
	state : ICommon = {
		friends : this.props.friends
	};

	searchInput : HTMLInputElement | null = null;

	componentDidMount = () => LeftPanelComponentContext.getInstance().registerComponent(this);

	searchUser = async () =>
	{
		if (!this.searchInput)
		{
			this.searchInput = document.getElementById("friends-search-input") as HTMLInputElement;
		} else if (this.searchInput)
		{
			const input = this.searchInput.value;

			if (input.length > 3)
			{
				const friends = ProfileContextHelpers.searchFriends(input);

				friends && friends.length > 0 && this.setState({ friends : friends });
			} else
			{
				this.setState({ friends : ProfileContextHelpers?.profileContext?.friends || [] });
			}
		}
	};

	render = () => (
		<div style={{ paddingTop : "0.5%" }}>
			<div className="left-panel">
				<div className="left-panel-search">
					<div>
						<div id="left-panel-search-icon">
							<SearchIcon style={{ fill : "gray", height : "100%", width : "100%" }}/>
						</div>
						<div id="left-panel-search-input">
							<input
                onChange={this.searchUser}
                placeholder="search"
                id="friends-search-input"
                autoComplete="off"
              />
						</div>
					</div>
				</div>
				<div className="people-pane">
					{this.state.friends
						.sort((f1, f2) => f1.nick.localeCompare(f2.nick))
						.map(user => <ListUserComponent key={user.id} {...user}/>)}
				</div>
				<div className="left-panel-footer">
					<div>
						<Link to="/chat/search"><i style={{ color : "white" }} className="fas fa-plus"/></Link>
					</div>
				</div>
			</div>
		</div>
	);
}
