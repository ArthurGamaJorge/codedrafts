window.onload = function(){
    loginInformations = localStorage.getItem("login")
    loginInformations = JSON.parse(loginInformations)
        document.getElementById('userAvatar').src = loginInformations.fotoPerfil
        document.getElementById('nomeDoUsuario').innerHTML = loginInformations.nome
        document.getElementById('userName').innerHTML = loginInformations.username
        document.getElementById('pontos').innerHTML = loginInformations.pontosTotais
        document.getElementById('bioText').innerText = loginInformations.descricao
}