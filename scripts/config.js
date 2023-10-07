// MUDAR SEÇÕES

window.onresize = () => retornar()
Li = ["Aparencia", "Informações", "Extra", "FAQ", "Sair"]

let AtivarSeção = Seção =>{

    for(var i = 0; i<Li.length; i++){
        document.querySelector(`.${Li[i]}`).style = "display: none"
        document.querySelector(`#${Li[i]}`).style = "border-color: var(--light-shades)"
    }
    
    document.querySelector(`.${Seção}`).style = "display: block"
    document.querySelector(`#${Seção}`).style = "border-color: var(--main-brand)"

    if(window. innerWidth<=900){
        document.querySelector('.navbarLateral').style = "display: none"
        document.querySelector(`.${Seção}`).style = "width: 100vw; display: block;"

        document.querySelector('.Conteudo').style = "justify-content: center; padding-left: 0"
        document.querySelector(`#titulo${Seção}`).style = "display: none"
        document.querySelector(`.Mobile${Seção}`).style = "display: block"
    }
}

let retornar = () =>{
    document.querySelector('.navbarLateral').style = "display: flex"

    if(window. innerWidth>900){
        document.querySelector('.navbarLateral').style = "width: calc(50vw + 50px)"
        for(var i = 0; i<Li.length; i++){
            document.querySelector(`.${Li[i]}`).style = "width: calc(50vw - 50px)"
        }
    }
}

// SWITCH DE TEMA

darkMode = localStorage.getItem("dark-mode"); 
var isChecked = document.querySelector("#switchValue")

if (darkMode === "disabled") {
    isChecked.checked = false
} else {
    isChecked.checked = true
}

MudarTema()

function MudarTema(){
    var isChecked = document.querySelector("#switchValue").checked;

    if (isChecked) {
        document.body.classList.add("Dark-theme")
        paraEscuro()

    } else {
        document.body.classList.remove("Dark-theme")
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

// SLIDER DE SOM

const mySlider = document.getElementById("my-slider");
const sliderValue = document.getElementById("slider-value");
let SoundButton = document.querySelector("#SoundButton")
SoundButtonOriginal =  document.querySelector("#SoundButton").getAttribute('src');
mySlider.value = localStorage.getItem("Som");

function slider(){
    valPercent = (mySlider.value / mySlider.max)*100;
    mySlider.style.background = `linear-gradient(to right, var(--main-brand) ${valPercent}%, #d5d5d5 ${valPercent}%)`;
    sliderValue.textContent = mySlider.value;

    if(valPercent == 0){
        SoundButton.src = "./images/NoSoundButton.png"
    } else{
        SoundButton.src = SoundButtonOriginal;
    }
    localStorage.setItem("Som", valPercent);
}
slider();

function Mutar(){
    if(SoundButton.getAttribute('src') == SoundButtonOriginal){
        SoundButton.src = "./images/NoSoundButton.png"
        mySlider.value = 0;
    } else{
        SoundButton.src = SoundButtonOriginal;
        mySlider.value = 50;
    }
    slider()
}