
matrixRank = [
    ["https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg","Daniel","#1"],
    ["https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg","Dorigan","#2"],
    ["https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg","De","#13"],
    ["https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg","Carvalho","#132"]
]

addRanks(matrixRank)

function addRanks(matrixRank){
    let rankDiv = document.querySelector('#rankDiv')
    
    for(i=0;i<matrixRank.length;i++){
        rank = document.createElement("div")
        rank.setAttribute("class", "rankResult")
    
        rank.innerHTML += `
        <img src="${matrixRank[i][0]}">
        <h1>${matrixRank[i][1]}</h1>
        <p>${matrixRank[i][2]}</p>
        `
        rankDiv.appendChild(rank)
    }

}