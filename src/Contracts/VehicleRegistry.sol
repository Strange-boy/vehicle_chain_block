// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract VehicleRegistry {
    
    struct RcBookHeader {
        string registrationNumber;
        string date;
        string registrationValidity;
        string ownerName;
        string engineNumber;
        string chassisNumber;
        address owner;
    }
    struct RcBookDetails {
        string fuel;
        string dateofMfgr;
        string modelName;
        string makerName;
        uint256 seatingCapacity;
        string vehicleColor;
        string isBlackListed;
        uint256 cubicCapacity;
        string vehicleClass;
    }
    struct RcBook {
        RcBookHeader header;
        RcBookDetails details;
    }
    mapping (string => RcBook) private RcBooks;
    address public ContractOwner;

    constructor() {
        ContractOwner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == ContractOwner,
            "Only the contract owner can perform this action."
        );
        _;
    }

    //RC book issuing functions
    function addHeader(
        string memory _registrationNumber,
        string memory _date,
        string memory _registrationValidity,
        string memory _ownerName,
        string memory _engineNumber,
        string memory _chassisNumber,
        address _owner
    ) public onlyOwner {
        require(RcBooks[_registrationNumber].header.owner == address(0), "Vehicle with this registration number already registered");
        RcBookHeader memory NewHeader = RcBookHeader({
            registrationNumber: _registrationNumber,
            date: _date,
            registrationValidity: _registrationValidity,
            ownerName: _ownerName,
            engineNumber: _engineNumber,
            chassisNumber: _chassisNumber,
            owner: _owner
        });
        RcBooks[_registrationNumber].header = NewHeader;
    }
    
    function addDetails(
        string memory _registrationNumber,
        string memory _fuel,
        string memory _dateofMfgr,
        string memory _modelName,
        string memory _makerName,
        uint256 _seatingCapacity,
        string memory _vehicleColor,
        string memory _isBlackListed,
        uint256 _cubicCapacity,
        string memory _vehicleClass
    ) public onlyOwner {
        RcBookDetails memory NewDetails = RcBookDetails({
            fuel: _fuel,
            dateofMfgr: _dateofMfgr,
            modelName: _modelName,
            makerName: _makerName,
            seatingCapacity: _seatingCapacity,
            vehicleColor: _vehicleColor,
            isBlackListed: _isBlackListed,
            cubicCapacity: _cubicCapacity,
            vehicleClass: _vehicleClass
        });
        RcBooks[_registrationNumber].details = NewDetails;
    }
    
    //Getter
    function getRcbook(string memory _registrationNumber)
        public
        view
        returns (
           RcBookHeader memory,
           RcBookDetails memory
        )
    {
        require(RcBooks[_registrationNumber].header.owner != address(0), "Vehicle with this registration number not found");
        require(msg.sender == ContractOwner || msg.sender == RcBooks[_registrationNumber].header.owner, "Access denied");
        RcBookHeader memory header = RcBookHeader({
            registrationNumber: RcBooks[_registrationNumber].header.registrationNumber,
            date: RcBooks[_registrationNumber].header.date,
            registrationValidity: RcBooks[_registrationNumber].header.registrationValidity,
            ownerName: RcBooks[_registrationNumber].header.ownerName,
            engineNumber: RcBooks[_registrationNumber].header.engineNumber,
            chassisNumber: RcBooks[_registrationNumber].header.chassisNumber,
            owner: RcBooks[_registrationNumber].header.owner
        });
        RcBookDetails memory details = RcBookDetails({
            fuel: RcBooks[_registrationNumber].details.fuel,
            dateofMfgr: RcBooks[_registrationNumber].details.dateofMfgr,
            modelName: RcBooks[_registrationNumber].details.modelName,
            makerName: RcBooks[_registrationNumber].details.makerName,
            seatingCapacity: RcBooks[_registrationNumber].details.seatingCapacity,
            vehicleColor: RcBooks[_registrationNumber].details.vehicleColor,
            isBlackListed: RcBooks[_registrationNumber].details.isBlackListed,
            cubicCapacity: RcBooks[_registrationNumber].details.cubicCapacity,
            vehicleClass: RcBooks[_registrationNumber].details.vehicleClass
        });
        return (
            header,
            details
        );
    }

    //Title change function
    function titleChange(string memory _registrationNumber, address newOwner) public {
        require(RcBooks[_registrationNumber].header.owner == msg.sender, "Only the current owner can transfer the ownership");      
        require(keccak256(abi.encodePacked(RcBooks[_registrationNumber].details.isBlackListed)) == keccak256(abi.encodePacked("NO")), "Cannot change title of blacklisted RC book");
        RcBooks[_registrationNumber].header.owner = newOwner;
    }

    //Blacklisting function
    function blacklistVehicle(string memory _registrationNumber) public onlyOwner {
        require(ContractOwner == msg.sender, "Only the contract owner can perform the action");
        RcBooks[_registrationNumber].details.isBlackListed = "YES";
    }

}