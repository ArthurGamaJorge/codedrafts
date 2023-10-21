window.onload = function(){ 
    divLogin = document.querySelector('.loginarea')
    document.body.style="pointer-events: none; user-select: none;"
    divLogin.style = "pointer-events: all; user-select: auto;"
}

let Login = () =>{
    event.preventDefault()
    const email = document.querySelector("#emailInput").value
    const senha = document.querySelector("#passwordInput").value

    if(true){
        fecharBox()
    } else{
        alert("Informações de login incorretas")
    }
}

let fecharBox = () => {
    divLogin.style = "display: none"
    document.body.style="pointer-events: all; user-select: auto;"
}
