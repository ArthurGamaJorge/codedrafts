function MudarTema(){
    let button = document.getElementById('tema');

    if (button.getAttribute('src') == ImagemOriginal) {
        document.documentElement.style.setProperty('--light-shades', '#212121');
        document.documentElement.style.setProperty('--light-accent', '#360303');
        document.documentElement.style.setProperty('--dark-accent', '#e6b4b4');  
        document.documentElement.style.setProperty('--dark-shades', '#e8e8e8');

    button.src = "./images/LightIcon.png"
    } else {
        document.documentElement.style.setProperty('--light-shades', '#e8e8e8');
        document.documentElement.style.setProperty('--light-accent', '#e6b4b4');
        document.documentElement.style.setProperty('--dark-accent', '#360303');  
        document.documentElement.style.setProperty('--dark-shades', '#212121');

    button.src = ImagemOriginal
    }
}