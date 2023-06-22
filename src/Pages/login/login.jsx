import { Link } from "react-router-dom";
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { appAuth } from "../../utils/firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Google from "../assets/Google.png";
import Loader from "../Components/loader/Loader";

/*Auth Related imports */
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

//global variables
const auth = getAuth();

const Login = () => {
	//inorder to provide the route
	const route = "/welcome";
	const signUpRoute = "/signup";
	const govEmail = "admin@gov.in";
	const govPassword = "admingov";
	const govRoute = "./govWelcome";

	const [currUser, loading] = useAuthState(appAuth);

	//function to log in the user
	function logInUser() {
		const username = document.querySelector("#username").value;
		const password = document.querySelector("#password").value;
		const auth = getAuth();

		// console.log(username, password);
		signInWithEmailAndPassword(auth, username, password)
			.then((userCredential) => {
				// Signed in
				const user = auth.currentUser;
				console.log(user.email);

				if (user.email === govEmail) {
					window.location.pathname = govRoute;
				} else {
					window.location.pathname = route;
				}
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorMessage);
			});
	}

	//sign in with google
	const googleProvider = new GoogleAuthProvider();
	const GoogleLogin = async () => {
		try {
			const result = await signInWithPopup(appAuth, googleProvider);
			console.log(result.user);
			window.location.pathname = route;
		} catch (error) {
			console.log(error);
		}
	};

	//if the user is logged in
	if (loading) {
		return <Loader />;
	} else if (currUser) {
		const user = auth.currentUser;
		if (user.email === govEmail) window.location.pathname = govRoute;
		else window.location.pathname = route;
	}

	return (
		<div className="flex h-screen items-center justify-center bg-slate-100 md:bg-white">
			<div className="rounded-md p-10 md:my-5 md:bg-slate-100">
				<h1 className="m-10 text-center text-2xl font-bold text-gray-800">
					Login
				</h1>

				{/* Type the username */}

				<label htmlFor="username" className="block text-xl">
					Email
				</label>
				<div className="my-4 flex w-full items-center rounded-md border border-slate-400 bg-white">
					<FontAwesomeIcon icon={faUser} className="h-5 w-5 px-3" />
					<input
						id="username"
						name="username"
						className="rounded-md py-2 px-3 text-xl outline-none"
						type="text"
						placeholder="Type your username"
					/>
				</div>

				{/* Type the password */}

				<label htmlFor="password" className="block text-xl ">
					Password
				</label>
				<div className="my-4 flex w-full items-center rounded-md border border-slate-400 bg-white">
					<FontAwesomeIcon icon={faLock} className="h-5 w-5 px-3" />
					<input
						id="password"
						name="password"
						className="rounded-md py-2 px-3 text-xl outline-none"
						type="password"
						placeholder="Type your password"
					/>
				</div>
				{/* Forgot password */}
				<p className="text-right text-lg">
					{" "}
					<Link to="/forgotPassword" className="font-semibold text-blue-700">
						Forgot Password?
					</Link>
				</p>

				<button
					onClick={logInUser}
					className="my-4 w-full rounded-md bg-gray-600 py-2 text-xl text-white duration-300 hover:bg-black"
				>
					Login
				</button>

				<p className="my-4 text-center text-xl">or</p>

				<button
					onClick={GoogleLogin}
					className="my-4 flex w-full items-center justify-center rounded-md border border-slate-400 py-2 text-xl"
				>
					<img src={Google} alt="google" className="mx-3 h-5 w-5" />
					Continue with Google{" "}
				</button>

				{/* If new user, direct to signup page */}
				<p className="text-lg">
					New User?&nbsp;
					<Link
						onClick={() => {
							window.location.pathname = signUpRoute;
						}}
						className="font-semibold text-blue-700"
					>
						Signup
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
