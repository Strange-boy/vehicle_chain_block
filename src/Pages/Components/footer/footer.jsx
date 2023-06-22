import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVectorSquare } from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
const Footer = () => {
  return (
    <div className="">
      <div className="items-center bg-slate-100 p-6 text-xl md:flex">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faVectorSquare} className="px-2" />
          <h1 className="sm:text-center">VehicleChain </h1>
        </div>
        <div className="flex items-center sm:text-center md:absolute md:right-5">
          <FontAwesomeIcon icon={faCopyright} className="px-2" />
          <p className="">Hema, Irene, Jayageetha and Joel</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
