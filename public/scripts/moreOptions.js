window.onload = function(){    
    menu = document.querySelector("#IconeMenu");
    lista = document.querySelector(".Lista");


    menu.onclick = () => {
        menu.classList.toggle("bx-x");
        lista.classList.toggle("open");
        event.stopPropagation()
    };
};

let desativar = () =>{
    menu.classList.remove("bx-x");
    lista.classList.remove("open");
}