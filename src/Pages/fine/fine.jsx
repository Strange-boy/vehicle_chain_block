import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Components/navbar/navbar";
import Loader from "../Components/loader/Loader";
import Footer from "../Components/footer/footer";

// auth page
import { useAuthState } from "react-firebase-hooks/auth";
import { appAuth } from "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//firestore related commands
import { db } from "../../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Fine = () => {
	const [vehicleId, setVehicleId] = useState("");
	const [violations, setViolations] = useState([
		{ violationStatement: "No Violations", amountCharged: 0 },
	]);
	const [currUser, loading] = useAuthState(appAuth);
	const govUid = "GHHYwlHErhdC84sKe3MmseCKqvv1";
	const routeLoginPage = "./login";

	const auth = getAuth();

	//in order to fetch the vehicle id of the owner
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (userExist) => {
			if (userExist) {
				console.log("user is logged in");
				const username = userExist.email;
				//we have to fetch the name based on the username
				const userDetails = query(
					collection(db, "users"),
					where("Username", "==", username)
				);

				async function fetchUserDetails() {
					const querySnapshot = await getDocs(userDetails);
					querySnapshot.forEach((doc) => {
						// doc.data() is never undefined for query doc snapshots
						setVehicleId(doc.data().VehicleId);
					});
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

	//in order to find the fine charged
	function showFineCharged() {
		//in order to check in the fire store whether the assosciated user exist or not
		const userRef = collection(db, "fineDetails");
		const userExist = query(userRef, where("vehicleId", "==", vehicleId));

		const userValidation = async () => {
			const querySnapshot = await getDocs(userExist);

			if (querySnapshot.size > 0) {
				querySnapshot.forEach((currdoc) => {
					// Step 3: Modify the array locally
					const fineDetails = currdoc.data().fineInfo || []; // If the array field is empty or doesn't exist yet
					setViolations(fineDetails);
					// fineDetails.map((items) => {
					// 	console.log("violation:", items.violationStatement);
					// 	console.log("Amount charged:", items.amountCharged);
					// });
				});
			} else {
				alert("No fine charged so far !!");
			}
		};

		//in order to check whether a document exists or not
		userValidation();
	}

	//to be shown during loading
	if (loading) return <Loader />;
	//to be show if the user doesn't logs in
	else if (!currUser || currUser.uid === govUid)
		window.location.pathname = routeLoginPage;
	//if the user logs in successfully
	else
		return (
			<div className="">
				<div className="">
					<Navbar />
				</div>
				<div className="min-h-screen">
					<label htmlFor="" className="block text-xl mt-10 ml-10">
						Registration Number <span className="text-red-600">*</span>
					</label>
					<input
						className="mt-5 ml-10 rounded-md border border-slate-600 py-1 px-3 text-xl outline-none"
						type="text"
						value={vehicleId}
						readOnly
					/>
					<button
						className="mt-5 ml-10 block h-10 w-40 rounded-md bg-slate-800 text-xl text-white"
						onClick={showFineCharged}
					>
						Fine Charged
					</button>
					<div className="m-10 rounded-sm border border-slate-200 p-10 shadow-md">
						<h3 className="pb-3 text-2xl">Fine Record</h3>
						<div>
							{violations.map((item) => (
								<div className="mb-5 rounded-md bg-slate-100 px-5 py-3">
									<span className="text-xl font-semibold">Violation : </span>
									<span className="text-xl">{item.violationStatement}</span>
									<br></br>
									<span className="text-xl font-semibold">Penalty : </span>
									<span className="font-medium text-red-500">
										{item.amountCharged}/-
									</span>
								</div>
							))}
						</div>
						{/* <div className="mb-5 rounded-md bg-slate-100 px-5 py-3">
						<span className="text-xl font-semibold">Violation: </span>
						<span className="text-xl">Triple Riding on Two-wheeler</span>
						<br></br>
						<span className="text-xl font-semibold">Penalty :</span>
						<span className="font-medium text-red-500">1000/-</span>
					</div>
					</div> */}
					</div>
				</div>
				<div className="">
					<Footer />
				</div>
			</div>
		);
};

export default Fine;
