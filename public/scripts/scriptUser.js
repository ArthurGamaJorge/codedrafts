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
                informações = {idPost: data[i].idPost, idUsuario: loginInformations.idUsuario, idOutroUsuario: document.body.id, reportar: false, ação: "verificar"}
                verificarReport()
                verificarCurtida()
                }
        }
        verificarReportUser()
    })
    carregarConquistas()
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
    })
}

let reportarUser = () =>{
    boxReport = document.querySelector('.DenunciaUser')
    document.body.style="pointer-events: none; user-select: none;"
    boxReport.style = "display: grid; pointer-events: all; user-select: auto;"
}

let confirmarDenunciaUsuario = () =>{
    if(loginInformations == null || Object.keys(loginInformations).length == 0){
        alert("Para fazer isso você deve estar logado")
        fecharDenuncia()
        return
    }
    informações = {idOutroUsuario: document.body.id, idUsuario: loginInformations.idUsuario}
    verificarReportUser()
    botãoReport.classList.add('Reportado')
}

let verificarReportUser = () =>{
    fetch("/jareportouUser", {
        method:"POST",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify(informações)
    })
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        if(data.resposta == "True"){
            botãoReport.classList.add('Reportado')
        }
        fecharDenuncia()
    })
}
