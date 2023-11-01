

function Postar(){

    titulo = document.getElementById("inputTitulo").value
    
    postContent = document.querySelector("#postContent").innerHTML

    capa = document.querySelector("#capa").getAttribute("src")
    
    topicosObject = document.querySelectorAll(".topicoResult")
    let topicos =[]

    for(i=0;i<topicosObject.length;i++){
        topicos += [topicosObject[i].id]
    }

    idUsuario = loginInformations.idUsuario


    if(titulo.length>5 && titulo.length<=100){
        if(postContent.length>20 && postContent.length<=4000){
            if(topicos.length>0){
                if(typeof(idUsuario)==parseInt || 1==1){
                    
                    try {
                        info = {
                            titulo: titulo,
                            conteudo: postContent,
                            idUsuario: idUsuario,
                            capa: capa,
                            topicos: topicos
                        }
                    
                        fetch("/postar", {
                            method:"POST",
                            headers:{
                                "Content-type": "application/json"
                            },
                            body:JSON.stringify(info)
                        })
                        alert("postado!?")
                    } catch (error) {
                        alert("Não foi possível postar, tente novamente mais tarde.")
                    }

                }else{alert("Você deve estar logado para postar")}
            }else{alert("Adicione pelo menos um tópico.")}
        }else{alert("Conteudo pequeno ou longo demais")}
    }else{alert("Titulo pequeno ou longo demais")}


}