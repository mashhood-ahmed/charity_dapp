function getDonator() {
    let account = $('#address').val()
    donator_contract.methods.view_donator_by_addr(account).call((error, result) => {
        let html = `<table class="table table-bordered text-center table-responsive" >
                        <thead>
                            <tr>
                                <th> First Name </th>
                                <th> Last Name </th>
                                <th> Photo </th>
                                <th> Address </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> ${result[0]} </td>
                                <td> ${result[1]} </td>
                                <td> <img id="myImg" width="100" height="100" /> </td>
                                <td> ${result[3]} </td>
                            </tr>
                        </tbody>
                    </table>`
        console.log(result)
        let cid = result[2];
        loadImage(cid)
        $('#result').html(html)
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