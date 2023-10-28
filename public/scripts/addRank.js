Ranks = [
    {imagem: '/images/noUserImage.png', nome: 'Nome', rank: "Pontos"},
    {imagem: '/images/noUserImage.png', nome: 'Nome', rank: "Pontos"},
    {imagem: '/images/noUserImage.png', nome: 'Nome', rank: "Pontos"},
    {imagem: '/images/noUserImage.png', nome: 'Nome', rank: "Pontos"},
    {imagem: '/images/noUserImage.png', nome: 'Nome', rank: "Pontos"},
    {imagem: '/images/noUserImage.png', nome: 'Nome', rank: "Pontos"},
    {imagem: '/images/noUserImage.png', nome: 'Nome', rank: "Pontos"},
    {imagem: '/images/noUserImage.png', nome: 'Nome', rank: "Pontos"},
    {imagem: '/images/noUserImage.png', nome: 'Nome', rank: "Pontos"},
    {imagem: '/images/noUserImage.png', nome: 'Nome', rank: "Pontos"},
]

let carregarRank = () =>{
    loginInformations = JSON.parse(localStorage.getItem("login"))
    fetch("/ranks")
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        for(var i = 0; i < data.length; i++){
            Ranks[i].imagem = data[i].fotoPerfil
            Ranks[i].nome = data[i].nome
            Ranks[i].rank = data[i].pontosTotais
        }
    addRanks(Ranks)}
    )
}

function addRanks(Ranks){

    let rankDiv = document.querySelector('#rankDiv')
    
    for(i=0;i<Ranks.length;i++){
        rank = document.createElement("div")
        rank.setAttribute("class", "rankResult")
    
        rank.innerHTML += `
        <img src="${Ranks[i].imagem}">
        <p onclick="redirectToUserPage(${Ranks[i].nome} style="font-size:20px">${Ranks[i].nome}</p>
        <p>${Ranks[i].rank}</p>
        `
        rankDiv.appendChild(rank)
    }

}