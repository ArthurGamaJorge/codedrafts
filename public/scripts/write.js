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

let AdicionarTopico = () =>{
    let TopicosInput = document.getElementById('SelectTopicos')
    let divTopicos = document.querySelector('.Tópicos')

    let topicoNome = TopicosInput.options[TopicosInput.selectedIndex].text;

    let topicoID = TopicosInput.options[TopicosInput.selectedIndex].value;

    let topicos = document.querySelectorAll(".topicoNome")

    for(var i = 0; i<topicos.length; i++){
        if(topicos[i].textContent == topicoNome){
            return
        }
    }
        

    let topico = document.createElement("div")
    topico.setAttribute("class", "topicoResult")
    topico.setAttribute("id", `${topicoID}`)

    topico.innerHTML = `<span class="topicoNome">${topicoNome}</span>
     <button onclick='removerTopico(this)'>X</button>`

    divTopicos.appendChild(topico)
}

let removerTopico = topicoRemovido =>{
    topicoRemovido = topicoRemovido.parentNode
    topicoRemovido.parentNode.removeChild(topicoRemovido);
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

textArea.addEventListener("keypress", function(event) { // se o usuário está no input de search
    if (event.key === "Enter"){ 
        const cursorPos = textArea.selectionStart;
    
        const textBeforeCursor = textArea.value.substring(0, cursorPos);
        const textAfterCursor = textArea.value.substring(cursorPos, textArea.value.length);
        
        textArea.value = textBeforeCursor + "<br>" + textAfterCursor;
        
        textArea.selectionStart = textArea.selectionEnd = cursorPos + 4; // Ajuste o valor conforme necessário (4 é o tamanho de "<br>")
      }
    });
