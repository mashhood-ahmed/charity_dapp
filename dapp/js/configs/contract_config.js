let charityOrgContractAddress = "0x7588Cf8e3950463726BC5802134303E28936Cb54";
let donatorContractAddress = "";
let borrowerContractAddress = "";

let chartiyOrg_contract = "";
let donator_contract = "";
let borrower_contract = "";

const initilizeMainContract = async (web3) => {
    const charity_data = await $.getJSON('./js/contracts/CharityOrg.json');
    chartiyOrg_contract = await new web3.eth.Contract(charity_data.abi, charityOrgContractAddress);
    console.log("charity org contract object is loaded " + chartiyOrg_contract);
    return chartiyOrg_contract;
}

const getDonatorContract = async (web3) => {
    const donator_data = await $.getJSON("./js/contracts/Donator.json");
    await chartiyOrg_contract.methods.get_donator_address().call((error, result) => {
        if(result) {
            donatorContractAddress = result;
            donator_contract = new web3.eth.Contract(donator_data.abi, donatorContractAddress);
            console.log("loaded donator address "+result);
        }
    });
}

const getBorrowerContract = async (web3) => {
    const borrower_data = await $.getJSON("./js/contracts/Borrower.json");
    await chartiyOrg_contract.methods.get_borrower_address().call((error, result) => {
        if(result) {
            borrowerContractAddress = result;
            borrower_contract = new web3.eth.Contract(borrower_data.abi, borrowerContractAddress);
            console.log("loaded borrower address "+result);
        }
        
    });
}

async function initSetup() {
    const web3 = await getWeb3();
    await initilizeMainContract(web3);
    await getDonatorContract(web3);
    await getBorrowerContract(web3);
    try{
        loadPage();
    }
    catch(error){
        console.log("Load page is not defined by child page :"+error);
    }
}

initSetup();
