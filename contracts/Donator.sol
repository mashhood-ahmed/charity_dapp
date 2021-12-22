// SPDX-License-Identifier: MIT
// solium-disable linebreak-style
pragma solidity >= 0.4.22 < 0.9.0;

import "./CharityOrg.sol";

contract Donator {
    struct donator_attr {
        string fname;
        string lname;
        string photo;
        address account;
    }
    donator_attr [] donators;
    address charity_org_contract_addr;
    mapping(address => address[]) borrowers_list;
    CharityOrg orgObject;
    
    constructor(address _charity_org) {
        charity_org_contract_addr = _charity_org;
        orgObject = CharityOrg(_charity_org);
    }

    modifier is_org() {
        require(charity_org_contract_addr == msg.sender, "you're not allowed to call this function.");
        _;
    }

    function store_new_donator(string calldata _fname, string calldata _lname, string calldata _photo, address _account ) public is_org returns(bool) {
        donator_attr memory tmp_donator;
        tmp_donator.fname = _fname;
        tmp_donator.lname = _lname;
        tmp_donator.photo = _photo;
        tmp_donator.account = _account;
        donators.push(tmp_donator);
        return true;
    }

    /** view donator by address */
    function view_donator_by_addr(address _account) public view returns(donator_attr memory) {
        for(uint i=0; i<donators.length; i++) {
            if(donators[i].account == _account) {
                return donators[i];
            }
        }
        donator_attr memory temp;
        return temp;
    }

    function get_donators_address() public view returns(address [] memory) {
        address [] memory temp_arr = new address[](donators.length);
        for(uint i=0; i<donators.length; i++) {
            temp_arr[i] = donators[i].account;
        }
        return temp_arr;
    }


    function give_donation() public payable returns(bool) {
        require(msg.value > 0, "you can't donate 0 amount.");
        uint amount = msg.value;
        address account = msg.sender;
        require(is_donator(account) == true, "you're not allowed to give donations");
        orgObject.receive_donations(amount, account);
        return true;
    }

    function store_borrowers(address _donator, address _borrower) public {
        borrowers_list[_donator].push(_borrower);
    }

    /** your donations */
    function total_donations_you_given(address _account) public view returns(uint) {
        address account = _account;
        require(is_donator(account) == true, "you're not allowed");
        uint amount = orgObject.view_donations_by_addr(account);
        return amount;
    }

    function get_all_donators() public view returns(donator_attr [] memory donators_arr) {
        donators_arr = new donator_attr[](donators.length);
        for(uint i=0; i<donators.length; i++) {
            donators_arr[i] = donators[i];
        }
    }

    /** your borrowers */
    function list_of_borrowers_by_donator_address(address account) public view returns(address[] memory) {
        require(is_donator(account) == true, "you're not allowed");
        return borrowers_list[account];
    }

    function is_donator(address _account) public view returns(bool) {
        for(uint i=0; i<donators.length; i++) {
            if(donators[i].account == _account) {
                return true;
            }
        }
        return false;
    }       

}