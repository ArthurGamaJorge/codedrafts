aberto = false;
let abrirDraft = () =>{
    if(!aberto){
        document.querySelector('.boxDraft').style = "display: block"
        aberto = true
    } else{
        fecharDraft()
    }
    event.stopPropagation()
}

let fecharDraft = () =>{
    document.querySelector('.boxDraft').style = "display: none"
    aberto = false
}
