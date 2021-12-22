function distributeDonations() {
    let donator = $('#donator').val()
    let borrower = $('#borrower').val()
    let amount = $('#amount').val()
    if(amount == 0) {
        $('#result').html('Your Donations Is 0.');
        return false;
    }
    chartiyOrg_contract.methods.give_donations_borrowers(donator, borrower, amount).send({from:myaccount[0], gasPrice:web3.utils.toWei("4.1", "Gwei")}, (err,res) => {
        console.log(res);
    })
}

function get_donator_addresses() {
    chartiyOrg_contract.methods.get_all_donators_addresses().call((error, result) => {
        let html = `<option selected='' disabled='' > Select Donator Address </option>`;
        result.forEach(element => {
            html += `<option> ${element} </option>`
        })
        $('#donator').html(html)
    })
}

function get_borrower_addresses() {
    chartiyOrg_contract.methods.get_all_borrowers_adddresses().call((error, result) => {
        let html = `<option selected='' disabled='' > Select Borrower Address </option>`;
        result.forEach(element => {
            html += `<option> ${element} </option>`
        })
        $('#borrower').html(html)
    })
}

function get_donation(donator_addr) {
    donator_contract.methods.total_donations_you_given(donator_addr).call((error, result) => {
        $('#amount').val(result)
    })
}

function loadPage() {
    get_donator_addresses()
    get_borrower_addresses()
}