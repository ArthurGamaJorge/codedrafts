window.onload = function(){    
    menu = document.querySelector("#IconeMenu");
    lista = document.querySelector(".Lista");
    ImagemOriginal = document.getElementById('tema').getAttribute('src');


    menu.onclick = () => {
        menu.classList.toggle("bx-x");
        lista.classList.toggle("open");
};
};