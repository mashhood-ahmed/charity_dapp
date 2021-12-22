function getBorrowers(account) {
    donator_contract.methods.list_of_borrowers_by_donator_address(account).call((error, result)=>{
        let html = ``;
        result.forEach(element => {
            html += `<li class="list-group-item"> ${element} </li>`;
        })
        $('#content').html(html)
    })
}

function loadPage() {
    getBorrowers(myaccount[0])
}