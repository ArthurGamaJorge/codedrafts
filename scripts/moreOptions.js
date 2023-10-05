window.onload = function(){    
    menu = document.querySelector("#IconeMenu");
    lista = document.querySelector(".Lista");


    menu.onclick = () => {
        menu.classList.toggle("bx-x");
        lista.classList.toggle("open");
    };

    
};