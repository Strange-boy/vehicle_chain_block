import React from "react";
import { faVectorSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
// import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const auth = getAuth();

  function sendPasswordLink(e) {
    const email = document.querySelector("#confirm-email").value;
    console.log(email);
    //firebase functionality to send password reset
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        alert("Please check your email for password reset link");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage);
      });
  }

  return (
    <div className="flex items-center justify-center pt-20">
      <div className="rounded-md border-2 border-blue-500 p-10">
        {/* logo */}
        <div className="flex items-center justify-center pb-20">
          <FontAwesomeIcon icon={faVectorSquare} className="h-8 w-8 px-2" />
          <h1 className="text-3xl font-medium">VehicleChain </h1>
        </div>
        <div>
          {/* enter email */}
          <p className="pb-4 text-xl">
            Enter the email address associated with your account and
            <br /> we will send you a link to reset your password.
          </p>
          <label htmlFor="confirm-email pt-4 text-s">Email</label> <br />
          <input
            id="confirm-email"
            className="border- w-full p-2 text-xl outline-blue-500"
            type="email"
            autoFocus
          />
          <br />
          {/* Submit */}
          <div className="flex items-center justify-center">
            <button
              onClick={(e) => {
                sendPasswordLink(e);
              }}
              className="mt-4 w-full rounded-md bg-blue-500 p-2 px-14 text-white"
            >
              Continue
            </button>
          </div>
          {/* If new user, direct to signup page */}
          <p className="pt-4 text-lg">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
