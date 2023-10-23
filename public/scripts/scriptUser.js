window.onload = function(){
    loginInformations = localStorage.getItem("login")
    loginInformations = JSON.parse(loginInformations)
    if(loginInformations.fotoPerfil == 'noUserImage.png'){
        document.getElementById('userAvatar').src = "images/" + loginInformations.fotoPerfil
    }
        document.getElementById('nomeDoUsuario').innerHTML = loginInformations.nome
        document.getElementById('userName').innerHTML = loginInformations.username
        document.getElementById('pontos').innerHTML = loginInformations.pontosTotais
        document.getElementById('bioText').innerText = loginInformations.descricao

    document.querySelector("#boxCbPessoalRanking").appendChild(document.querySelector("#ranking").cloneNode(true))
    document.querySelector("#containerBio").appendChild(document.querySelector("#bio").cloneNode(true))
    document.querySelector("#boxCbCED").appendChild(document.querySelector("#cardConquistaEmDestaque").cloneNode(true))
}