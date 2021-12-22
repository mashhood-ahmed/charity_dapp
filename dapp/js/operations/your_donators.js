function your_donators(account) {
    borrower_contract.methods.list_of_donators_by_borrower_addr(account).call((error, result)=>{
        let html = ``;
        result.forEach(element => {
            html += `<li class="list-group-item"> ${element} </li>`;
        })
        $('#content').html(html)
    })
}

function loadPage() {
    your_donators(myaccount[0])
}