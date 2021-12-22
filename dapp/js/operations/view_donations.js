function getDonations() {
    let account = $('#address').val()
    chartiyOrg_contract.methods.view_donations_by_addr(account).call((error, result) => {
        console.log(result)
        $('#result').html("Your Donations is " + result)
    })
}