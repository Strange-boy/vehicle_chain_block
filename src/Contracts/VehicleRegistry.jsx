export const CONTRACT_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138";

export const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_registrationNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fuel",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dateofMfgr",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_modelName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_makerName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_seatingCapacity",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_vehicleColor",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_isBlackListed",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_cubicCapacity",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_vehicleClass",
				"type": "string"
			}
		],
		"name": "addDetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_registrationNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_registrationValidity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ownerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_engineNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_chassisNumber",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "addHeader",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_registrationNumber",
				"type": "string"
			}
		],
		"name": "blacklistVehicle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_registrationNumber",
				"type": "string"
			}
		],
		"name": "getRcbook",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "registrationNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "registrationValidity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ownerName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "engineNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "chassisNumber",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					}
				],
				"internalType": "struct VehicleRegistry.RcBookHeader",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "fuel",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dateofMfgr",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "modelName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "makerName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "seatingCapacity",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "vehicleColor",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "isBlackListed",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "cubicCapacity",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "vehicleClass",
						"type": "string"
					}
				],
				"internalType": "struct VehicleRegistry.RcBookDetails",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_registrationNumber",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "titleChange",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];