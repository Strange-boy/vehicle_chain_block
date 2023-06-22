import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar/navbar";
import Footer from "../Components/footer/footer";
import RcBook from "../Components/rcBook/rcBook";
import Loader from "../Components/loader/Loader";
import { ethers } from "ethers";
import ElectionContract from "../../Contracts/VehicleRegistry.json";

// auth page
import { useAuthState } from "react-firebase-hooks/auth";
import { appAuth } from "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//firestore related commands
import { db } from "../../utils/firebase";
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
} from "firebase/firestore";

//firebase storage related commands
import { getStorage, ref } from "firebase/storage";
import { listAll, getDownloadURL } from "firebase/storage";

const Confirmation = () => {
	const [currUser, loading] = useAuthState(appAuth);
	const [vehId, setVehId] = useState(null);
	const { vid } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [vehicleHeader, setVehicleHeader] = useState([]);
	const [vehicleDetails, setVehicleDetails] = useState([]);

	// const [electionList, setElectionList] = useState([]);
	const [account, setAccount] = useState("");
	const Address = ElectionContract.networks[5777].address;

	async function initializeProvider() {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		return new ethers.Contract(Address, ElectionContract.abi, signer);
	}

	async function requestAccount() {
		const account = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		setAccount(account[0]);
	}

	async function getElections(vehicleId) {
		// e.preventDefault();
		console.log("hsjsj");
		if (typeof window.ethereum !== "undefined") {
			const contract = await initializeProvider();
			try {
				let vehHeader = await contract.getRcbook(vehicleId);
				console.log(vehHeader[0]);
				setVehicleHeader(vehHeader[0]);

				console.log(vehHeader[1]);
				setVehicleDetails(vehHeader[1]);
			} catch (error) {
				console.log(error);
			}
		}
	}

	useEffect(() => {
		console.log(location);
		if (location.state?.vehId !== vid) {
			{
				alert("you need to restart the process");
				navigate(-1);
			}
		} else {
			setVehId(location.state?.vehId);
			getElections(vehId);
		}
	}, [location.state?.vehId]);

	const govUid = "GHHYwlHErhdC84sKe3MmseCKqvv1";
	const routeLoginPage = "./login";
	const statusPage = "./status";
	const auth = getAuth();
	const storage = getStorage();

	//in order to find the vehicle id to download the documents
	const [vehicleId, setVehicleId] = useState("");
	const [username, setUsername] = useState("");
	const [legitDocuments, setLegitDocuments] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);

	function accept() {
		// console.log(acceptTerms);
		// console.log(legitDocuments);

		if (!acceptTerms || !legitDocuments) {
			alert("Please accept both the conditions before accepting");
			return;
		}

		alert("Once accepted, you cannot make any further changes.");

		// User is signed in.
		//we have to fetch the name based on the username
		const userDetails = query(
			collection(db, "confirmationDetails"),
			where("buyerId", "==", username)
		);

		console.log(username);

		async function updateChangesToConfirmationDetails() {
			const querySnapshot = await getDocs(userDetails);
			querySnapshot.forEach((currdoc) => {
				// doc.data() is never undefined for query doc snapshots
				// console.log(currdoc.id, " => ", currdoc.data());
				const docRef = doc(db, "confirmationDetails", querySnapshot.docs[0].id);
				updateDoc(docRef, {
					confFromBuyer: "ACCEPTED",
				})
					.then(() => {
						console.log("Document successfully updated!");
						navigate("/status");
						// window.location.pathname = statusPage;
					})
					.catch((error) => {
						console.log(error);
					});
			});
		}
		// in order to update these changes to profile
		updateChangesToConfirmationDetails();
	}

	function reject() {
		alert("Are you sure that you want to reject the application ?");
		// User is signed in.
		//we have to fetch the name based on the username
		const userDetails = query(
			collection(db, "confirmationDetails"),
			where("buyerId", "==", username)
		);

		// console.log(username);

		async function updateChangesToConfirmationDetails() {
			const querySnapshot = await getDocs(userDetails);
			querySnapshot.forEach((currdoc) => {
				// doc.data() is never undefined for query doc snapshots
				// console.log(currdoc.id, " => ", currdoc.data());
				const docRef = doc(db, "confirmationDetails", querySnapshot.docs[0].id);
				updateDoc(docRef, {
					confFromBuyer: "REJECTED",
				})
					.then(() => {
						console.log("Document successfully updated!");
						window.location.pathname = statusPage;
					})
					.catch((error) => {
						console.log(error);
					});
			});
		}
		// in order to update these changes to profile
		updateChangesToConfirmationDetails();
	}

	//in order to fetch the details that the seller submitted
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (userExist) => {
			if (userExist) {
				// console.log("user is logged in");
				setUsername(userExist.email);
				const currUser = userExist.email;
				//we have to fetch the name based on the username
				const userDetails = query(
					collection(db, "confirmationDetails"),
					where("buyerId", "==", currUser)
				);

				async function fetchUserDetails() {
					const querySnapshot = await getDocs(userDetails);
					querySnapshot.forEach((doc) => {
						// doc.data() is never undefined for query doc snapshots
						// console.log(doc.data().buyerId);
						// console.log(doc.data().sellerId);
						setVehicleId(doc.data().vehicleId);
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

	//in order to download all the documents that the seller has submitted
	function downloadDocuments() {
		const docRef = ref(storage, `${vehicleId}`);
		console.log("Download started!!");
		// console.log(vehicleId);

		listAll(docRef)
			.then((result) => {
				const promises = result.items.map((item) => {
					return getDownloadURL(item)
						.then((url) => {
							const xhr = new XMLHttpRequest();
							xhr.responseType = "blob";
							xhr.onload = (event) => {
								const blob = xhr.response;
								const a = document.createElement("a");
								const url = URL.createObjectURL(blob);
								a.href = url;
								a.download = `${item.name}`; // replace with the desired filename
								document.body.appendChild(a);
								a.click();
								URL.revokeObjectURL(url);
							};
							xhr.open("GET", url);
							xhr.send();
						})
						.catch((error) => {
							console.log(
								`An error occurred while downloading ${item.name}: `,
								error
							);
						});
				});

				Promise.all(promises)
					.then(() => {
						console.log("All files have been downloaded successfully.");
					})
					.catch((error) => {
						console.log("An error occurred while downloading files: ", error);
					});
			})
			.catch((error) => {
				console.log(
					`An error occurred while listing files in images}: `,
					error
				);
			});
	}

	//in order to handle the checkbox
	function handleDocChange(event) {
		setLegitDocuments(event.target.checked);
	}

	//in order to handle the approval
	function handleApprovalChange(event) {
		setAcceptTerms(event.target.checked);
	}

	//to be shown during loading
	if (loading) return <Loader />;
	//to be show if the user doesn't logs in
	else if (!currUser || currUser.uid === govUid)
		window.location.pathname = routeLoginPage;
	//if the user logs in successfully
	else {
		return (
			<div className="">
				<div className="">
					<Navbar />
				</div>
				<div className="m-10 border border-slate-100 p-10 shadow-md">
					<h1 className="ml-7 mb-2 text-2xl text-black">
						Title Change Confirmation
					</h1>
					<div className="mx-7 block w-fit rounded-xl border border-red-700 bg-red-100 px-5">
						<p className="">Important</p>
					</div>
					<hr className=" mt-4  bg-gray-800" />
					<p className="mt-6 text-xl">
						Given below is the current registration certificate :{" "}
					</p>
					<RcBook
						vehicleHeader={vehicleHeader}
						vehicleDetails={vehicleDetails}
					/>
					<p className="ml-7 text-xl font-black">
						Download and verify the documents
					</p>
					<p className="ml-7 mt-4 text-xl">Residence Proof </p>
					<p className="ml-7 mt-4 text-xl">Valid Certificate of Insurance </p>
					<p className="ml-7 mt-4 text-xl">Proof of Vehicle Fitness </p>
					<button
						className="m-10 w-36 rounded-md border border-black bg-blue-500 p-5 text-xl text-white"
						onClick={downloadDocuments}
					>
						Download
					</button>
					<br />

					<input
						type="checkbox"
						id="onAgree"
						name=""
						value=""
						className="ml-7 mt-7"
						onChange={handleApprovalChange}
					/>
					<label htmlFor="onAgree" className="px-3 text-xl">
						I agree that the above documents are legit{" "}
						<span className="text-red-600">*</span>
					</label>
					<br />
					<input
						type="checkbox"
						id="onAccept"
						name=""
						value=""
						className="ml-7 mt-7"
						onChange={handleDocChange}
					/>
					<label htmlFor="onAccept" className="px-3 text-xl">
						I accept to change the ownership of the registration certificate{" "}
						<span className="text-red-600">*</span>
					</label>
					<br />

					<button
						onClick={reject}
						className="m-10 w-36 rounded-md border border-black bg-red-600 p-5 text-xl text-white"
					>
						Reject
					</button>
					<button
						onClick={accept}
						className="m-10 w-36 rounded-md border border-black bg-green-700 p-5 text-xl text-white"
					>
						Accept
					</button>
				</div>
				<Footer />
			</div>
		);
	}
};
export default Confirmation;
