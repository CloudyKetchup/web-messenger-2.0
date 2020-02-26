import { Component } from "react";

import { BaseSnackbarInfo } from "../../model/snackbar/BaseSnackbarInfo";

export type AuthPageState = { snackbars : BaseSnackbarInfo[] };

let snackbarId = 0;

export abstract class AuthPageComponent<P, S extends AuthPageState> extends Component<P, AuthPageState>
{
	state : AuthPageState = {
		snackbars : []
	};

	errorAlert = async (text : string = "error occurred") =>
	{
		const snackbars = this.state.snackbars;

		snackbars.push({ id : snackbarId++, text : text, severity : "error" });

		this.setState({ snackbars : snackbars });
	};

	removeAlert = async (id : number) =>
	{
		const snackbars = this.state.snackbars;

		snackbars.splice(snackbars.findIndex(s => s.id === id), 1);

		this.setState({ snackbars : snackbars });
	};
}