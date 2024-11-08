confirmar = document.getElementById('ConfirmarButton')
bloquear = false

let reportar = elemento =>{
    boxReport = document.querySelector('.confirmarDenuncia')
    botão = elemento
    document.body.style="pointer-events: none; user-select: none;"
    boxReport.style = "display: grid; pointer-events: all; user-select: auto;"
}

let confirmarDenuncia = alvo =>{
    informações = {}
    idPost = Number(botão.parentElement.parentNode.parentNode.id);
    if (isNaN(idPost) && idPost != 0) {
        idPost = Number(botão.parentElement.parentNode.parentNode.parentNode.id);
    }

    if(alvo == "usuario"){
        informações = {idOutroUsuario: document.body.id, idUsuario: loginInformations.idUsuario}
    } else{
        if(alvo == "post"){
            informações = {idPost: idPost, idUsuario: loginInformations.idUsuario}
        } else{
            informações = {idComentario: (botão.parentElement.parentNode.parentNode.parentNode).id, idUsuario: loginInformations.idUsuario}
        }
    }

    if(loginInformations == null || Object.keys(loginInformations).length == 0){
        alert("Para fazer isso você deve estar logado")
        fecharDenuncia()
        return
    }

    fetch(`/jareportou${alvo}`, {
        method:"POST",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify(informações)
    })
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        console.log(data.resposta)
        if(data.resposta == "True"){
            if(alvo == "usuario"){
                document.getElementById('btnConfigs').classList.add("Reportado")
            } 
            else{
                if(alvo == "post"){
                    alvo = document.getElementById(informações.idPost)
                } else{
                    alvo = document.getElementById(informações.idPost)
                }
                botão = alvo.querySelector('#report')
                botão.classList.add('Reportado')
            }
        }
        fecharDenuncia()
    })
}

let fecharDenuncia = () =>{
    document.body.style="pointer-events: all; user-select: auto;"
    boxReport.style = "display: none"
}


let curtir = (ButtonCurtir, alvo) =>{
    if(bloquear){ return }
    bloquear = true

    let classe = (ButtonCurtir.parentElement.parentNode).parentElement.parentNode
    let Buttondescurtir = classe.querySelector('#dislike'); 
    let pontuação = classe.querySelector('#quantasCurtidas')

    try{
        nome = (classe.querySelector('#créditos').textContent).split(' ').join('')
        pontuaçãoRank = (document.querySelector(`#${nome}`)).querySelector('#pontos')
    }catch{}

    if(loginInformations == null || Object.keys(loginInformations).length == 0){
        alert("Para fazer isso você deve estar logado")
        return
    } else{
        modificação = 1
        if(ButtonCurtir.classList.contains('Curtido')){
            pontuação.innerHTML = Number(pontuação.textContent) - modificação
            try{
                pontuaçãoRank.innerHTML = Number(pontuaçãoRank.textContent) - modificação
            }catch{}

            ButtonCurtir.classList.remove('Curtido')
        } else{
            if(Buttondescurtir.classList.contains('Descurtido')){modificação = 2}

            pontuação.innerHTML = Number(pontuação.textContent) + modificação

            try{
                pontuaçãoRank.innerHTML = Number(pontuaçãoRank.textContent) + modificação
            }catch{}

            ButtonCurtir.classList.add('Curtido')
            Buttondescurtir.classList.remove('Descurtido')
        }
        informações = {}
        if(alvo == "post"){
            informações = {idUsuario: loginInformations.idUsuario, idPost: classe.id, ação: "curtir"}
        } else{
            informações = {idUsuario: loginInformations.idUsuario, idComentario: classe.id, ação: "curtir"}
        }
        fetch(`/curtidas${alvo}`, {
            method:"POST",
            headers:{"Content-type": "application/json"},
            body:JSON.stringify(informações)
        }).then(response => {return response.json();
        }).then(data => {
            if (data.sucesso) {
                bloquear = false
            } 
        })
}
}

