import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

const ApprovalWaiting = () => {
	return (
		// All possible comments
		// Title change request rejected.
		// Title change request timed out.
		<div className="mx-7 mt-7 flex items-center rounded-md bg-slate-100 p-5 text-xl">
			<FontAwesomeIcon icon={faTimesCircle} className="px-3" />
			<p className="">
				Please wait for the approval from the government authority
			</p>
		</div>
	);
};
export default ApprovalWaiting;
