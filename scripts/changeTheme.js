function MudarTema(){
    let button = document.getElementById('tema');
    let button2 = document.getElementById('tema2');
    let menu = document.querySelector('.IconeMenuImg')

    if (button.getAttribute('src') == ImagemOriginal) {
        button.src = button2.src = "./images/DarkIcon.png"
        menu.style = "filter: invert(0%) !important"
        paraClaro()

    } else {
        button.src = button2.src = ImagemOriginal
        menu.style = "filter: invert(100%) !important"
        paraEscuro()
    }
}

function MudarTemaApp(){
    let button = document.getElementById('btnConfigs');

    if (button.innerHTML == "Escuro") {
        paraClaro()
        button.innerHTML = "Claro"
    } else {
        paraEscuro()
        button.innerHTML = "Escuro"

    button.src = ImagemOriginal
    }
}


function paraEscuro(){
    document.documentElement.style.setProperty('--light-shades', '#e8e8e8');
        document.documentElement.style.setProperty('--light-accent', '#e6b4b4');
        document.documentElement.style.setProperty('--dark-accent', '#360303');  
        document.documentElement.style.setProperty('--dark-shades', '#212121');
        document.documentElement.style.setProperty('--shades-contrast', '#292929');
}

function paraClaro(){
        document.documentElement.style.setProperty('--light-shades', '#212121');
        document.documentElement.style.setProperty('--light-accent', '#360303');
        document.documentElement.style.setProperty('--dark-accent', '#e6b4b4');  
        document.documentElement.style.setProperty('--dark-shades', '#e8e8e8');
        document.documentElement.style.setProperty('--shades-contrast', '#d8d8d8');
}