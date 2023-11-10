window.onload = () =>{
    loginInformations = JSON.parse(localStorage.getItem("login"))

    document.querySelector(".avatarUsuario").src = loginInformations.fotoPerfil
    document.querySelector(".AutorComentario").innerHTML = loginInformations.nome

    fetch("/verificarUsuario", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(loginInformations)
    })
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
        idPost: (document.body.classList)[0],
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