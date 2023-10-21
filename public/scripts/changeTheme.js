ImagemOriginal = document.getElementById('tema').getAttribute('src');
darkMode = localStorage.getItem("dark-mode"); 

button = document.getElementById('tema');

if (darkMode === "disabled") {
    button.src = "./images/LightIcon.png"
} else {
    button.src = ImagemOriginal
}

MudarTema()


function MudarTema(){
    let button = document.getElementById('tema');

    if (button.getAttribute('src') == ImagemOriginal) {
        document.body.classList.add("Dark-theme")
        button.src = "./images/LightIcon.png"
        paraEscuro()

    } else {
        document.body.classList.remove("Dark-theme")
        button.src = ImagemOriginal
        paraClaro()
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