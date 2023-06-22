import React, { useEffect, useState } from "react";
import GovNavbar from "../gov_Component/govNavbar/govNavbar.jsx";
import GovFooter from "../gov_Component/govFooter/govFooter.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

//in order to import fire store related commands
import { db } from "../../../utils/firebase.js";
import {
	collection,
	query,
	where,
	getDocs,
	addDoc,
	FieldValue,
	doc,
	updateDoc,
} from "firebase/firestore";

const GovFine = () => {
	const [violations, setViolations] = useState({
		"Driving Without Helmet": {
			violationName: "Driving Without Helmet",
			fine: 1000,
		},
		"Triple Riding on Two-wheeler": {
			violationName: "Triple Riding on Two-wheeler",
			fine: 2000,
		},
		"Over-speeding Penalty": {
			violationName: "Over-speeding Penalty",
			fine: 3000,
		},
		"Driving Without a Seatbelt": {
			violationName: "Driving Without a Seatbelt",
			fine: 4000,
		},
		"Using a Mobile Phone While Driving": {
			violationName: "Using a Mobile Phone While Driving",
			fine: 5000,
		},
	});

	const [fineStatement, setFineStatement] = useState("");
	const [userVerified, setUserVerified] = useState(false);
	const [vehicleId, setVehicleId] = useState("");
	const [ownerId, setOwnerId] = useState("");
	const [fineAmount, setFineAmount] = useState(0);
	const violationOptions = Object.keys(violations);

	//in order to update the fine amount as and when the fine statement gets changed
	useEffect(() => {
		const setFine = (selectedViolation) => {
			if (selectedViolation && violations[selectedViolation]) {
				setFineAmount(violations[selectedViolation].fine);
			}
		};

		// console.log(fineStatement);
		//in order to set the fine amount
		setFine(fineStatement);
		// console.log(fineAmount);
	}, [fineStatement]);

	const handleFineStatement = (event) => {
		const word = event.target.value;
		setFineStatement(word);
	};

	//in order to handle the vehicle verfication
	function handleVehicleVerfication() {
		if (vehicleId === "") {
			alert("Please enter a valid vehicle Id");
			return;
		}

		//in order to check in the fire store whether the assosciated user exist or not
		const userRef = collection(db, "users");
		const userExist = query(userRef, where("Username", "==", ownerId));

		const userValidation = async () => {
			const querySnapshot = await getDocs(userExist);

			if (querySnapshot.size > 0) {
				setUserVerified(true);
				alert("User Details are verified");
			} else {
				alert("Please enter valid user details");
			}
		};

		userValidation();
	}

	//in order to add the details to the database
	function updateFineDetails() {
		if (userVerified == false) {
			alert("Please verify the user details");
			return;
		}

		if (fineStatement === "") {
			alert("Please choose an appropriate violation");
			return;
		}

		console.log(fineStatement);
		console.log("fine charged:", fineAmount);

		const fineDetails = {
			violationStatement: fineStatement,
			amountCharged: fineAmount,
		};

		//in order to check in the fire store whether the assosciated user exist or not
		const userRef = collection(db, "fineDetails");
		const userExist = query(userRef, where("vehicleId", "==", vehicleId));

		const userValidation = async () => {
			const querySnapshot = await getDocs(userExist);

			if (querySnapshot.size > 0) {
				querySnapshot.forEach((currdoc) => {
					// doc.data() is never undefined for query doc snapshots
					// console.log(currdoc.id, " => ", currdoc.data());
					// Step 3: Modify the array locally
					const existingArray = currdoc.data().fineInfo || []; // If the array field is empty or doesn't exist yet
					existingArray.push(fineDetails);

					const docRef = doc(db, "fineDetails", querySnapshot.docs[0].id);
					updateDoc(docRef, {
						fineInfo: existingArray,
					})
						.then(() => {
							alert("Fine has been charged");
						})
						.catch((error) => {
							console.log(error);
						});
				});
			} else {
				//in order to add details to the firestore
				async function addDataToFirestore() {
					//in order to store the details into an array
					const fineTemp = [];

					fineTemp.push(fineDetails);

					await addDoc(collection(db, "fineDetails"), {
						username: ownerId,
						vehicleId: vehicleId,
						fineInfo: fineTemp,
					});

					alert("Fine has been charged");
				}

				//inorder to add the data to the firestore
				addDataToFirestore();
			}
		};

		//in order to check whether a document exists or not
		userValidation();
	}

	return (
		<div className="">
			<div className="">
				<GovNavbar />
			</div>
			<div className="m-10 rounded-sm border border-slate-200 p-10 shadow-md min-h-screen">
				<h3 className="pb-3 text-2xl">Record Fine</h3>
				<label htmlFor="fine" className="text-xl">
					Enter user id:
				</label>
				<input
					type="text"
					id="username"
					name="username"
					placeholder="owner@test.com"
					className="mt-3 ml-3 rounded-md border py-2 px-3 text-xl outline-none"
					onChange={(event) => {
						setUserVerified(false);
						setOwnerId(event.target.value);
					}}
				/>
				<br />
				<label htmlFor="fine" className="text-xl">
					Vehicle Registration Number :
				</label>
				<input
					type="text"
					id="fine"
					name="fine"
					placeholder="XX-XX-XX-XXXX"
					className="mt-3 ml-3 rounded-md border py-2 px-3 text-xl outline-none"
					onChange={(event) => {
						setVehicleId(event.target.value);
					}}
				/>
				<button
					className="mt-5 block h-10 w-40 rounded-md bg-slate-800 text-xl text-white"
					onClick={handleVehicleVerfication}
				>
					Verify details
				</button>
				<br></br>
				<label htmlFor="" className="text-xl">
					Violation :
				</label>
				<select
					className="mt-3 ml-3 rounded-md border py-2 px-3 text-xl outline-none"
					onChange={handleFineStatement}
				>
					<option value="" className="">
						Select a violation
					</option>
					{violationOptions.map((option) => (
						<option
							key={violations[option].violationName}
							value={violations[option].violationName}
						>
							{violations[option].violationName}
						</option>
					))}
				</select>
				<button
					className=" ml-auto flex items-center justify-end rounded-md bg-slate-600 p-2 text-xl text-white"
					onClick={updateFineDetails}
				>
					Submit
					<FontAwesomeIcon icon={faArrowRight} className="px-3" />
				</button>
			</div>

			<div className="">
				<GovFooter />
			</div>
		</div>
	);
};

export default GovFine;
