import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { faeye } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Google from "../assets/Google.png";

/*Performing google authentication */
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { appAuth, db } from "../../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// this functionality adds data to the fire store
import { collection, addDoc } from "firebase/firestore";

import Loader from "../Components/loader/Loader";

const Signup = () => {
	const loginRoute = "./login";
	const welcomeRoute = "./welcome";
	const auth = getAuth();

	//inorder to manage the auth
	const [user, loading] = useAuthState(appAuth);

	//in order to add the data to the fire store
	const [username, setUsername] = useState("");
	const [aadhar, setAadhar] = useState("");
	const [walletId, setWalletId] = useState("");
	const [name, setName] = useState("");
	const [vehicleId, setVehicleId] = useState("");

	// form validation code
	const [aadharAlert, setAadharAlert] = useState("");
	const validateAadharNumber = (event) => {
		const aadharNumber = event.target.value;
		const aadhaarRegex = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
		if (aadhaarRegex.test(aadharNumber)) {
			setAadharAlert("");
		} else {
			setAadharAlert("Invalid aadhar number");
		}
	};

	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		if (event.target.value.length < 6) {
			setPasswordError("Password should have at least 6 letters.");
		} else {
			setPasswordError("");
		}
	};

	const [passwordAlert, setPasswordAlert] = useState("");
	const passwordConfirmation = (event) => {
		const password = document.getElementById("password").value;
		const newPassword = event.target.value;
		if (password === newPassword) {
			setPasswordAlert("");
		} else {
			setPasswordAlert("Password doesn't match");
		}
	};

	const [emailAlert, setEmailAlert] = useState("");

	const validateEmail = (event) => {
		const email = event.target.value;
		const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (emailregex.test(email)) {
			setEmailAlert("");
		} else {
			setEmailAlert("Invalid email");
		}
	};

	//sign in with google
	const googleProvider = new GoogleAuthProvider();
	const GoogleLogin = async () => {
		try {
			const result = await signInWithPopup(appAuth, googleProvider);
			console.log(result.user);
			window.location.pathname = welcomeRoute;
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	};

	function createUserId() {
		// const email = document.querySelector("#username").value;
		const password = document.querySelector("#password").value;

		const createUser = async () => {
			// const collectionRef = collection(db, "users");

			await addDoc(collection(db, "users"), {
				Username: username,
				Name: name,
				Wallet_id: walletId,
				Aadhar: aadhar,
				VehicleId: vehicleId,
			});
		};

		createUser();

		createUserWithEmailAndPassword(auth, username, password)
			.then((userCredential) => {
				// Signed in
				const emailId = username;
				updateProfile(auth.currentUser, {
					email: emailId,
				})
					.then(() => {
						// Profile updated!
						console.log("profile updated!");
					})
					.catch((error) => {
						// An error occurred
						console.log(error);
					});
				window.location.pathname = welcomeRoute;
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
				console.log(errorMessage);
				alert(errorMessage);
			});
	}

	//if the user is logged in
	if (loading) {
		return <Loader />;
	} else if (user) {
		window.location.pathname = welcomeRoute;
	} else {
		return (
			<div className="my-0 flex h-screen items-center justify-center bg-slate-100 md:my-10 md:h-auto md:bg-white">
				<div className="rounded-md p-10 md:my-5 md:bg-slate-100">
					<h1 className="m-10 text-center text-2xl font-bold text-gray-800">
						Signup
					</h1>

					{/* Type the username */}

					<label htmlFor="username" className="block text-xl">
						Username
					</label>
					<div className="my-4 flex w-full items-center rounded-md border border-slate-400 bg-white">
						<FontAwesomeIcon icon={faUser} className="h-5 w-5 px-3" />
						<input
							onChange={(event) => {
								setUsername(event.target.value);
							}}
							onBlur={validateEmail}
							id="username"
							className="rounded-md py-2 px-3 text-xl outline-none"
							type="email"
							placeholder="Type your email"
						/>
					</div>
					<p className="text-sm text-red-600" id="emailAlert">
						{emailAlert}
					</p>
					{/* Type the aadhar number */}

					<label htmlFor="aadhar" className="block text-xl">
						Aadhar Number
					</label>
					<div className="mt-4 flex w-full items-center rounded-md border border-slate-400 bg-white">
						<FontAwesomeIcon icon={faAddressCard} className="h-5 w-5 px-3" />
						<input
							id="aadhar"
							name="aadhar"
							onChange={(event) => {
								setAadhar(event.target.value);
							}}
							onBlur={validateAadharNumber}
							className="rounded-md py-2 px-3 text-xl outline-none"
							type="text"
							placeholder="Type your aadhar number"
						/>
					</div>
					<p className="mb-4 text-xs">
						Please note:Aadhar number format - XXXX XXXX XXXX
					</p>
					<p className="text-sm text-red-600" id="aadhaarAlert">
						{aadharAlert}
					</p>

					{/* In order to enter the wallet id */}
					<label htmlFor="" className="block text-xl">
						Wallet Id
					</label>
					<div className="my-4 flex w-full items-center rounded-md border border-slate-400 bg-white">
						<FontAwesomeIcon icon={faAddressCard} className="h-5 w-5 px-3" />
						<input
							onChange={(event) => {
								setWalletId(event.target.value);
							}}
							className="rounded-md py-2 px-3 text-xl outline-none"
							type="text"
							placeholder="Type your wallet id"
						/>
					</div>

					{/* In order to enter the vehicle id */}
					<label htmlFor="" className="block text-xl">
						Vehicle Id
					</label>
					<div className="my-4 flex w-full items-center rounded-md border border-slate-400 bg-white">
						<FontAwesomeIcon icon={faAddressCard} className="h-5 w-5 px-3" />
						<input
							onChange={(event) => {
								setVehicleId(event.target.value);
							}}
							className="rounded-md py-2 px-3 text-xl outline-none"
							type="text"
							placeholder="XX-XX-XX-XXX"
						/>
					</div>

					{/* Type the legal full name */}

					<label htmlFor="name" className="block text-xl">
						Legal Full Name
					</label>
					<div className="my-4 flex w-full items-center rounded-md border border-slate-400 bg-white">
						<FontAwesomeIcon icon={faAlignJustify} className="h-5 w-5 px-3" />
						<input
							id="name"
							name="name"
							onChange={(event) => {
								setName(event.target.value);
							}}
							className="rounded-md py-2 px-3 text-xl outline-none"
							type="text"
							placeholder="Type your full name"
						/>
					</div>

					{/* Type the password */}

					<label htmlFor="password" className="block text-xl ">
						New Password
					</label>
					<div className="my-4 flex w-full items-center rounded-md border border-slate-400 bg-white">
						<FontAwesomeIcon icon={faLock} className="h-5 w-5 px-3" />
						<input
							className="rounded-md py-2 px-3 text-xl outline-none"
							onChange={handlePasswordChange}
							type="password"
							id="password"
							name="password"
							placeholder="Type your password"
							required
						/>
					</div>
					<p className="text-sm">{passwordError}</p>

					{/* Retype the password */}

					<label htmlFor="confpassword" className="block text-xl ">
						Confirm Password
					</label>
					<div className="my-4 flex w-full items-center rounded-md border border-slate-400 bg-white">
						<FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 px-3" />
						<input
							id="confpassword"
							name="confpassword"
							onChange={passwordConfirmation}
							className="rounded-md py-2 px-3 text-xl outline-none"
							type="password"
							placeholder="Retype your password"
							required
						/>
					</div>
					<p className="text-sm text-red-600" id="passwordAlert">
						{passwordAlert}
					</p>

					<button
						onClick={createUserId}
						className="my-4 w-full rounded-md bg-gray-600 py-2 text-xl text-white duration-300 hover:bg-black"
					>
						Signup
					</button>

					<p className="my-4 text-center">or</p>

					<button
						onClick={GoogleLogin}
						className="my-4 flex w-full items-center justify-center rounded-md border border-slate-400 py-2 text-xl"
					>
						<img src={Google} alt="google" className="mx-3 h-5 w-5" />
						Continue with Google{" "}
					</button>

					{/* If new user, direct to signup page */}
					<p className="text-lg">
						Already a member?&nbsp;
						<Link
							onClick={() => {
								window.location.pathname = loginRoute;
							}}
							className="font-semibold text-blue-700"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		);
	}
};

export default Signup;
