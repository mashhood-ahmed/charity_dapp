function getBorrowers() {
    borrower_contract.methods.get_all_borrowers().call( (error, result) => {
        console.log(result)
        result.forEach(element => {
            console.log(element[0]) 
            $('#content').append(`<tr><td>${element[0]}</td><td>${element[1]}</td><td><img id="myImg" width="100" height="100" /></td><td>${element[3]}</td></tr>`)
            const cid = element[2]
            loadImage(cid)
        })
    })
}

async function loadImage(validCID) {
    for await (const file of ipfs.get(validCID)) {
      console.log(file.path)
      console.log(file);
      //files.forEach((file) => {
        console.log(file.path);
        const content = []
        if(file.content) {
          for await (const chunk of file.content) {
              content.push(chunk)
          }
      }
        document.getElementById('myImg').src = URL.createObjectURL(
          new Blob(content, { type: 'image/jpeg' } /* (1) */)
        );
    }
  }


function loadPage() {
    getBorrowers()
}