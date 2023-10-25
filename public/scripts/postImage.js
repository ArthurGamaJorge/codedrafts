function uuidv4() { // gerar id único para imagem
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  
let openFile = imagem =>{
    let input = document.createElement('input');
    input.setAttribute('id', 'imgfile')
    input.type = 'file';
    imageID = uuidv4();
    input.onchange = _ => {
        file = input.files[0];
        // Create new file so we can rename the file
        blob = file.slice(0, file.size, "image/jpeg");
        newFile = new File([blob], `${imageID}_image.jpeg`, { type: "image/jpeg" });
        // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
        formData = new FormData();
        formData.append("imgfile", newFile);
        fetch("/upload", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.text())
          .then(data => {
            if(data == "Imagem enviada"){
                document.getElementById(imagem).src = `https://storage.googleapis.com/imagesdrafts/${imageID}_image.jpeg`
            }})
        loginInformations = JSON.parse(localStorage.getItem("login"))
        loginInformations.fotoPerfil = `https://storage.googleapis.com/imagesdrafts/${imageID}_image.jpeg`
        localStorage.setItem("login", JSON.stringify(loginInformations));
        setTimeout(7000)
    };
      input.click();

  }