let carregarPosts = () => {
    fetch("/posts")
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        for(var i = 0; i < data.length; i++){
            data[i].tópicos = data[i].tópicos.split(',')
            adicionarPost(
                data[i].capa,
                data[i].titulo,
                data[i].usuário,
                data[i].conteudo,
                data[i].tópicos,
                data[i].pontosPost
            )
        }
    })
}

adicionarPost(
    null,
    "TestePost",
    "ion",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil qui ex nemo sapiente quasi suscipit reiciendis obcaecati officiis, veritatis consequuntur culpa, fugit officia ipsam aspernatur ab ipsum molestiae rem facere Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil qui ex nemo sapiente quasi suscipit reiciendis obcaecati officiis, veritatis consequuntur culpa, fugit officia ipsam aspernatur ab ipsum molestiae rem facere",
    ["Programming","334"],
    413
)

function adicionarPost(imageLink,postName,name,content,topics, pontos) {
    let postDiv = document.getElementById('boxPosts')
    
    post = document.createElement("div")
    post.setAttribute("class", "postResult")
    post.innerHTML += `
    <div class="static">
        <div class="interações">
            <div class="curtidas">
                <span id="quantasCurtidas">${pontos}</span> 
                <button id="like"> <img src="images/setaCima.png">  </button>
                <button id="dislike"> <img src="images/setaBaixo.png"> </button>
            </div>
            <button id="report" onclick="reportar()"> <img src="images/report.png"> </button>
        </div>
    </div>`

    if(imageLink != null){
        post.innerHTML += `<div class="capa" style="background-image: url('${imageLink}');"></div>`
    }

    post.innerHTML += `<a href="#"><h1>${postName}</h1><a><i>By <a href="#">${name}</a></i>`

    if(imageLink != null){
        post.innerHTML += `<p>${content}</p>`
    } else{
        post.innerHTML += `<p id="semCapa">${content}</p>`
    }

    post.innerHTML += `<b>`
    
    for(i=0;i<topics.length-1;i++){
        post.innerHTML += ` <a href="#">${topics[i]}</a> |`
    }

    post.innerHTML += ` <a href="#">${topics[topics.length-1]}</a></b>`


    postDiv.appendChild(post);
}

// INTERAÇÕES
boxReport = document.querySelector('.confirmarDenuncia')

let reportar = () =>{
    document.body.style="pointer-events: none; user-select: none;"
    boxReport.style = "display: grid; pointer-events: all; user-select: auto;"
}

let confirmarDenuncia = () =>{
    // insere no banco de dados
    fecharDenuncia()
}

let fecharDenuncia = () =>{
    document.body.style="pointer-events: all; user-select: auto;"
    boxReport.style = "display: none"
}
