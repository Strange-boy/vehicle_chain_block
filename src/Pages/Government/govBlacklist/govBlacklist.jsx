import React from "react";
import GovNavbar from "../gov_Component/govNavbar/govNavbar.jsx";
import GovFooter from "../gov_Component/govFooter/govFooter.jsx";

const GovBlacklist = () => {
	return (
		<div>
			<GovNavbar />
			<div className="m-7 mx-10 rounded-md border border-slate-200 p-20 shadow-xl min-h-screen">
				<label htmlFor="" className="mt-5 block text-xl">
					Vehicle ID <span className="text-red-600">*</span>
				</label>
				<input
					className="mt-2 rounded-md border border-slate-600 py-1 px-3 text-xl outline-none"
					type="text"
					value=""
					id="vehicleid"
					placeholder="KL-12-AB-2020"
				/>
				<button className="mt-5 block h-10 w-40 rounded-md bg-slate-800 text-xl text-white">
					Verify
				</button>
				<br />
				<div>
					<label htmlFor="" className=" mt-5 text-xl">
						Is Blacklisted? <span className="text-red-600">*</span>
					</label>
					<input
						type="radio"
						id="no"
						className="ml-10"
						name="blackListed"
						value="No"
					/>
					<label htmlFor="no" className="p-3 text-xl">
						No
					</label>
					<input
						type="radio"
						id="yes"
						className="ml-10"
						name="blackListed"
						value="Yes"
					/>
					<label htmlFor="yes" className="p-3 text-xl">
						Yes
					</label>
					<br />
					<button className="mt-11 rounded-md bg-slate-800 text-xl text-white p-2 px-11">
						Submit
					</button>
				</div>
				<br />
			</div>
			<GovFooter />
		</div>
	);
};

export default GovBlacklist;
