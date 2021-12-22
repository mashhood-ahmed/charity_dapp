let ipfs_gateway = "localhost";
let ipfs_port = "5001"; 
const ipfs = window.IpfsHttpClient.create({ host: ipfs_gateway, port: ipfs_port })
console.log("IPFS object initilized successfully.." + ipfs)
async function test() {
    const {cid} =  await ipfs.add("Hello World")
    console.log(cid)
}
test()