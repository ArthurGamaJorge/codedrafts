let selecionar = (id) => {
    let btnSelecionado = document.querySelector(`#${id}`)
    let all = document.querySelectorAll(".contentButton")

    let tam = all.length
    for (let i = 0; i < tam; i++){
        all[i].style.backgroundColor = "var(--transparent-brand)"
    }
    
    btnSelecionado.style.backgroundColor = "transparent"

    // divs de conteúdo

    all = document.querySelectorAll(".boxCbs")

    tam = all.length
    for (let i = 0; i < tam; i++){
        all[i].style.display = "none"
    }

    let idBox = "#box" + id
    document.querySelector(idBox).style.display = "flex"

}