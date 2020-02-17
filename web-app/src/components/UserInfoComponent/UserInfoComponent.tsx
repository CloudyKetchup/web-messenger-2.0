import React, { Component, FC, CSSProperties } from "react";
import { Link } from "react-router-dom";

import { AccountClient } from "../../api/AccountClient";

import { User } from "../../model/User";

import queryString from "query-string";

import { CircularProgress } from "@material-ui/core";

import { ReactComponent as CloseIcon } 	from "../../assets/close.svg";
import { ReactComponent as UserIcon } 	from "../../assets/user.svg";
import AnimeThinking 										from "../../assets/anime-thinking.png";

import "./user-info-component.css";

type IState = {
	loading : boolean,
	data : User | undefined
};

export default class UserInfoComponent extends Component<{}, IState>
{
	state : IState = {
		loading : true,
		data : undefined
	};

	componentDidMount = async () =>
	{
		const query = queryString.parse(window.location.search);
		const id 		= query.id as string;

		if (id)
		{
			const user = await AccountClient.findById(id);

			user && this.setState({ data : user, loading : false });
		} else this.setState({ loading : false });
	};

	CloseButton = (style? : CSSProperties) => (
		<Link to="/chat" style={style}>
			<CloseIcon style={{
				fill 				: "white",
				background 	: "black",
				height 			: 25,
				width 			: 25
			}}/>
		</Link>
	);

	Info : FC<User> = props => (
		<div className="user-info">
			<div style={{ position : "relative" }}>
				<div id="user-info-image">
					{
						props.profileImage
						?
						<img src={`http://localhost:8080/image/get?id=${props.profileImage.id}`} alt=""/>
						:
						<UserIcon/>
					}
				</div>
				<div id="user-info-grid">
					<div>
						{props.nick}
					</div>
				</div>
				{this.CloseButton({
					background 	: "transparent",
					left 				: 0,
					right 			: 0,
					margin 			: "auto",
					bottom 			: -100,
					position 		: "absolute"
				})}
			</div>
		</div>
	);

	EmptyPane : FC = () => (
		<div className="user-info-empty">
			<div id="user-info-empty-content">
				<div style={{ width : "100%", marginBottom : 40 }}>
					<img src={AnimeThinking}/>
				</div>
				<span>Nothing here</span>
			</div>
			{this.CloseButton()}
		</div>
	);

	Loading : FC = () => (
		<div className="user-info-loading">
			<CircularProgress
				style={{ color : "white" }}
				color="inherit"
			/>
		</div>
	);

	render = () => (
		<div className="user-info-pane">
			{
				this.state.loading
				?
				<this.Loading/>
				:
				this.state.data
				?
				<this.Info {...this.state.data}/>
				:
				<this.EmptyPane/>
			}
		</div>
	);
}