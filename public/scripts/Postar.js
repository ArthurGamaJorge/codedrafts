function Postar(){

    titulo = document.getElementById("inputTitulo").value
    

    conteudoFormatado = document.getElementById("postContent");
    const tagsPermitidas = ["B", "I", "U"];
    const conteudoSalvo = [];


    if (conteudoFormatado.hasChildNodes()) {
        for (const node of conteudoFormatado.childNodes) {
            if (node.nodeType === Node.ELEMENT_NODE && tagsPermitidas.includes(node.tagName)) {
                // Verifique se o nó é uma tag permitida
                conteudoSalvo.push(node.outerHTML);
            } else if (node.nodeType === Node.TEXT_NODE) {
                // Se for um nó de texto, adicione-o diretamente
                conteudoSalvo.push(node.textContent);
            }
        }
    } else {
        // Se não houver nós filhos, basta pegar o texto diretamente
        conteudoSalvo.push(conteudoFormatado.textContent);
    }

    const postContent = conteudoSalvo.join(" ");


    capa = document.querySelector("#capa").getAttribute("src")

    if(capa == ''){
        capa = null
    }
    
    topicosObject = document.querySelectorAll(".topicoResult")
    let topicos =[]

    for(i=0;i<topicosObject.length;i++){
        topicos += [topicosObject[i].id]
    }

    idUsuario = loginInformations.idUsuario


    if(titulo.length>5 && titulo.length<=100){
        if(postContent.length>20 && postContent.length<=6000){
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
                        })
                        alert("postado!")
                        location.reload()
                    } catch (error) {
                        alert("Não foi possível postar, tente novamente mais tarde.")
                    }

                }else{alert("Você deve estar logado para postar")}
            }else{alert("Adicione pelo menos um tópico.")}
        }else{alert("Conteudo pequeno ou longo demais")}
    }else{alert("Titulo pequeno ou longo demais")}


}