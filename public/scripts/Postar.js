

function Postar(){
    postContent = document.querySelector("#postContent").innerHTML
    capa = document.querySelector("#capa").getAttribute("src")
    alert(capa + "  "+postContent)

    //info = {
    //    titulo: loginInformations,
    //    conteudo: postContent,
    //    idUsuario: loginInformations,
    //    capa: capa
    //    //topicos: loginInformations
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