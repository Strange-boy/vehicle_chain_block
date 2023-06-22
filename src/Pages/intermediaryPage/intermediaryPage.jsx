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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { appAuth } from "../../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Loader from "../Components/loader/Loader";

const IntermediaryPage = () => {
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

  return (
    <div className="my-0 h-screen items-center justify-center bg-slate-100 p-20 md:my-10 md:h-auto md:bg-white">
      <label htmlFor="" className="block text-xl">
        Aadhar Number
      </label>
      <div className="mt-4 flex w-full items-center rounded-md border border-slate-400 bg-white">
        <FontAwesomeIcon icon={faAddressCard} className="h-5 w-5 px-3" />
        <input
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

      {/* Type the legal full name */}

      <label htmlFor="" className="block text-xl">
        Legal Full Name
      </label>
      <div className="my-4 flex w-full items-center rounded-md border border-slate-400 bg-white">
        <FontAwesomeIcon icon={faAlignJustify} className="h-5 w-5 px-3" />
        <input
          className="rounded-md py-2 px-3 text-xl outline-none"
          type="text"
          placeholder="Type your full name"
        />
      </div>
      <button className="my-4 w-full rounded-md bg-gray-600 py-2 text-xl text-white duration-300 hover:bg-black">
        Proceed
      </button>
    </div>
  );
};

export default IntermediaryPage;
