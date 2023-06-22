import React from "react";
import GovNavbar from "../gov_Component/govNavbar/govNavbar.jsx";
import GovFooter from "../gov_Component/govFooter/govFooter.jsx";
// Import Link to route to other pages
import { Link } from "react-router-dom";
import Image from "../../assets/vehicle.png";
import Loader from "../../Components/loader/Loader.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { appAuth } from "../../../utils/firebase.js";

const GovWelcome = () => {
	const loginRoute = "/login";
	const blacklistRoute = "/govConfirmation";
	const [currUser, loading] = useAuthState(appAuth);
	const govUid = "GHHYwlHErhdC84sKe3MmseCKqvv1";

	if (loading) {
		return <Loader />;
	} else if (currUser.uid !== govUid) {
		window.location.pathname = loginRoute;
	}

	return (
		<div className="">
			{/* Import the navbar component */}
			<div className="mb-5">
				<GovNavbar />
			</div>
			<div className="min-h-screen">
				{/* Content and image part of the welcome page */}
				<div className="md:flex">
					{/* Image */}

					{/* Content */}
					<div className="md:w-1/2">
						<h1 className=" my-4 p-6 text-3xl font-black">
							Trust Through Transparency
						</h1>
						<p
							className="p-6
                    text-justify text-xl"
						>
							Our system is designed to provide secure and efficient maintenance
							of vehicle registration records through the use of cutting-edge
							blockchain technology. With our system, you can be confident that
							your vehicle registration data is protected from tampering and
							unauthorized access.
						</p>
					</div>
					{/* Image */}
					<div className="md:w-1/2">
						<img src={Image} alt="vehicle" className="mr-0 w-3/4" />
					</div>
				</div>

				{/* Two functionalities - View registration certificate and change ownership */}
				<div className="w-full md:flex">
					{/* Registration certificate */}

					<div className="w-1/2 p-5">
						<button
							onClick={() => {
								window.location.pathname = "/govIssue";
							}}
							className="w-full border border-slate-800 pt-2 pb-20 pl-2 text-left font-semibold"
						>
							Issue Registration Certificate
						</button>
					</div>

					{/* Change ownership */}
					<div className="w-1/2 p-5">
						<button
							onClick={() => {
								window.location.pathname = "/govverify";
							}}
							className=" w-full border border-slate-800 pt-2 pb-20 pl-2 text-left font-semibold"
						>
							Title Verification
						</button>
					</div>
				</div>
				<div className="md:mx-auto flex">
					<Link to="/govFine" className="w-full p-5">
						<button className="w-full border border-slate-800 pt-2 pb-20 pl-2 text-left font-semibold">
							Record Fine
						</button>
					</Link>
					<Link to="/govBlacklist " className="w-full p-5">
						<button className="w-full border border-slate-800 pt-2 pb-20 pl-2 text-left font-semibold">
							Blacklist a vehicle
						</button>
					</Link>
				</div>
			</div>
			{/* Import the footer component  */}
			<div className="">
				<GovFooter />
			</div>
		</div>
	);
};

export default GovWelcome;
