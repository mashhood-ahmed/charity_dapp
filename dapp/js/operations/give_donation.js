function giveDonation() {
    let amount = $('#value').val()
    let account = $('#address').val()
    donator_contract.methods.give_donation().send({from: account, gas: 3000000, value: amount}, function(err, res){
        $('#result').html(`Transaction Successfull ${res} `)
    });
}

function loadPage() {
    $('#address').val(myaccount[0])
}