// INTERAÇÕES
boxReport = document.querySelector('.confirmarDenuncia')
confirmar = document.getElementById('ConfirmarButton')

let reportar = elemento =>{
    botão = elemento
    document.body.style="pointer-events: none; user-select: none;"
    boxReport.style = "display: grid; pointer-events: all; user-select: auto;"
}

let confirmarDenuncia = () =>{
    idPost = botão.parentElement.parentNode
    idPost = idPost.parentNode
    loginInformations = JSON.parse(localStorage.getItem("login"))

    if(loginInformations == null || loginInformations == "null"){
        alert("Para fazer isso você deve estar logado")
        fecharDenuncia()
        return
    }

    informações = {idPost: (idPost).id, idUsuario: loginInformations.idUsuario}

    fetch("/jareportou", {
        method:"POST",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify(informações)
    })
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        if(data.resposta != "True"){
            botão.style = "filter: invert(18%) sepia(74%) saturate(2693%) hue-rotate(344deg) brightness(81%) contrast(110%)"  
        }
        fecharDenuncia()
    })
}

let fecharDenuncia = () =>{
    document.body.style="pointer-events: all; user-select: auto;"
    boxReport.style = "display: none"
}

let curtir = elemento =>{
    classe = elemento.parentElement.parentNode
    classe = classe.parentElement.parentNode

    if(loginInformations == null || loginInformations == "null"){
        alert("Para fazer isso você deve estar logado")
        fecharDenuncia()
        return}
}

let descurtir = elemento =>{
    classe = elemento.parentElement.parentNode
    classe = classe.parentElement.parentNode

    if(loginInformations == null || loginInformations == "null"){
        alert("Para fazer isso você deve estar logado")
        fecharDenuncia()
        return}
}

let carregarPosts = () => {
    fetch("/posts")
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
            if(JSON.parse(localStorage.getItem("login")) == null){return} 

            informações = {idPost: data[i].idPost, idUsuario: data[i].idUsuario, reportar: false}
            fetch("/jareportou", {
                method:"POST",
                headers:{"Content-type": "application/json"},
                body:JSON.stringify(informações)
            })
            .then(response => response.json()) // Converte a resposta em um objeto JavaScript
            .then(data => {
                if(data.resposta == "True"){
                    post = document.getElementById(data.idPost)
                    botão = post.querySelector('#report')
                    botão.style = "filter: invert(18%) sepia(74%) saturate(2693%) hue-rotate(344deg) brightness(81%) contrast(110%)"
                }})
        }
    })
}

function adicionarPost(idPost, imageLink,postName,name,content,topics, pontos) {
    let postDiv = document.getElementById('boxPosts')
    
    post = document.createElement("div")
    post.setAttribute("class", "postResult")
    post.setAttribute("id", `${idPost}`)
    conteudo = ''
    conteudo += `
    <div class="static">
        <div class="interações">
            <div class="curtidas">
                <span id="quantasCurtidas">${pontos}</span> 
                <button id="like" onclick="curtir(this)"> <img src="images/setaCima.png">  </button>
                <button id="dislike" onclick="descurtir(this)"> <img src="images/setaBaixo.png"> </button>
            </div>
            <button id="report" onclick="reportar(this)"> <img src="images/report.png"> </button>
        </div>
    </div>`

    if(imageLink != null){
        conteudo += `<div class="capa" style="background-image: url('${imageLink}');"></div>`
        conteudo += `<div> <a href="#"><h1>${postName}</h1><a><i>By <a href="#">${name}</a></i> <p>${content}</p>`
    } else{
        conteudo += `<div class="semCapa"> <a href="#"><h1>${postName}</h1> <a class="in" href="#">By ${name}</a> <p>${content}</p>`
    }
    conteudo += '<div class="in">'
    for(i=0;i<topics.length-1;i++){
        conteudo += ` <a href="#">${topics[i]}</a> <span> | </span>`
    }

    conteudo += ` <a href="#">${topics[topics.length-1]}</a> </div> </div>`

    post.innerHTML = conteudo

    postDiv.appendChild(post);
}

searchInput = document.getElementById('searchContent')

searchInput.addEventListener("keypress", function(event) { // se o usuário está no input de search
    if (event.key === "Enter") { // se ele apertou enter
      search()
    }
  });

let search = () =>{
    informações = {content: searchInput.value}
    if(informações.content == ''){
        informações.content = ' '
    }

    fetch("/searchposts", {
        method:"POST",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify(informações)
    })
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        posts = document.querySelectorAll('.postResult') // remove todos posts antigos
        for(var j=0; j < posts.length; j++){
            posts[j].parentNode.removeChild(posts[j]);
        }

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