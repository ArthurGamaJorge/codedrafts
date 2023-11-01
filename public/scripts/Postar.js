

function Postar(){
    postContent = document.querySelector("#postContent").innerHTML
    capa = document.querySelector("#capa").getAttribute("src")
    alert(capa + "  "+postContent)

    //info = {
    //    titulo: loginInformations.email,
    //    conteudo: postContent,
    //    idUsuario: loginInformations.email,
    //    capa: capa
    //    //topicos: loginInformations.email
    //}
//
    //fetch("/postar", {
    //    method:"POST",
    //    headers:{
    //        "Content-type": "application/json"
    //    },
    //    body:JSON.stringify(info)
    //})
}