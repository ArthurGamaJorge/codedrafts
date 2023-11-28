rankDiv = document.querySelector('#rankDiv')

let carregarRank = () =>{
    loginInformations = JSON.parse(localStorage.getItem("login"))
    fetch("/ranks")
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        for(var i = 0; i < data.length; i++){
        
            rank = document.createElement("div")
            rank.setAttribute("class", "rankResult")
            rank.setAttribute("id", `${(data[i].nome).split(' ').join('')}`)
        
            rank.innerHTML += `
            <img src="${data[i].fotoPerfil}"> 
            <a href="../user/${data[i].username}" style="color:white;font-size:20px">${data[i].nome}</a>
            <p> <span id='pontos'>${data[i].pontosTotais}</span> (${i+1}#) </p> 
            `
            rankDiv.appendChild(rank)

        }
    })
}
