import { Status } from "./Status";
import { Image } from "./media/Image";

export interface User {
	id : string
	nick : string
	profileImage : Image
	statusQuote : string
	status : Status
}