let descurtir = (Buttondescurtir, alvo) =>{
    if(bloquear){ return }
    bloquear = true

    let classe = (Buttondescurtir.parentElement.parentNode).parentElement.parentNode
    let ButtonCurtir = classe.querySelector('#like'); 
    let pontuação = classe.querySelector('#quantasCurtidas')

    try{
        nome = (classe.querySelector('#créditos').textContent).split(' ').join('')
        pontuaçãoRank = (document.querySelector(`#${nome}`)).querySelector('#pontos')
    }catch{}

    if(loginInformations == null || Object.keys(loginInformations).length == 0){
        alert("Para fazer isso você deve estar logado")
        return
    } else{
        modificação = 1
        if(Buttondescurtir.classList.contains('Descurtido')){
            pontuação.innerHTML = Number(pontuação.textContent) + modificação

            try{
                pontuaçãoRank.innerHTML = Number(pontuaçãoRank.textContent) + modificação
            } catch{}

            Buttondescurtir.classList.remove('Descurtido')
        } else{
            if(ButtonCurtir.classList.contains('Curtido')){modificação = 2}
            
            pontuação.innerHTML = Number(pontuação.textContent) - modificação

            try{
                pontuaçãoRank.innerHTML = Number(pontuaçãoRank.textContent) - modificação
            } catch{}

            Buttondescurtir.classList.add('Descurtido')
            ButtonCurtir.classList.remove('Curtido')
        }
        informações = {}
        if(alvo == "post"){
            informações = {idUsuario: loginInformations.idUsuario, idPost: classe.id, ação: "descurtir"}
        } else{
            informações = {idUsuario: loginInformations.idUsuario, idComentario: classe.id, ação: "descurtir"}
        }
        fetch(`/curtidas${alvo}`, {
            method:"POST",
            headers:{"Content-type": "application/json"},
            body:JSON.stringify(informações)
        }).then(response => {return response.json();
        }).then(data => {
            if (data.sucesso) {
                bloquear = false
            } 
        })
    }
}

let carregarFiltros = () =>{
    fetch("/filters")
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        const selectInput = document.querySelector('#SelectTopicos'); 
        let filterDiv = document.getElementById('filter')

        for(var i = 0; i < data.length; i++){
            let topico = new Option(`${data[i].nome}`, `${data[i].idTopico}`);
            selectInput.add(topico);

            filtro = `<input type="checkbox" oninput='search()' class='filtros' value="${data[i].nome}" id="${data[i].nome}"style="transform: scale(2); margin: 20px;"><label>${data[i].nome}</label><br>`
            filterDiv.innerHTML += filtro
        }
    })
}

let verificarReport = (alvo, informações) =>{ // alvo pode ser post, comentario ou usuario
    fetch(`/jareportou${alvo}`, {
        method:"POST",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify(informações)
    })
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        if(data.resposta == "True"){
            if(alvo == "usuario"){
                botãoReport.classList.add('Reportado')
            } else{
                if(alvo == "post"){
                    alvo = document.getElementById(data.idPost)
                } else{
                    alvo = document.getElementById(data.idComentario)
                }
                botão = alvo.querySelector('#report')
                botão.classList.add('Reportado')
            }
        }})
}

let verificarCurtida = alvo =>{
    fetch(`/curtidas${alvo}`, {
        method:"POST",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify(informações)
    })
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        if(data.resposta != ""){
            if(alvo == "post"){
                alvo = document.getElementById(data.idPost)
            } else{
                alvo = document.getElementById(data.idComentario)
            }
            if(data.curtido == false){
                botão = alvo.querySelector('#dislike')
                botão.classList.add('Descurtido')
            } else{
                botão = alvo.querySelector('#like')
                botão.classList.add('Curtido')
            }
        }})
}

