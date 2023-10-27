// MUDAR SEÇÕES

window.onload = () => {
    loginInformations = localStorage.getItem("login")
    loginInformations = JSON.parse(loginInformations)
        document.getElementById('iconUser').src = loginInformations.fotoPerfil
        document.getElementById('nomeDoUsuario').innerHTML = loginInformations.nome
        document.getElementById('Nome').value = loginInformations.nome
        document.getElementById('@username').value = loginInformations.username
        document.getElementById('Senha').value = loginInformations.senha
        document.getElementById('email').value = loginInformations.email
}

Li = ["Aparencia", "Informações", "Extra", "FAQ", "Sair"]

let AtivarSeção = Seção =>{
    loginInformations = localStorage.getItem("login")
    for(var i = 0; i<Li.length; i++){
        if(Seção == "Informações" && (loginInformations == null || loginInformations == "null")) {
            alert("Faça login primeiro")
            return
        }
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
        fecharSaida()
        for(var i = 0; i<Li.length; i++){
            document.querySelector(`.${Li[i]}`).style = "width: calc(50vw - 50px)"
        }
    }
}

// APARÊNCIA E SOM

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

// INFORMAÇÕES

    Ativo = false
    let LiberarEscrita = input =>{
        BloquearEscrita()
        document.getElementById(`${input}`).disabled = false
        document.getElementById(`${input}`).focus()

        if(input == "Senha"){
            document.getElementById(`inputConfirmarSenha`).disabled = false
            if(!Ativo){
            container = document.querySelector('.Senhas')

            inputConfirmar = document.createElement("input")
            inputConfirmar.setAttribute("placeholder", "Confirmar senha")
            inputConfirmar.setAttribute("id", "inputConfirmarSenha")

            container.appendChild(inputConfirmar)
            Ativo = true
            }
        }
    }

    let BloquearEscrita = () =>{
        document.getElementById(`Nome`).disabled = true
        document.getElementById(`@username`).disabled = true
        document.getElementById(`Senha`).disabled = true
        document.getElementById(`email`).disabled = true
        document.getElementById(`inputConfirmarSenha`).disabled = true
    }

    let Salvar = () =>{
        BloquearEscrita()

        loginInformations = JSON.parse(localStorage.getItem("login"))

        let VfotoPerfil = document.getElementById("iconUser").getAttribute('src');
        let VNome = document.getElementById("Nome").value
        let Vusername = document.getElementById("@username").value
        let VSenha =  document.getElementById("Senha").value
        let VEmail =  document.getElementById("email").value
        let VSenhaConfirmada = document.getElementById("inputConfirmarSenha").value

        if(VNome == '' || Vusername == '' || VSenha == '' || VEmail == ''){
            alert("Nenhum valor pode ser vazio")
        }

        Informações = {
            emailAntigo: loginInformations.email,
            senhaAntiga: loginInformations.senha,
            fotoPerfil: VfotoPerfil,
            nome: VNome,
            username: Vusername,
            senha:  VSenha,
            email:  VEmail,
        }

        if(VSenha==VSenhaConfirmada){
            if(VEmail.length <=80){
                if(VNome.length <= 50){
                    if(Vusername.length <= 30){
                        if(VSenha.length <= 20 && VSenha.length >=4){
    
                            try {
                                fetch("/atualizarUsuario", {
                                    method:"POST",
                                    headers:{
                                        "Content-type": "application/json"
                                    },
                                    body:JSON.stringify(Informações)
                                })
                                
                                loginInformations.fotoPerfil = VfotoPerfil
                                loginInformations.nome = VNome
                                loginInformations.username = Vusername
                                loginInformations.senha = VSenha
                                loginInformations.email = VEmail
                                loginInformations.email = VfotoPerfil
                                localStorage.setItem("login", JSON.stringify(Informações));
    
    
                            }catch (error) {
                                alert("Não foi possível atualizar suas informações, tente novamente.")
                            }
    
                        }else{alert("Senha muito longa ou curta")}
                    }else{alert("Username muito longo")}
                }else{alert("Nome muito longo")}
            }else{alert("Email muito longo")}
        }else{alert("Senhas não coincidem")}

    }

// SAIR

divSair = document.querySelector('.confirmarSaida')

let Sair = () =>{
    document.body.style="pointer-events: none; user-select: none;"
    divSair.style = "display: grid; pointer-events: all; user-select: auto;"
}

let confirmarSaida = () =>{
    localStorage.setItem("login", null);
    fecharSaida()
}

let fecharSaida = () =>{
    divSair.style = "display: none"
    document.body.style="pointer-events: all; user-select: auto;"
}
