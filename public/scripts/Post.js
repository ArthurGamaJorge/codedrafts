adicionarPost(
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    "TestePost",
    "ion",
    "io",
    "lorem",
    ["Programming","334"]
)


function adicionarPost(imageLink,postName,name,username,content,topics) {
    let postDiv = document.getElementById('boxPosts')
    
    post = document.createElement("div")
    post.setAttribute("class", "postResult")

    post.innerHTML += `<div style="background-image: url(${imageLink});"></div>`

    post.innerHTML += `<a href="#"><h1>${postName}</h1><a><i>By <a href="#">${name}</a></i>`

    post.innerHTML += `<p>${content}</p>`

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