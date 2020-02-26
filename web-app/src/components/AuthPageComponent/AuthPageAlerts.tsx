import React, { FC } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert/Alert";

import { BaseSnackbarInfo } from "../../model/snackbar/BaseSnackbarInfo";

type IProps = {
	alerts : BaseSnackbarInfo[]
	onClose : (alert : BaseSnackbarInfo) => void
};

export const AuthPageAlerts : FC<IProps> = props => (
	<div id="notifications">
		{
			props.alerts.map(alert =>
				<Snackbar
					key={alert.id}
					open
					autoHideDuration={3000}
					onClose={() => props.onClose(alert)}
				>
					<Alert key={alert.id} severity={alert.severity}>{alert.text}</Alert>
				</Snackbar>
			)
		}
	</div>
);