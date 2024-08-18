function Publicar(){

    titulo = document.getElementById("inputTitulo").value

    function substituirTags(texto) {
        const mapeamentoTags = {
            "&lt;i&gt;": "<i>",
            "&lt;/i&gt;": "</i>",
            "&lt;b&gt;": "<b>",
            "&lt;/b&gt;": "</b>",  
            "&lt;u&gt;": "<u>",
            "&lt;/u&gt;": "</u>",
            "&lt;br&gt;": "<br>"
        };
    
        for (const tagHTML in mapeamentoTags) {
            const tagReal = mapeamentoTags[tagHTML];
            texto = texto.replace(new RegExp(tagHTML, "g"), tagReal);
        }
    
        return texto;
    }
    
    postContent = document.getElementById("postContent").innerHTML
    postContent = substituirTags(postContent);
    

    capa = document.querySelector("#capa").getAttribute("src")

    if(capa == ''){
        capa = null
    }
    
    topicosObject = document.querySelectorAll(".topicoResult")
    let topicos = "";

    for (let i = 0; i < topicosObject.length; i++) {
        topicos += topicosObject[i].id + ",";
    }
    
    if (topicos.length > 0) {
        topicos = topicos.slice(0, -1);
    }




    idUsuario = loginInformations.idUsuario


    if(titulo.length<=100){
        if(postContent.length<=6000){
            if(topicos.length>0){
                if(idUsuario != null && idUsuario != undefined){
                    
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
                        }).then(response => {return response.json();})
                        .then(data => {
                            if (data.sucesso) {
                                location.reload()
                            } 
                        })
                }catch (error) {
                    alert("Não foi possível postar, tente novamente mais tarde.")
                }

                }else{alert("Você deve estar logado para postar")}
            }else{alert("Adicione pelo menos um tópico.")}
        }else{alert("Conteudo longo demais")}
    }else{alert("Titulo longo demais")}


}