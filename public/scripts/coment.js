window.onload = () =>{
    loginInformations = JSON.parse(localStorage.getItem("login"))

    document.querySelector(".avatarUsuario").src = loginInformations.fotoPerfil
    document.querySelector(".AutorComentario").innerHTML = loginInformations.nome

    idPost = (document.body.classList)[0]

    fetch("/verificarUsuario", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(loginInformations)
    })

    informações = {idPost: idPost, idUsuario: loginInformations.idUsuario, reportar: false, ação: "verificar"}
    verificarReport()
    verificarCurtida()

    comentarios = document.querySelectorAll('.comentario')

    for(var i = 0; i < comentarios.length; i++){
        if(loginInformations != null){
            informações = {idComentario: comentarios[i].id, idUsuario: loginInformations.idUsuario, reportar: false, ação: "verificar"}
            verificarReportComent()
            verificarCurtidaComent()
        }
    }
}

let verificarReportComent = () =>{
    fetch("/jareportoucomentario", {
        method:"POST",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify(informações)
    })
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        if(data.resposta == "True"){
            comentario = document.getElementById(data.idComentario)
            botão = comentario.querySelector('#report')
            botão.classList.add('Reportado')
        }})
}


let verificarCurtidaComent = () =>{
    fetch("/curtidascomentario", {
        method:"POST",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify(informações)
    })
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        if(data.resposta != ""){
            comentario = document.getElementById(data[0].idComentario)
            if(data[0].curtido == false){
                botão = comentario.querySelector('#dislike')
                botão.classList.add('Descurtido')
            } else{
                botão = comentario.querySelector('#like')
                botão.classList.add('Curtido')
            }
        }})
}


let Comentar = () =>{
    if(loginInformations == null){
        alert("Você deve estar logado para isso")
        return
    }

    let texto = document.querySelector(".areaComentario").value

    if(texto.length > 500){
        alert("Comentário deve ter no máximo 500 caractéres")
        return
    }
    if(texto == ""){
        alert("Comentário não pode ser vazio")
        return
    }

    let info = {
        idPost: idPost,
        texto: texto,
        idUsuario: loginInformations.idUsuario
    }

    fetch("/comentar", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(info)
    }).then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        if(data.resposta == "Sucesso"){
            alert("comentado!")
            location.reload()
        } else{
            alert("Erro ao realizar o comentário")
        }
    })

}

let confirmarDenunciaComent = () =>{
    let idComentario = botão.parentElement.parentNode.parentNode.parentNode

    if(loginInformations == null || Object.keys(loginInformations).length == 0){
        alert("Para fazer isso você deve estar logado")
        fecharDenuncia()
        return
    }

    console.log(idComentario.id)

    informações = {idComentario: idComentario.id, idUsuario: loginInformations.idUsuario}

    fetch("/jareportoucomentario", {
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


let curtirComent = ButtonCurtir =>{
    if(!timer()){
        return
    }
    console.log(ButtonCurtir)
    let classe = (ButtonCurtir.parentElement.parentNode).parentElement.parentNode
    let Buttondescurtir = classe.querySelector('#dislike'); 
    let pontuação = classe.querySelector('#quantasCurtidas')

    if(loginInformations == null || Object.keys(loginInformations).length == 0){
        alert("Para fazer isso você deve estar logado")
        return
    } else{
        modificação = 1
        if(ButtonCurtir.classList.contains('Curtido')){
            pontuação.innerHTML = Number(pontuação.textContent) - modificação

            try{pontuaçãoRank.innerHTML = Number(pontuaçãoRank.textContent) - modificação} 
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
        informações = {idUsuario: loginInformations.idUsuario, idComentario: classe.id, ação: ação}
        fetch("/curtidascomentario", {
            method:"POST",
            headers:{"Content-type": "application/json"},
            body:JSON.stringify(informações)
        })
}
}

let descurtirComent = Buttondescurtir =>{
    if(!timer()){
        return
    }
    let classe = (Buttondescurtir.parentElement.parentNode).parentElement.parentNode
    let ButtonCurtir = classe.querySelector('#like'); 
    let pontuação = classe.querySelector('#quantasCurtidas')

    if(loginInformations == null || Object.keys(loginInformations).length == 0){
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
            try{pontuaçãoRank.innerHTML = Number(pontuaçãoRank.textContent) - modificação} 
            catch{console.log("Usuario não está no rank")}

            Buttondescurtir.classList.add('Descurtido')
            ButtonCurtir.classList.remove('Curtido')
            ação = "descurtir"
        }
        informações = {idUsuario: loginInformations.idUsuario, idComentario: classe.id, ação: ação}
        fetch("/curtidascomentario", {
            method:"POST",
            headers:{"Content-type": "application/json"},
            body:JSON.stringify(informações)
        })
    }
}
