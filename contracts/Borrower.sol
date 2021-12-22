// SPDX-License-Identifier: MIT
// solium-disable linebreak-style
pragma solidity >= 0.4.22 < 0.9.0;

import "./CharityOrg.sol";

contract Borrower {
    struct borrower_atrr {
        string fname;
        string lname;
        string photo;
        address account;
    }
    CharityOrg orgObject;
    borrower_atrr [] borrowers;
    address charity_org_contract_addr;
    mapping(address => address[]) donaters_list;
    constructor(address _charity_org) {
        charity_org_contract_addr = _charity_org;
        orgObject = CharityOrg(charity_org_contract_addr);

    }

    function store_borrower(string calldata _fname, string calldata _lname, string calldata _photo, address _account) external {
        borrower_atrr memory temp;
        temp.fname = _fname;
        temp.lname = _lname;
        temp.photo = _photo;
        temp.account = _account;
        borrowers.push(temp);
    }

    function store_donators(address _borrower, address _donator) public {
        donaters_list[_borrower].push(_donator);
    }

    function get_all_borrowers() public view returns(borrower_atrr [] memory borrower_atr) {
        borrower_atr = new borrower_atrr[](borrowers.length);
        for(uint i=0; i<borrowers.length; i++) {
            borrower_atr[i] = borrowers[i];
        }
    }

    /** your donators */
    function list_of_donators_by_borrower_addr(address _borrower) public view returns(address[] memory) {
        address account = _borrower;
        require(is_borrower(account) == true, "you're not allowed to do so.");
        return donaters_list[_borrower];
    }

    /* view borrowers by address */
    function view_borrower_by_addr(address account) public view returns(borrower_atrr memory) {
        require(is_borrower(account) == true, "you're not allowed to do so.");
        for(uint i=0; i<borrowers.length; i++) {
            if(borrowers[i].account == account) {
                return borrowers[i];
            }
        }
        borrower_atrr memory temp;
        return temp;
    }

    function get_borrowers_address() public view returns(address [] memory) {
        address [] memory temp_arr = new address[](borrowers.length);
        for(uint i=0; i<borrowers.length; i++) {
            temp_arr[i] = borrowers[i].account;
        }
        return temp_arr;
    }

      /** your donations */
    function total_donations_you_received(address account) public view returns(uint) {
        require(is_borrower(account) == true, "you're not register as borrower");
        uint amount = orgObject.get_total_donations_by_borrower_addr(account);
        return amount;
    }

    function is_borrower(address _account) public view returns(bool) {
        for(uint i=0; i<borrowers.length; i++) {
            if(borrowers[i].account == _account) {
                return true;
            }
        }
        return false;
    }

}