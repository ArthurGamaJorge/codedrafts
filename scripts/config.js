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

function slider(){
    valPercent = (mySlider.value / mySlider.max)*100;
    mySlider.style.background = `linear-gradient(to right, var(--main-brand) ${valPercent}%, #d5d5d5 ${valPercent}%)`;
    sliderValue.textContent = mySlider.value;

    if(valPercent == 0){
        SoundButton.src = "./Images/NoSoundButton.png"
    } else{
        SoundButton.src = SoundButtonOriginal;
    }
}
slider();

function Mutar(){
    if(SoundButton.getAttribute('src') == SoundButtonOriginal){
        SoundButton.src = "./Images/NoSoundButton.png"
        mySlider.value = 0;
    } else{
        SoundButton.src = SoundButtonOriginal;
        mySlider.value = 50;
    }
    slider()
}