function addBorrower() {
    let fname = $('#fname').val()
    let lname = $('#lname').val()
    let photo = $('#photo').val()
    let account = $('#address').val()

    console.log(fname + " " + lname + " " + photo + " " + account )
    chartiyOrg_contract.methods.register_borrower(fname, lname, photo, account).send({from:myaccount[0], gasPrice:web3.utils.toWei("4.1", "Gwei")}, (error, result) => {
        if(result) {
            $('#result').html( "Transaction Succesfull " + result)
        }
    })

}

function addInIPFS(event) {
    ret = confirm("Are you sure you want to upload this file?");
    event.stopPropagation();
    event.preventDefault();
    saveToIpfs(event.target.files)
}

function saveToIpfs (files){
    ipfs.add([...files], { progress: (prog) => console.log("received:" +prog) })
        .then((response) => {
            console.log(response);
            let ipfsId = response.path;
            console.log(ipfsId);
            $("#photo").val(ipfsId);
        }).catch((err) => {
        console.error(err);
    })
}