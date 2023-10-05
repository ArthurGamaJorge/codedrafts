ImagemOriginal = document.getElementById('tema').getAttribute('src');
darkMode = localStorage.getItem("dark-mode"); 

button = document.getElementById('tema');

if (darkMode === "disabled") {
    button.src = ImagemOriginal
} else {
    button.src = "./images/DarkIcon.png"
}

MudarTema()


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


function paraEscuro(){
    document.documentElement.style.setProperty('--light-shades', '#e8e8e8');
        document.documentElement.style.setProperty('--light-accent', '#e6b4b4');
        document.documentElement.style.setProperty('--dark-accent', '#360303');  
        document.documentElement.style.setProperty('--dark-shades', '#212121');
        document.documentElement.style.setProperty('--shades-contrast', '#292929');
        localStorage.setItem("dark-mode", "enabled");
}

function paraClaro(){
        document.documentElement.style.setProperty('--light-shades', '#212121');
        document.documentElement.style.setProperty('--light-accent', '#360303');
        document.documentElement.style.setProperty('--dark-accent', '#e6b4b4');  
        document.documentElement.style.setProperty('--dark-shades', '#e8e8e8');
        document.documentElement.style.setProperty('--shades-contrast', '#d8d8d8');
        localStorage.setItem("dark-mode", "disabled");
}