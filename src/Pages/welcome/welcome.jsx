import React from "react";
import Navbar from "../Components/navbar/navbar";
import Footer from "../Components/footer/footer";
import Image from "../assets/vehicle.png";
import Loader from "../Components/loader/Loader";

/*Auth Related imports */
import { useAuthState } from "react-firebase-hooks/auth";
import { appAuth } from "../../utils/firebase";
import { getAuth } from "firebase/auth";

// Import Link to route to other pages
import { Link } from "react-router-dom";

//global variables
const auth = getAuth();

const Welcome = () => {
  const [currUser, loading] = useAuthState(appAuth);
  const govUid = "GHHYwlHErhdC84sKe3MmseCKqvv1";
  const routeLoginPage = "./login";
  const routeViewRc = "/viewRc";
  const titleChange = "/titleChange";
  const statusPage = "/status";

  //to be shown during loading
  if (loading) return <Loader />;
  //to be show if the user doesn't logs in
  else if (!currUser || currUser.uid === govUid)
    window.location.pathname = routeLoginPage;
  //if the user logs in successfully
  else
    return (
      <div className="">
        {/* Import the navbar component */}
        <div className="mb-5">
          <Navbar />
        </div>

        {/* Content and image part of the welcome page */}
        <div className="relative min-h-screen">
          <div className="md:flex">
            {/* Content */}
            <div className="md:w-1/2">
              <h1 className=" my-4 p-6 text-3xl font-black">
                Trust Through Transparency
              </h1>
              <p className="text-normal p-6 text-justify">
                Our system is designed to provide secure and efficient
                maintenance of vehicle registration records through the use of
                cutting-edge blockchain technology. With our system, you can be
                confident that your vehicle registration data is protected from
                tampering and unauthorized access.
              </p>
            </div>
            {/* Image */}
            <div className="md:w-1/2">
              <img src={Image} alt="vehicle" className="mr-0 w-3/4" />
            </div>
          </div>
          {/* Two functionalities - View registration certificate and change ownership */}
          <div className="w-full md:flex">
            {/* <div className="md:flex w-full absolute bottom-0"> */}
            {/* Registration certificate */}
            <div className="w-1/2 p-5">
              <Link to="/viewRc">
                <button className="w-full border border-slate-800 pt-2 pb-20 pl-2 text-left font-semibold">
                  View My Registration Certificate
                </button>
              </Link>
            </div>

            {/* Change ownership */}
            <div className="w-1/2 p-5">
              <Link to="/status">
                <button className="w-full border border-slate-800 pt-2 pb-20 pl-2 text-left font-semibold">
                  Change Ownership
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:mx-auto w-1/2 p-5">
          <Link to="/fine">
            <button className="w-full border border-slate-800 pt-2 pb-20 pl-2 text-left font-semibold">
              Fine Record
            </button>
          </Link>
        </div>
        {/* Import the footer component  */}
        <div className="">
          <Footer />
        </div>
      </div>
    );
};

export default Welcome;
