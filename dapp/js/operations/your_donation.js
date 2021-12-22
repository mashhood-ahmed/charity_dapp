function getDonations(account) {
    donator_contract.methods.total_donations_you_given(account).call((error, result) => {
        $('#amount').val(result)
    })
}

function loadPage() {
    let account = myaccount[0] 
    getDonations(account)
}