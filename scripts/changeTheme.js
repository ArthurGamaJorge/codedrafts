function MudarTema(){
    let button = document.getElementById('tema');

    if (button.getAttribute('src') == ImagemOriginal) {
        paraClaro()

    button.src = "./images/LightIcon.png"
    } else {
        paraEscuro()

    button.src = ImagemOriginal
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
}

function paraClaro(){
    document.documentElement.style.setProperty('--light-shades', '#212121');
        document.documentElement.style.setProperty('--light-accent', '#360303');
        document.documentElement.style.setProperty('--dark-accent', '#e6b4b4');  
        document.documentElement.style.setProperty('--dark-shades', '#e8e8e8');
}