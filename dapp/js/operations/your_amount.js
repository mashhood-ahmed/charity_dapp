function get_borrower_amount(addr) {
    chartiyOrg_contract.methods.get_total_donations_by_borrower_addr(addr).call((err, res) => {
        $('#amount').val(res)
    })
}

function loadPage() {
    let account = myaccount[0];
    get_borrower_amount(account);
}