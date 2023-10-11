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

// NEGRITO, ITÁLICO E SUBLINHADO

document.getElementById("bold_button").onmousedown  = function(e) {
    document.execCommand("bold");
    e.preventDefault();
}

document.getElementById("italic_button").onmousedown  = function(e) {
    document.execCommand("italic");
    e.preventDefault();
}

document.getElementById("underline_button").onmousedown  = function(e) {
    document.execCommand("underline");
    e.preventDefault();
}

let isWriting = texto => document.queryCommandState(`${texto}`);

textArea = document.querySelector(".textarea")
textArea.onfocus = document.onselectionchange = e => {
    document.getElementById("bold_button").classList.toggle('Ligado', isWriting("bold"));
    document.getElementById("italic_button").classList.toggle('Ligado', isWriting("italic"));
    document.getElementById("underline_button").classList.toggle('Ligado', isWriting("underline"));
}

// ABRIR ARQUIVO

let openFile = () =>{
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
              files =   Array.from(input.files);
          };
    input.click();
    
}
