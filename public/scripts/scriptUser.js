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
            if(loginInformations != null){
                informações = {idPost: data[i].idPost, idUsuario: data[i].idUsuario, reportar: false, ação: "verificar"}
                verificarReport()
                verificarCurtida()
                }
        }
    })
    carregarConquistas()
}

let carregarConquistas = () =>{
    fetch("/conquistas", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(loginInformations)
    })
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        let conquistasDiv = document.getElementById('quadradoConquistas')
        let conquistaPrincipal = document.getElementById('cardConquistaEmDestaque')

        for(var i = 0; i < data.length; i++){
            conquista = `
                <div class="boxIconeConquista"><img src="${data[i].imagem}"></div>
                <div class="textoConquista"><p>${data[i].nome}</p></div>
            </div>`
        conquistasDiv.innerHTML += "<div class='cardConquista'>" + conquista
        if(i == 0){
            conquistaPrincipal.innerHTML += conquista // conquista
        }
        }

    document.querySelector("#boxCbPessoalRanking").appendChild(document.querySelector("#ranking").cloneNode(true))
    document.querySelector("#containerBio").appendChild(document.querySelector("#bio").cloneNode(true))
    document.querySelector("#boxCbCED").appendChild(document.querySelector("#cardConquistaEmDestaque").cloneNode(true))
    })
}

let Editar = () =>{
    alert('oi')
}