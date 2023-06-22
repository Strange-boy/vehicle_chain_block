import React, { useRef, useState } from "react";
import Loader from "../../Components/loader/Loader.jsx";
import GovNavbar from "../gov_Component/govNavbar/govNavbar.jsx";
import GovFooter from "../gov_Component/govFooter/govFooter.jsx";
import { Link, useNavigate } from "react-router-dom";

// auth page
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//firestore related commands
import { db } from "../../../utils/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";

const GovVerify = () => {
	const navigate = useNavigate();
	//in order to store an array of objects
	const [requestCollection, setRequestCollection] = useState([
		{
			vehicleId: "XX-XX-XX-XXXX",
			sellerName: "Seller guy",
			buyerName: "Buyer Guy",
			sellerId: "seller@test.com",
		},
	]);
	const auth = getAuth();

	//in order to fetch the vehicle id of the owner
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (userExist) => {
			if (userExist) {
				console.log("user is logged in");
				const username = userExist.email;
				//we have to fetch the name based on the username
				const confFromGoverment = query(
					collection(db, "confirmationDetails"),
					where("confFromGov", "==", "PENDING")
				);

				async function fetchUserDetails() {
					//in order to store the array of new requst details
					const newRequestDetails = [];

					const querySnapshot = await getDocs(confFromGoverment);
					querySnapshot.forEach((doc) => {
						// doc.data() is never undefined for query doc snapshots
						const requestDetails = {
							vehicleId: doc.data().vehicleId,
							sellerName: doc.data().sellerName,
							buyerName: doc.data().buyerName,
							sellerId: doc.data().sellerId,
						};

						newRequestDetails.push(requestDetails);
					});

					setRequestCollection(newRequestDetails);
				}

				//in order to set the user details with the defined state
				fetchUserDetails();
			} else {
				console.log("user not logged");
			}
		});

		// Unsubscribe when the component unmounts
		return unsubscribe;
	}, []);
	const onVerifyClick = (vid) => {
		navigate("/govConfirmation", {
			state: { vid },
		});
	};
	return (
		<div className="flex flex-col min-h-screen">
			<div className="">
				<GovNavbar />
			</div>
			<div className="flex-grow ">
				<div className="p-20">
					<h1 className="pb-10 text-2xl text-black font-semibold">
						Verify Documents
					</h1>
					<div>
						{requestCollection.map((request) => (
							<div
								className="mt-5 bg-slate-100 h-20 flex items-center rounded"
								key={request.vehicleId}
							>
								<div className="flex">
									<strong className="pl-14 text-xl">Owner</strong>
									<p className="pl-2 text-xl">{request.sellerName}</p>
								</div>
								<div className="flex">
									<strong className="pl-14 text-xl">Vehicle ID</strong>
									<p className="pl-2 text-xl">{request.vehicleId}</p>
								</div>
								<div className="flex">
									<strong className="pl-14 text-xl">Buyer</strong>
									<p className="pl-2 text-xl">{request.buyerName}</p>
								</div>
								<div className="flex ml-auto px-10">
									<button
										className="text-xl px-10 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
										onClick={() => onVerifyClick(request.vehicleId)}
									>
										Verify
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="mt-auto">
				<GovFooter />
			</div>
		</div>
	);
};

export default GovVerify;
