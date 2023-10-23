window.onload = function(){ 
    carregarPosts()
    divLogin = document.querySelector('.loginarea')
    loginInformations = localStorage.getItem("login")

    if(loginInformations == null || loginInformations == "null"){
        document.body.style="pointer-events: none; user-select: none;"
        divLogin.style = "display: block; pointer-events: all; user-select: auto;"
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
        if(data != null){
            fecharBox()
            informações = {
                email: data.email,
                senha: data.senha,
                nome: data.nome,
                username: data.username,
                descricao: data.descricao,
                fotoPerfil: data.fotoPerfil,
                pontosTotais: data.pontosTotais
            }
            localStorage.setItem("login", JSON.stringify(informações));
            if(data.fotoPerfil == 'noUserImage.png'){
                document.getElementById('iconUser').src = __dirname, './public' + data.fotoPerfil
            }     
        } else{
            alert("Informações de login incorretas")
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
}
