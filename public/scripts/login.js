window.onload = function(){ 
    carregarRank()
    carregarFiltros()
    divLogin = document.querySelector('.loginarea')
    loginInformations = JSON.parse(localStorage.getItem("login"))

    if(loginInformations == null || Object.keys(loginInformations).length == 0){
        document.body.style="pointer-events: none; user-select: none;"
        divLogin.style = "display: block; pointer-events: all; user-select: auto;"
        Loginaberto = true
        search()
    } else{
        informações = {
            email: loginInformations.email,
            senha: loginInformations.senha
        }
        logar(informações)
    }
}

function logar(informações){
    fetch("/verificarUsuario", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(informações)
    })
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        if(data != "" && data != null){
            fecharBox()
            informações = {
                idUsuario: data[0].idUsuario,
                email: data[0].email,
                senha: data[0].senha,
                nome: data[0].nome,
                username: data[0].username,
                descricao: data[0].descricao,
                fotoPerfil: data[0].fotoPerfil,
                pontosTotais: data[0].pontosTotais
            }
            localStorage.setItem("login", JSON.stringify(informações)); 
            loginInformations = JSON.parse(localStorage.getItem("login"))
            document.getElementById('iconUser').src = loginInformations.fotoPerfil
            document.getElementById('draftsUserIcon').src = loginInformations.fotoPerfil
            document.getElementById('iconUser').style = "filter: invert(0%)"
            search()
        } else{
            alert("Informações de login incorretas")
            Loginaberto = true
            document.body.style="pointer-events: none; user-select: none;"
            divLogin.style = "display: block; pointer-events: all; user-select: auto;"
        }
    })
}

function Login(){
    var informações = {
        email: document.querySelector("#emailInput").value,
        senha: document.querySelector("#passwordInput").value
    }

    logar(informações)
}

function fecharBox() {
    divLogin.style = "display: none"
    document.body.style="pointer-events: all; user-select: auto;"
    Loginaberto = false
}

document.body.addEventListener("keypress", function(event) { // se o usuário está na área de login
    if(Loginaberto){
    if (event.key === "Enter") { // se ele apertou enter
      document.getElementById('submitInput').click()
    }
}});

searchInput.addEventListener("keypress", function(event) { // se o usuário está no input de search
    if (event.key === "Enter") { // se ele apertou enter
      search()
    }
  });