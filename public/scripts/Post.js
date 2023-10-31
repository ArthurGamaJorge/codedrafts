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
            botão.classList.add('Reportado')
        }
        fecharDenuncia()
    })
}

let fecharDenuncia = () =>{
    document.body.style="pointer-events: all; user-select: auto;"
    boxReport.style = "display: none"
}


let curtir = ButtonCurtir =>{
    loginInformations = JSON.parse(localStorage.getItem("login"))
    classe = (ButtonCurtir.parentElement.parentNode).parentElement.parentNode
    Buttondescurtir = classe.querySelector('#dislike'); 
    pontuação = classe.querySelector('#quantasCurtidas')
    try{
        nome = (classe.querySelector('#créditos').textContent).split(' ').join('')
        pontuaçãoRank = (document.querySelector(`#${nome}`)).querySelector('#pontos')
    } catch{
        console.log("Usuario não está no rank")
    }

    if(loginInformations == null || loginInformations == "null"){
        alert("Para fazer isso você deve estar logado")
        return
    } else{
        modificação = 1
        if(ButtonCurtir.classList.contains('Curtido')){
            pontuação.innerHTML = Number(pontuação.textContent) - modificação

            try{pontuaçãoRank.innerHTML = Number(pontuaçãoRank.textContent) + modificação} 
            catch{console.log("Usuario não está no rank")}

            ButtonCurtir.classList.remove('Curtido')
            ação = "tirarCurtida"

        } else{
            if(Buttondescurtir.classList.contains('Descurtido')){modificação = 2}

            pontuação.innerHTML = Number(pontuação.textContent) + modificação

            try{pontuaçãoRank.innerHTML = Number(pontuaçãoRank.textContent) + modificação} 
            catch{console.log("Usuario não está no rank")}

            ButtonCurtir.classList.add('Curtido')
            Buttondescurtir.classList.remove('Descurtido')
            ação = "curtir"
        }
        informações = {idUsuario: loginInformations.idUsuario, idPost: classe.id, ação: ação}
        fetch("/curtidas", {
            method:"POST",
            headers:{"Content-type": "application/json"},
            body:JSON.stringify(informações)
        })
}
}

let descurtir = Buttondescurtir =>{
    loginInformations = JSON.parse(localStorage.getItem("login"))
    classe = (Buttondescurtir.parentElement.parentNode).parentElement.parentNode
    ButtonCurtir = classe.querySelector('#like'); 
    pontuação = classe.querySelector('#quantasCurtidas')

    try{
        nome = (classe.querySelector('#créditos').textContent).split(' ').join('')
        pontuaçãoRank = (document.querySelector(`#${nome}`)).querySelector('#pontos')
    } catch{
        console.log("Usuario não está no rank")
    }

    if(loginInformations == null || loginInformations == "null"){
        alert("Para fazer isso você deve estar logado")
        return
    } else{
        modificação = 1
        if(Buttondescurtir.classList.contains('Descurtido')){
            pontuação.innerHTML = Number(pontuação.textContent) + modificação
            
            try{pontuaçãoRank.innerHTML = Number(pontuaçãoRank.textContent) + modificação} 
            catch{console.log("Usuario não está no rank")}

            Buttondescurtir.classList.remove('Descurtido')
            ação = "tirarDescurtida"
        } else{
            if(ButtonCurtir.classList.contains('Curtido')){modificação = 2}
            
            pontuação.innerHTML = Number(pontuação.textContent) - modificação
            try{pontuaçãoRank.innerHTML = Number(pontuaçãoRank.textContent) + modificação} 
            catch{console.log("Usuario não está no rank")}

            Buttondescurtir.classList.add('Descurtido')
            ButtonCurtir.classList.remove('Curtido')
            ação = "descurtir"
        }
        informações = {idUsuario: loginInformations.idUsuario, idPost: classe.id, ação: ação}
        fetch("/curtidas", {
            method:"POST",
            headers:{"Content-type": "application/json"},
            body:JSON.stringify(informações)
        })
    }
}

let carregarFiltros = () =>{
    fetch("/filters")
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        let filterDiv = document.getElementById('filter')
        for(var i = 0; i < data.length; i++){

            filtro = `<input type="checkbox" oninput='search()' class='filtros' value="${data[i].nome}" id="${data[i].nome}"style="transform: scale(2); margin: 20px;"><label>${data[i].nome}</label><br>`
            filterDiv.innerHTML += filtro
        }
    })
}

let verificarReport = () =>{
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
            botão.classList.add('Reportado')
        }})
}

let verificarCurtida = () =>{
    fetch("/curtidas", {
        method:"POST",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify(informações)
    })
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        if(data.resposta != ""){
            post = document.getElementById(data[0].idPost)
            if(data[0].curtido == false){
                botão = post.querySelector('#dislike')
                botão.classList.add('Descurtido')
            } else{
                botão = post.querySelector('#like')
                botão.classList.add('Curtido')
            }
        }})
}

function adicionarPost(idPost, imageLink,postName,name,content,topics,pontos,username) {
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
        conteudo += `<div> <a href="#"><h1>${postName}</h1><a><i>Por <a href="#" id="créditos">${name}</a></i> <p>${content}</p>`
    } else{
        conteudo += `<div class="semCapa"> <a href="#"><h1>${postName}</h1> Por <a class="in" id="créditos" href="#">${name}</a> <p>${content}</p>`
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


let search = () =>{
    inputFiltros = document.querySelectorAll('.filtros')
    StringFiltros = ''

    for(var i = 0; i < inputFiltros.length; i++){
        if(inputFiltros[i].checked){
            StringFiltros += inputFiltros[i].value + " "
        }
    }
    if(StringFiltros[StringFiltros.length-1] == " "){
        newString = '' // Porque em javascript Strings são imutáveis
        for(var j = 0; j<StringFiltros.length-1; j++){
            newString += StringFiltros[j]
        }
        StringFiltros = newString
    }

    informações = {content: searchInput.value, tópicos: StringFiltros}
    if(informações.content == ''){informações.content = ' '}

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
            data[i].tópicos = data[i].tópicos.split(' ')
            adicionarPost(
                data[i].idPost,
                data[i].capa,
                data[i].titulo,
                data[i].usuário,
                data[i].conteudo,
                data[i].tópicos,
                data[i].pontosPost,
                data[i].username
            )
            if(loginInformations != null){
            informações = {idPost: data[i].idPost, idUsuario: loginInformations.idUsuario, reportar: false, ação: "verificar"}
            verificarReport()
            verificarCurtida()
            }
        }
    })
}