import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faPrint } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Components/navbar/navbar";
import Loader from "../Components/loader/Loader";
import Footer from "../Components/footer/footer";
import RcBook from "../Components/rcBook/rcBook";
// // import ReactToPdf from 'react-to-pdf';
// import ReactToPdf from 'react-to-pdf';
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import { ethers } from "ethers";
import ElectionContract from "../../Contracts/VehicleRegistry.json";

/* Auth related imports*/
import { useAuthState } from "react-firebase-hooks/auth";
import { appAuth } from "../../utils/firebase";

const ViewRc = () => {
	const ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		documentTitle: "RC Book",
		onafterprint: () => alert("Print success"),
	});
	/*auth functionality in order to mantain the state of the user*/
	const [user, loading] = useAuthState(appAuth);
	const [vehicleId, setVehicleId] = useState("");
	const [vehicleHeader, setVehicleHeader] = useState([]);
	const [vehicleDetails, setVehicleDetails] = useState([]);

	const routeLoginPage = "./login";
	const govUid = "GHHYwlHErhdC84sKe3MmseCKqvv1";

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
		// console.log("hsjsj");
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

	//to be shown during loading
	if (loading) return <Loader />;
	//to be show if the user doesn't logs in
	else if (!user || user.uid === govUid)
		window.location.pathname = routeLoginPage;
	//if the user logs in successfully
	else
		return (
			<div className="">
				<div className="">
					<Navbar />
				</div>

				<div className="mt-5 items-center p-10 md:flex">
					<h1 className="text-2xl">Registration Certificate</h1>

					<button
						onClick={handlePrint}
						className="my-5 flex h-10 w-24 items-center justify-center rounded-md border border-slate-400 bg-white sm:my-0 md:absolute md:right-10"
					>
						<FontAwesomeIcon icon={faPrint} className="px-3" />
						<p className="pr-3 text-xl">Print</p>
					</button>
				</div>

				<div className="flex flex-col justify-center mx-5">
					<div>
						<label htmlFor="" className="block text-xl">
							Vehicle Registration Number{" "}
							<span className="text-red-600">*</span>
						</label>
						<input
							id="newOwner"
							name="newOwner"
							onChange={(event) => setVehicleId(event.target.value)}
							className="mb-1 rounded-md border border-slate-600 py-1 px-3 text-xl outline-none w-1/3"
							type="text"
						/>
						<button
							className="mt-3 mb-5 block h-10 w-40 rounded-md bg-slate-800 text-xl text-white"
							onClick={() => getElections(vehicleId)}
						>
							Verify vehicle
						</button>
					</div>

					<div className="" ref={ref}>
						<RcBook
							vehicleHeader={vehicleHeader}
							vehicleDetails={vehicleDetails}
						/>
					</div>
				</div>
				<br className="" />
				<div className="">
					<Footer />
				</div>
			</div>
		);
};
export default ViewRc;
