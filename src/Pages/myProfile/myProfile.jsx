import React, { useState, useEffect } from "react";
import Navbar from "../Components/navbar/navbar";
import Footer from "../Components/footer/footer";
import Loader from "../Components/loader/Loader";

/*Auth Related imports */
import { useAuthState } from "react-firebase-hooks/auth";
import { appAuth } from "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// firestore related commands
import { db } from "../../utils/firebase";
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	setDoc,
	updateDoc,
} from "firebase/firestore";

const MyProfile = () => {
	const [wallet, setWallet] = useState("");
	const [aadharNumber, setAadharNumber] = useState("");
	const [fullName, setFullName] = useState("");
	const [editing, setEditing] = useState(false);
	const [aadharError, setAadharError] = useState("");
	const [vehicleId, setVehicleId] = useState("");

	const auth = getAuth();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (userExist) => {
			if (userExist) {
				// console.log("user is logged in");
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
						setFullName(doc.data().Name);
						setAadharNumber(doc.data().Aadhar);
						setWallet(doc.data().Wallet_id);
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

	const validateAadharNumber = (event) => {
		const aadharNumber = event.target.value;
		const aadhaarRegex = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
		const isAadharValid = aadhaarRegex.test(aadharNumber);
		if (isAadharValid) {
			setAadharError("");
		} else {
			setAadharError("Invalid aadhar number");
		}
	};

	const [user, loading] = useAuthState(appAuth);
	const routeLoginPage = "./login";
	const welcomeRoute = "./welcome";
	const govUid = "GHHYwlHErhdC84sKe3MmseCKqvv1";

	function handleEdit() {
		setEditing(true);
	}

	function handleCancel() {
		setEditing(false);
	}

	function handleSave() {
		if (validateFields()) {
			setEditing(false);
			console.log("I am Up");
			const userExist = auth.currentUser;

			if (userExist) {
				// User is signed in.
				const username = userExist.email;
				//we have to fetch the name based on the username
				const userDetails = query(
					collection(db, "users"),
					where("Username", "==", username)
				);

				console.log(username);

				async function updateChangesToProfile() {
					const querySnapshot = await getDocs(userDetails);

					querySnapshot.forEach((currdoc) => {
						// doc.data() is never undefined for query doc snapshots
						console.log(currdoc.id, " => ", currdoc.data());

						const docRef = doc(db, "users", querySnapshot.docs[0].id);

						updateDoc(docRef, {
							Username: username,
							Aadhar: aadharNumber,
							Name: fullName,
							Wallet_id: wallet,
						})
							.then(() => {
								console.log("Document successfully updated!");
							})
							.catch((error) => {
								console.log(error);
							});
					});
				}

				//in order to update these changes to profile
				updateChangesToProfile();
			} else {
				console.log("The User is not logged in");
			}
		} else {
			alert("Please fill in all fields");
		}
	}

	function validateFields() {
		return wallet && fullName && !aadharError;
	}

	//in order to fetch the data from firestore
	if (loading) {
		return <Loader />;
	} else if (!user || user.uid === govUid)
		window.location.pathname = routeLoginPage;
	else {
		return (
			<div className="">
				<Navbar />
				<div className="min-h-screen">
					<div className="m-10 p-10">
						{editing ? (
							<button
								className="right-4 float-right w-24 rounded-md border bg-green-500 p-2 text-xl text-white duration-500 hover:bg-green-700"
								onClick={handleSave}
							>
								Save
							</button>
						) : (
							<button
								className="right-4 float-right w-24 rounded-md border bg-sky-500 p-2 text-xl text-white duration-500 hover:bg-sky-700"
								onClick={handleEdit}
							>
								Edit
							</button>
						)}
						<div className="my-10">
							<div className="mt-5 flex items-center">
								<label htmlFor="name" className="mr-4 text-xl">
									Legal full name :
								</label>
								{editing ? (
									<input
										type="text"
										id="name"
										name="name"
										value={fullName}
										className="w-fit rounded-md border border-slate-200 p-2 text-xl outline-none hover:border-sky-400"
										onChange={(e) => setFullName(e.target.value)}
									/>
								) : (
									<p className="text-xl">{fullName}</p>
								)}
							</div>
							<div className="mt-5 flex items-center">
								<label htmlFor="wallet" className="mr-4 text-xl">
									Wallet ID :
								</label>
								{editing ? (
									<input
										type="text"
										id="wallet"
										name="wallet"
										value={wallet}
										className="w-fit rounded-md border border-slate-200 p-2 text-xl outline-none hover:border-sky-400"
										onChange={(e) => setWallet(e.target.value)}
									/>
								) : (
									<p className="text-xl">{wallet}</p>
								)}
							</div>
							<div className="mt-5 flex items-center">
								<label htmlFor="aadhar" className="mr-4 text-xl">
									Aadhar Number :
								</label>
								{editing ? (
									<input
										type="text"
										id="aadhar"
										name="aadhar"
										value={aadharNumber}
										className="w-fit rounded-md border border-slate-200 p-2 text-xl outline-none hover:border-sky-400"
										onChange={(e) => {
											setAadharNumber(e.target.value);
											validateAadharNumber(e);
										}}
									/>
								) : (
									<p className="text-xl">{aadharNumber}</p>
								)}

								<p className="px-3 text-sm text-red-500">{aadharError}</p>
							</div>
							<div className="mt-5 flex items-center">
								<label htmlFor="aadhar" className="mr-4 text-xl">
									Vehicle Id :
								</label>
								<p className="text-xl">{vehicleId}</p>
							</div>
						</div>
						{editing && (
							<button
								className="right-4 float-right w-24 rounded-md border bg-red-500 p-2 text-xl text-white duration-500 hover:bg-red-700"
								onClick={handleCancel}
							>
								Cancel
							</button>
						)}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
};

export default MyProfile;
