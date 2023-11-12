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

    informações = {idPost: idPost, idUsuario: loginInformations.idUsuario, ação: "verificar"}
    verificarReport("post")
    verificarCurtida("post")

    comentarios = document.querySelectorAll('.comentario')

    for(var i = 0; i < comentarios.length; i++){
        if(loginInformations != null){

            if(comentarios[i].classList[1] == loginInformations.username){
                comentarios[i].innerHTML += `<div class="postActions "> <button onclick='removerComentario(this)' class='RemoverPostButton'>X</button> </div>` 
            }
            informações = {idComentario: comentarios[i].id, idUsuario: loginInformations.idUsuario, ação: "verificar"}
            verificarReport("comentario")
            verificarCurtida("comentario")
        }
    }
}

let reportarComent = elemento =>{
    boxReport = document.querySelector('.denunciaComentario')
    botão = elemento
    document.body.style="pointer-events: none; user-select: none;"
    boxReport.style = "display: grid; pointer-events: all; user-select: auto;"
}

let removerComentario = elemento =>{
    idComentarioDeletar = Number((elemento.closest(".comentario")).id)
    boxDeleção = document.querySelector('.confirmarDeletarComentario')
    document.body.style="pointer-events: none; user-select: none;"
    boxDeleção.style = "display: grid; pointer-events: all; user-select: auto;"
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
