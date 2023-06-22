import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

const NegativeStatus = () => {
	return (
		// All possible comments
		// Title change request rejected.
		// Title change request timed out.
		<div className="mx-7 mt-7 flex items-center rounded-md bg-slate-100 p-5 text-xl">
			<FontAwesomeIcon icon={faTimesCircle} className="px-3" />
			<p className="">Title change request not submitted</p>
		</div>
	);
};
export default NegativeStatus;
