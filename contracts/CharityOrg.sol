// SPDX-License-Identifier: MIT
// solium-disable linebreak-style
pragma solidity >= 0.4.22 < 0.9.0;
import "./Donator.sol";
import "./Borrower.sol";

contract CharityOrg {
    Donator donator;
    Borrower borrower;
    address charity_org_contract_addr;
    address donator_contract_addr;
    address borrower_contract_addr;
    mapping(address => uint) donators_donations;
    mapping(address => uint) borrower_donations;
    constructor() {
        charity_org_contract_addr = msg.sender;
        donator = new Donator(address(this));
        borrower = new Borrower(charity_org_contract_addr);
        donator_contract_addr = address(donator);
        borrower_contract_addr = address(borrower);
    }

    modifier is_org() {
        require(charity_org_contract_addr == msg.sender, "you're not charity org.");
        _;
    }

    function register_donator(string calldata _fname, string calldata _lname, string calldata _photo, address _account) public is_org {
        donator.store_new_donator(_fname, _lname, _photo, _account);
    }

    function register_borrower(string calldata _fname, string calldata _lname, string calldata _photo, address _account) public is_org {
        borrower.store_borrower(_fname, _lname, _photo, _account);
    }

    /* invoke from donator contract */
    function receive_donations(uint _amount, address _account) public {
        uint temp_amount = donators_donations[_account];
        temp_amount = temp_amount + _amount;
        donators_donations[_account] = temp_amount;
    }

    /** distribute donations */
    function give_donations_borrowers(address _donator, address _borrower, uint _amount) public is_org returns(string memory) {
        uint amount = donators_donations[_donator];
        if(amount >= _amount) {
            donators_donations[_donator] = donators_donations[_donator] - _amount;
            borrower_donations[_borrower] = borrower_donations[_borrower]  + _amount;
            borrower.store_donators(_borrower, _donator);
            donator.store_borrowers(_donator, _borrower);
            return(string(abi.encodePacked(_amount, " Transfered")));
        }
        return(string(abi.encodePacked("Nothing Transfered.")));
    }   

    /** invoke from borrower */
    function get_total_donations_by_borrower_addr(address _borrower) public view returns(uint) {
        return borrower_donations[_borrower];
    }

    /** invoke from donator contract */
    function view_donations_by_addr(address _account) public view returns(uint) {
        return donators_donations[_account];
    }

    function get_all_donators_addresses() public view returns(address [] memory) {
        return donator.get_donators_address();
    }

    function get_all_borrowers_adddresses() public view returns(address [] memory) {
        return borrower.get_borrowers_address();
    }

    function get_donator_address() public view returns(address) {
        return donator_contract_addr;
    }

    function get_borrower_address() public view returns(address) {
        return borrower_contract_addr;
    }


}