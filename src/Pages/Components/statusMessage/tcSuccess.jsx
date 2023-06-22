import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

const TitleChangeSuccessful = () => {
	return (
		// All possible comments
		// Title change request approved.
		// Title change completed successfully.
		// Title change request submitted successfully.
		<div className="mx-7 mt-7 flex items-center rounded-md bg-slate-100 p-5 text-xl">
			<FontAwesomeIcon icon={faCheckCircle} className="px-3" />
			<p className="">
				Title change request has been approved by the Government and Buyer
			</p>
		</div>
	);
};
export default TitleChangeSuccessful;