function adicionarPost(idPost, imageLink,postName,name,content,topics,pontos,username) {
    let postDiv = document.getElementById('boxPosts')
    
    let post = document.createElement("div")
    post.setAttribute("class", "postResult")
    post.setAttribute("id", `${idPost}`)
    let conteudo = ''
    conteudo += `
    <div class="static">
        <div class="interações">
            <div class="curtidas">
                <span id="quantasCurtidas">${pontos}</span> 
                <button id="like" onclick="curtir(this, 'post')"> <img src="https://i.imgur.com/Z6N47DN.png">  </button>
                <button id="dislike" onclick="descurtir(this, 'post')"> <img src="https://i.imgur.com/QQ1qeod.png"> </button>
            </div>
            <button id="report" onclick="reportar(this)"> <img src="https://i.imgur.com/nzxHb7H.png"> </button>
        </div>
    </div>`

    if(imageLink != null){
        conteudo += `<div class="capa" style="background-image: url('${imageLink}');"></div>`
        conteudo += `<div> <a href="../post/${idPost}"><h1>${postName}</h1><a><i>Por <a href="../user/${username}" id="créditos">${name}</a></i> <p>${content}</p>`
    } else{
        conteudo += `<div class="semCapa"> <a href="../post/${idPost}"><h1>${postName}</h1><a><i>Por <a href="../user/${username}" id="créditos">${name}</a></i> <p>${content}</p>`
    }
    conteudo += '<div class="in">'
    for(i=0;i<topics.length-1;i++){
        conteudo += ` <a href="#" style="text-decoration:none;">${topics[i]}</a> <span> | </span>`
    }

    conteudo += ` <a href="#" style="text-decoration:none;">${topics[topics.length-1]}</a> </div> </div>`
    
    if(loginInformations != null){
        if(username == loginInformations.username){
            conteudo += `<div class="postActions "> <button onclick='removerPost(this)' class='RemoverPostButton comCapa'>X</button> </div>` 
        }
    }

    post.innerHTML = conteudo

    postDiv.appendChild(post);
}

searchInput = document.getElementById('searchContent')


let search = () =>{
    var inputFiltros = document.querySelectorAll('.filtros')
    let inputFiltrosUsados = []

    for(var i = 0; i<inputFiltros.length; i++){
        if(inputFiltros[i].checked){
            inputFiltrosUsados.push(inputFiltros[i].value)
        }
    }

    informações = {content: searchInput.value, tópicos: inputFiltrosUsados, temParametroBusca: true}
    if(informações.content == ''){informações.temParametroBusca = false}

    fetch("/searchposts", {
        method:"POST",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify(informações)
    })
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        loginInformations = JSON.parse(localStorage.getItem("login"))

        posts = document.querySelectorAll('.postResult') // remove todos posts antigos
        for(var j=0; j < posts.length; j++){
            posts[j].parentNode.removeChild(posts[j]);
        }

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
            informações = {idPost: data[i].idPost, idUsuario: loginInformations.idUsuario, ação: "verificar"}
            verificarReport("post", informações)
            verificarCurtida("post")
            }
        }
    })
}

let removerPost = elemento =>{
    idPostDeletar = Number((elemento.closest(".postResult")).id)
    boxDeleção = document.querySelector('.confirmarDeletarPost')
    document.body.style="pointer-events: none; user-select: none;"
    boxDeleção.style = "display: grid; pointer-events: all; user-select: auto;"
}

let fecharDeleção = () =>{
    document.body.style="pointer-events: all; user-select: auto;"
    boxDeleção.style = "display: none"
}

let confirmarDeleção = alvo =>{
    informações = {}
    if(alvo == "post"){
        informações = {idPost: idPostDeletar}
    } else{
        informações = {idComentario: idComentarioDeletar}
    }
    
    fetch(`/deletar${alvo}`, {
        method:"POST",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify(informações)
    }).then(response => response.json()) 
    .then(data => {
    fecharDeleção()
    location.reload()
})}

let verificar = () =>{
    if(loginInformations == null || Object.keys(loginInformations).length == 0){
        alert("Para entrar nessa página você deve estar logado")
        event.preventDefault()
    }
}