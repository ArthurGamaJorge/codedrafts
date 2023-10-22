let selecionar = (id) => {
    let btnSelecionado = document.querySelector(`#${id}`)
    let all = document.querySelectorAll(".contentButton")

    let tam = all.length
    for (let i = 0; i < tam; i++){
        all[i].style.backgroundColor = 'var(--transparent-brand)'
    }

    btnSelecionado.style.backgroundColor = 'transparent';
}