import GovNavbar from "../gov_Component/govNavbar/govNavbar.jsx";
import GovFooter from "../gov_Component/govFooter/govFooter.jsx";
import Web3 from "web3";
import { ethers } from "ethers";
import ElectionContract from "../../../Contracts/VehicleRegistry.json";
import React, { Component, useEffect, useState } from "react";
import {
	CONTRACT_ABI,
	CONTRACT_ADDRESS,
} from "../../../Contracts/VehicleRegistry.jsx";
import { appAuth, db } from "../../../utils/firebase.js";
// in order to fetch the data from firestore
import { collection, query, where, getDocs } from "firebase/firestore";
import Loader from "../../Components/loader/Loader.jsx";

function GovIssueRc() {
	const [appState, setAppState] = useState({
		registrationNumber: "",
		registrationDate: "",
		registrationValidity: "",
		ownerName: "",
		engineNumber: "",
		chassisNumber: "",
		owner: "0xF73FaA018f8b9BDF39CfE5159010CdDeee39D94a",
		fuelUsed: "",
		monthAndYearOfManufacturing: "",
		modelName: "",
		makersName: "",
		seatingCapacity: 0,
		color: "",
		isBlacklisted: "NO",
		cubicCapacity: 0,
		vehicleClass: "",
		account: "",
		rcCount: 0,
		vehicleRegistry: {},
		currUser: null,
		loading: true,
		aadharAlert: "",
		aadharNumber: "",
	});

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

	async function getElections(e) {
		e.preventDefault();
		console.log("hsjsj");
		if (typeof window.ethereum !== "undefined") {
			const contract = await initializeProvider();
			try {
				let a = await contract.addHeader(
					appState.registrationNumber,
					appState.registrationDate,
					appState.registrationValidity,
					appState.ownerName,
					appState.engineNumber,
					appState.chassisNumber,
					appState.owner
				);

				let vehDetails = await contract.addDetails(
					appState.registrationNumber,
					appState.fuelUsed,
					appState.monthAndYearOfManufacturing,
					appState.modelName,
					appState.makersName,
					appState.seatingCapacity,
					appState.color,
					appState.isBlacklisted,
					appState.cubicCapacity,
					appState.vehicleClass
				);
				console.log(a);
				console.log(vehDetails);
			} catch (error) {
				console.log(error);
			}
		}
	}

	const stateUpdate = (updates) => {
		setAppState((prev) => {
			return {
				...prev,
				...updates,
			};
		});
	};

	useEffect(() => {
		authListener();

		if (typeof window.ethereum !== "undefined") {
			console.log("MetaMask is installed!");
			// loadBlockchainData();
			requestAccount();
		} else {
			alert("No web3 provider detected");
		}
	}, []);

	const authListener = () => {
		appAuth.onAuthStateChanged((user) => {
			if (user) {
				stateUpdate({ currUser: user, loading: false });
			} else {
				stateUpdate({ currUser: null, loading: false });
			}
		});
	};

	//function to find the wallet id corresponding to the aadhar
	const findWalletWithAadhar = async () => {
		const q = query(
			collection(db, "users"),
			where("Aadhar", "==", appState.aadharNumber)
		);

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			stateUpdate({
				owner: doc.data().Wallet_id,
			});
		});
	};

	async function loadBlockchainData() {
		const web3 = new Web3(window.ethereum);
		const accounts = await web3.eth.getAccounts();
		// set account to state
		console.log(accounts);
		stateUpdate({ account: accounts[0] });
		alert(appState.account);
		console.log("account: " + appState.account);
		const vehicleRegistry = new web3.eth.Contract(
			CONTRACT_ABI,
			CONTRACT_ADDRESS
		);
		stateUpdate({ vehicleRegistry: vehicleRegistry });
	}

	const handleChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		if (name === "aadharNumber") {
			// validate Aadhar number
			const aadhaarRegex = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
			if (aadhaarRegex.test(value)) {
				stateUpdate({
					aadharAlert: "",
				});
			} else {
				stateUpdate({
					aadharAlert: "Invalid aadhar number",
				});
			}
		}
		// check if the input is a number
		if (!isNaN(value)) {
			stateUpdate({
				[name]: value,
			});
		} else {
			// if the input is not a number, convert it to uppercase
			stateUpdate({
				[name]: value.toUpperCase(),
			});
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		alert("Connect wallet to issue RC");
		// find the wallet id corresponding to the aadhar number
		findWalletWithAadhar();
		// check if all fields are filled or not
		if (
			appState.registrationNumber === "" ||
			appState.registrationDate === "" ||
			appState.registrationValidity === "" ||
			appState.ownerName === "" ||
			appState.engineNumber === "" ||
			appState.chassisNumber === "" ||
			appState.fuelUsed === "" ||
			appState.monthAndYearOfManufacturing === "" ||
			appState.modelName === "" ||
			appState.makersName === "" ||
			appState.seatingCapacity === "" ||
			appState.cubicCapacity === "" ||
			appState.color === "" ||
			appState.vehicleClass === ""
		) {
			alert("Please fill all the fields");
			return;
		}
		const {
			registrationNumber,
			registrationDate,
			registrationValidity,
			ownerName,
			engineNumber,
			chassisNumber,
			owner,
			fuelUsed,
			monthAndYearOfManufacturing,
			modelName,
			makersName,
			seatingCapacity,
			color,
			isBlacklisted,
			cubicCapacity,
			vehicleClass,
		} = appState;

		console.log(
			registrationNumber,
			registrationDate,
			registrationValidity,
			ownerName,
			engineNumber,
			chassisNumber,
			owner,
			fuelUsed,
			monthAndYearOfManufacturing,
			modelName,
			makersName,
			seatingCapacity,
			color,
			isBlacklisted,
			cubicCapacity,
			vehicleClass
		);
		alert("please wait for the transaction to complete");
		// call the function of the smart contract with the values in the state object as arguments
		await appState.vehicleRegistry.methods
			.addHeader(
				registrationNumber,
				registrationDate,
				registrationValidity,
				ownerName,
				engineNumber,
				chassisNumber,
				owner
			)
			.send({ from: appState.account });
		await appState.vehicleRegistry.methods
			.addDetails(
				registrationNumber,
				fuelUsed,
				monthAndYearOfManufacturing,
				modelName,
				makersName,
				seatingCapacity,
				color,
				isBlacklisted,
				cubicCapacity,
				vehicleClass
			)
			.send({ from: appState.account });
		// alert the user that the vehicle has been registered
		alert("Vehicle registered successfully");

		// reset the state object
		stateUpdate({
			registrationNumber: "",
			registrationDate: "",
			registrationValidity: "",
			ownerName: "",
			engineNumber: "",
			chassisNumber: "",
			fuelUsed: "",
			monthAndYearOfManufacturing: "",
			modelName: "",
			makersName: "",
			seatingCapacity: "",
			cubicCapacity: "",
			color: "",
			vehicleClass: "",
		});
	};

	const loginRoute = "/login";

	const { currUser, loading } = appState;

	if (loading) {
		return <Loader />;
	} else if (!currUser) {
		window.location.href = loginRoute;
		return null;
	}
	return (
		<div>
			<div className="">
				<GovNavbar />
			</div>
			<div className="m-7 mx-10 rounded-md border border-slate-200 pt-20 pl-20 pb-40 pr-20 shadow-xl">
				<h1 className="text-2xl">Registration Certificate Issuance</h1>
				<br />
				<hr />
				<form onSubmit={getElections}>
					<label htmlFor="" className="mt-6 block text-xl">
						Registration Number
					</label>
					<input
						name="registrationNumber"
						type="text"
						autoFocus
						className="mt-2 h-10 w-64 rounded-md border border-slate-800 px-3"
						value={appState.registrationNumber}
						onChange={handleChange}
					/>

					<label htmlFor="" className="mt-6 block text-xl">
						Registration Date
					</label>
					<input
						name="registrationDate"
						type="date"
						className="mt-2 h-10 w-64 rounded-md border border-slate-800 px-3"
						value={appState.registrationDate}
						onChange={handleChange}
					/>

					<label htmlFor="" className="mt-6 block text-xl">
						Registration Validity
					</label>
					<input
						name="registrationValidity"
						type="date"
						className="mt-2 h-10 w-64 rounded-md border border-slate-800 px-3"
						value={appState.registrationValidity}
						onChange={handleChange}
					/>

					<label htmlFor="" className="mt-6 block text-xl">
						Aadhar Number of Owner
					</label>
					<input
						name="aadharNumber"
						type="text"
						className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
						value={appState.aadharNumber}
						onChange={handleChange}
					/>
					<p className="mb-4 text-xs">
						Please note:Aadhar number format - XXXX XXXX XXXX
					</p>
					<p className="text-sm text-red-600" id="aadhaarAlert">
						{appState.aadharAlert}
					</p>

					<label htmlFor="" className="mt-6 block text-xl">
						Owner Name
					</label>
					<input
						name="ownerName"
						type="text"
						className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
						value={appState.ownerName}
						onChange={handleChange}
					/>

					<label htmlFor="" className="mt-6 block text-xl">
						Engine Number
					</label>
					<input
						name="engineNumber"
						type="text"
						className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
						value={appState.engineNumber}
						onChange={handleChange}
					/>

					<label htmlFor="" className="mt-6 block text-xl">
						Chassis Number
					</label>
					<input
						name="chassisNumber"
						type="text"
						className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
						value={appState.chassisNumber}
						onChange={handleChange}
					/>

					<label htmlFor="" className="mt-6 block text-xl">
						Fuel Used
					</label>
					<div className="mt-2">
						<label>
							<input
								type="radio"
								name="fuelUsed"
								value="PETROL"
								checked={appState.fuelUsed === "PETROL"}
								onChange={handleChange}
							/>
							PETROL
						</label>
						<label className="ml-4">
							<input
								type="radio"
								name="fuelUsed"
								value="DIESEL"
								checked={appState.fuelUsed === "DIESEL"}
								onChange={handleChange}
							/>
							DIESEL
						</label>
					</div>

					<label htmlFor="" className="mt-6 block text-xl">
						Month and Year of Manufacturing
					</label>
					<input
						name="monthAndYearOfManufacturing"
						type="month"
						className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
						value={appState.monthAndYearOfManufacturing}
						onChange={handleChange}
					/>

					<label htmlFor="" className="mt-6 block text-xl">
						Model Name
					</label>
					<input
						name="modelName"
						type="text"
						className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
						value={appState.modelName}
						onChange={handleChange}
					/>

					<label htmlFor="" className="mt-6 block text-xl">
						Maker’s name
					</label>
					<input
						name="makersName"
						type="text"
						className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
						value={appState.makersName}
						onChange={handleChange}
					/>

					<label htmlFor="" className="mt-6 block text-xl">
						Seating Capacity
					</label>
					<input
						name="seatingCapacity"
						type="number"
						className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
						value={appState.seatingCapacity}
						onChange={handleChange}
					/>

					<label htmlFor="" className="mt-6 block text-xl">
						Cubic Capacity
					</label>
					<input
						name="cubicCapacity"
						type="text"
						className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
						value={appState.cubicCapacity}
						onChange={handleChange}
					/>

					<label htmlFor="" className="mt-6 block text-xl">
						Color
					</label>
					<input
						name="color"
						type="text"
						className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
						value={appState.color}
						onChange={handleChange}
					/>

					<label htmlFor="" className="mt-6 block text-xl">
						Vehicle’s class
					</label>
					<input
						name="vehicleClass"
						type="text"
						className="mt-2 h-10 w-64 rounded-md  border border-slate-800 px-3"
						value={appState.vehicleClass}
						onChange={handleChange}
					/>
					<input
						className="float-right mt-20 block h-10 w-40 rounded-md bg-slate-800 text-xl text-white"
						type="submit"
						value="Issue RC"
						onSubmit={getElections}
					/>
				</form>
			</div>
			<div className="">
				<GovFooter />
			</div>
		</div>
	);
}

// const GovIssueRc = () => <div>Hello</div>;

export default GovIssueRc;
