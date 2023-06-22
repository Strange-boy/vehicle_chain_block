import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVectorSquare } from "@fortawesome/free-solid-svg-icons";
import { appAuth } from "../../../utils/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  //this implements logOut functionality (assosciated with firebase)
  function logOut() {
    signOut(appAuth)
      .then(() => {
        // Sign-out successful.
        console.log("You have successfully logged out!");
        window.location.pathname = "./login";
      })
      .catch((error) => {
        console.log("error");
        // An error happened.
        console.log(error);
      });
  }

  return (
    <div className="items-center bg-slate-100 p-6 md:flex">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faVectorSquare} className="h-8 w-8 px-2" />
        <h1 className="text-3xl font-medium">VehicleChain </h1>
      </div>
      <div className="right-0 ml-5 items-center md:absolute md:right-5 md:flex">
        <a href="/welcome" className="block py-5 text-xl md:pr-8">
          Home
        </a>
        <a href="/myProfile" className="block pb-5 text-xl md:pb-0 md:pr-8">
          My profile
        </a>
        <button
          onClick={logOut}
          className="block w-32 rounded-md border border-slate-800 p-2 text-center text-xl "
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default Navbar;
