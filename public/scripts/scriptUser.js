window.onload = function(){
    loginInformations = localStorage.getItem("login")
    loginInformations = JSON.parse(loginInformations)
        document.getElementById('userAvatar').src = loginInformations.fotoPerfil
        document.getElementById('nomeDoUsuario').innerHTML = loginInformations.nome
        document.getElementById('userName').innerHTML = loginInformations.username
        document.getElementById('pontos').innerHTML = loginInformations.pontosTotais
        document.getElementById('bioText').innerText = loginInformations.descricao

    fetch("/postsUser", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(loginInformations)
    })
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        for(var i = 0; i < data.length; i++){
            data[i].tópicos = data[i].tópicos.split(',')
            adicionarPost(
                data[i].idPost,
                data[i].capa,
                data[i].titulo,
                data[i].usuário,
                data[i].conteudo,
                data[i].tópicos,
                data[i].pontosPost
            )
        }
    })
}