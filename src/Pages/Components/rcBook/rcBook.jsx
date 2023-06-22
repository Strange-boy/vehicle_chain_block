import React, { useState, useEffect } from "react";
import Emblem from "../../assets/Emblem.png";
import { ethers } from "ethers";
import ElectionContract from "../../../Contracts/VehicleRegistry.json";

const RcBook = ({ vehicleHeader, vehicleDetails }) => {
	return (
		<div className="w-fit items-center justify-center rounded-md border border-slate-800 shadow-md overflow-hidden">
			<div className="flex w-full items-center justify-start bg-slate-100">
				<div className="">
					<img src={Emblem} alt="IndianEmblem" className="h-40 w-28" />
				</div>
				<div className="">
					<h1 className="text-3xl font-bold">GOVERNMENT OF KERALA</h1>
					<p className="mt-2 text-xl">Certificate of Registartion</p>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="m-7 flex">
					<div className="ml-7 w-80 bg-slate-100 px-20">
						<div className="my-5">
							<label htmlFor="" className="text-xl font-bold">
								Regn No:
							</label>
							<p className="text-xl">{vehicleHeader[0]}</p>
						</div>
						<div className="">
							<label htmlFor="" className="text-xl font-bold">
								Regn Validity:
							</label>
							<p className="text-xl">{vehicleHeader[2]}</p>
						</div>
						<div className="my-5">
							<label htmlFor="" className="text-xl font-bold">
								Engine No:
							</label>
							<p className="text-xl">{vehicleHeader[4]}</p>
						</div>
						<div className="mb-5">
							<label htmlFor="" className="text-xl font-bold">
								Chasis No:
							</label>
							<p className="text-xl">{vehicleHeader[5]}</p>
						</div>
					</div>
					<div className="w-64 bg-slate-100 pr-20">
						<div className="my-5">
							<label htmlFor="" className="text-xl font-bold">
								Date of Regn:
							</label>
							<p className="text-xl">{vehicleHeader[1]}</p>
						</div>
						<div className="">
							<label htmlFor="" className="text-xl font-bold">
								Owner Name:
							</label>
							<p className="text-xl">{vehicleHeader[3]}</p>
						</div>
					</div>
				</div>

				<div className="m-7 flex">
					<div className="w-96 bg-slate-100 px-20">
						<div className="my-5">
							<label htmlFor="" className="text-xl font-bold">
								Fuel Used:
							</label>
							<p className="text-xl">{vehicleDetails[0]}</p>
						</div>
						<div className="">
							<label htmlFor="" className="text-xl font-bold">
								Vehicle Class:
							</label>
							<p className="text-xl">{vehicleDetails[8]}</p>
						</div>
						<div className="my-5">
							<label htmlFor="" className="text-xl font-bold">
								Maker’s Name:
							</label>
							<p className="text-xl">{vehicleDetails[3]}</p>
						</div>
						<div className="my-5">
							<label htmlFor="" className="text-xl font-bold">
								Seating Capacity:
							</label>
							<p className="text-xl">{parseInt(vehicleDetails[4])}</p>
						</div>
						<div className="mb-5">
							<label htmlFor="" className="text-xl font-bold">
								Cubic Capacity:
							</label>
							<p className="text-xl">{parseInt(vehicleDetails[7])}</p>
						</div>
					</div>
					<div className="mr-7 w-80 bg-slate-100 pr-20">
						<div className="my-5">
							<label htmlFor="" className="text-xl font-bold">
								Month and Yr. of Mfg:
							</label>
							<p className="text-xl">{vehicleDetails[1]}</p>
						</div>
						<div className="">
							<label htmlFor="" className="text-xl font-bold">
								Model Name:
							</label>
							<p className="text-xl">{vehicleDetails[2]}</p>
						</div>
						<div className="my-5">
							<label htmlFor="" className="text-xl font-bold">
								Color:
							</label>
							<p className="text-xl">{vehicleDetails[5]}</p>
						</div>
						<div className="mb-5">
							<label htmlFor="" className="text-xl font-bold">
								Is Blacklisted:
							</label>
							<p className="text-xl">{vehicleDetails[6]}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default RcBook;
