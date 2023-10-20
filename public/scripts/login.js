
function Login(){
    event.preventDefault()
    const email = document.querySelector("#emailInput").value
    
    const senha = document.querySelector("#passwordInput").value

    verificarSeEmailExisteNoBD(email)
    
}


function verificarSeEmailExisteNoBD(email){

}

