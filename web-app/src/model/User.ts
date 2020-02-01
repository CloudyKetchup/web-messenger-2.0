import { Status } from "./Status";

export interface User {
	id : string
	nick : string
	profileImage : string | null
	statusQuote : string
	status : Status
}