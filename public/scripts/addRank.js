Ranks = [
    {imagem: '', nome: '', rank: ""},
    {imagem: '', nome: '', rank: ""},
    {imagem: '', nome: '', rank: ""},
    {imagem: '', nome: '', rank: ""},
    {imagem: '', nome: '', rank: ""},
    {imagem: '', nome: '', rank: ""},
    {imagem: '', nome: '', rank: ""},
    {imagem: '', nome: '', rank: ""},
    {imagem: '', nome: '', rank: ""},
    {imagem: '', nome: '', rank: ""},
]

let carregarRank = () =>{
    fetch("/ranks")
    .then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        for(var i = 0; i < data.length; i++){
            if(loginInformations.fotoPerfil == 'noUserImage.png'){
                Ranks[i].imagem = "images/" + loginInformations.fotoPerfil
            } else{
                Ranks[i].imagem = data[i].fotoPerfil
            }
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
        <h1>${Ranks[i].nome}</h1>
        <p>${Ranks[i].rank}</p>
        `
        rankDiv.appendChild(rank)
    }

}