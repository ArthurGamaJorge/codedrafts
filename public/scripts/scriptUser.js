window.onload = function(){

    loginInformations = JSON.parse(localStorage.getItem("login"))
    botãoReport = document.getElementById('btnConfigs')
    
    var path = window.location.pathname;
    var page = path.split("/").pop();

    if(page == "user.html"){
        document.body.setAttribute("id", loginInformations.idUsuario)
        document.getElementById('userAvatar').src = loginInformations.fotoPerfil
        document.getElementById('nomeDoUsuario').innerHTML = loginInformations.nome
        document.getElementById('userName').innerHTML = loginInformations.username
        document.getElementById('pontos').innerHTML = loginInformations.pontosTotais
        document.getElementById('bioText').innerText = loginInformations.descricao
        
        Informations = loginInformations
    } else{
        Informations = {
            idUsuario: document.getElementById('idUsuario').textContent,
            username: document.getElementById('userName').textContent
        }
    }

    fetch("/verificarUsuario", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(loginInformations)
    })

    fetch("/postsUser", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(Informations)
    })
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        for(var i = 0; i < data.length; i++){
            if(data[i].tópicos != undefined && data[i].tópicos != null){
                data[i].tópicos = data[i].tópicos.split(',')
            } else{
                data[i].tópicos = ['']
            }
            adicionarPost(
                data[i].idPost,
                data[i].capa,
                data[i].titulo,
                data[i].nome,
                data[i].conteudo,
                data[i].tópicos,
                data[i].pontosPost,
                data[i].username
            )
            if(loginInformations != null){
                informações = {idPost: data[i].idPost, idUsuario: loginInformations.idUsuario, idOutroUsuario: document.body.id, ação: "verificar"}
                verificarReport("post")
                verificarCurtida("post")
                }
        }
        info = {idUsuario: loginInformations.idUsuario, idOutroUsuario: document.body.id, ação: "verificar"}
        verificarReport("usuario", info)
    })
    carregarConquistas()

    fetch("/comentariosuser", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(Informations)
    }).then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        for(var i = 0; i < data.length; i++){
            adicionarComentário(
                data[i].idPost,
                data[i].titulo,
                data[i].idComentario,
                data[i].nome,
                data[i].fotoPerfil,
                data[i].pontosComentario,
                data[i].username,
                data[i].texto
            )
            if(loginInformations != null){
                informações = {idComentario: data[i].idComentario, idUsuario: loginInformations.idUsuario, ação: "verificar"}
                verificarReport("comentario")
                verificarCurtida("comentario")
            }
        }
    })
}

let adicionarComentário = (idPost, titulo, idComentario, nome, fotoPerfil, pontosComentario, username, texto) =>{
    let comentDiv = document.getElementById('boxComentarios')
    
    let comentario = document.createElement("div")
    comentario.setAttribute("id", `${idComentario}`)
    comentario.setAttribute("class", `comentario`)
    let conteudo = ''
    conteudo += `
        <div class="informacoes">
            <a href="../post/${idPost}">${titulo}</a>
            <div class="boxComentarioAvatar">
                <img class="avatar" src="${fotoPerfil}">
            </div>

            <div class="containerNome">
                <p class="nomeAutorComentario">${nome}</p>
            </div>
        </div>

        <div class="boxTextoComentario">
            <p class="texto">${texto}</p>
        </div>

        <div class="BoxCurtidasComentario">
            <div class="interaçõesComent">
                <div class="curtidas">
                    <span id="quantasCurtidas">${pontosComentario}</span> 
                    <button id="like" onclick="curtir(this, 'comentario')"> <img src="https://i.imgur.com/Z6N47DN.png">  </button>
                    <button id="dislike" onclick="descurtir(this, 'comentario')"> <img src="https://i.imgur.com/QQ1qeod.png"> </button>
                    <button id="report" onclick="reportarComent(this)"> <img src="https://i.imgur.com/nzxHb7H.png"> </button>
                </div>
            </div>
        </div>`
    

    if(loginInformations != null){
        if(username == loginInformations.username){
            conteudo += `<div class="postActions "> <button onclick='removerComentario(this)' class='RemoverPostButton'>X</button> </div>` 
        }
    }

    comentario.innerHTML = conteudo

    comentDiv.appendChild(comentario);
}


let carregarConquistas = () =>{
    fetch("/conquistas", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(Informations)
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
    document.querySelector("#boxCbConquistas").appendChild(document.querySelector("#quadradoConquistas").cloneNode(true))
})
}

let reportarUser = () =>{
    boxReport = document.querySelector('.DenunciaUser')
    document.body.style="pointer-events: none; user-select: none;"
    boxReport.style = "display: grid; pointer-events: all; user-select: auto;"
}
