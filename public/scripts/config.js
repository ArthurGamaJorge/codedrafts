// MUDAR SEÇÕES

window.onload = () => {
    loginInformations = JSON.parse(localStorage.getItem("login"))
        document.getElementById('iconUser').src = loginInformations.fotoPerfil
        document.getElementById('nomeDoUsuario').innerHTML = loginInformations.nome
        document.getElementById('Nome').value = loginInformations.nome
        document.getElementById('@username').value = loginInformations.username
        document.getElementById('Senha').value = loginInformations.senha
        document.getElementById('email').value = loginInformations.email
        document.getElementById('bio').value = loginInformations.descricao

    fetch("/verificarUsuario", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(loginInformations)
    })
}

Li = ["Aparencia", "Informações", "Extra", "FAQ", "Sair"]

let AtivarSeção = Seção =>{
    for(var i = 0; i<Li.length; i++){
        if((Seção == "Informações" || Seção == "Sair") && (loginInformations == null || Object.keys(loginInformations).length == 0)) {
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
        fechar(boxSair)
        fechar(boxDesativar)
        fechar(boxExcluir)
        for(var i = 0; i<Li.length; i++){
            document.querySelector(`.${Li[i]}`).style = "width: calc(50vw - 50px)"
        }
    }
}

// APARÊNCIA 

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

// INFORMAÇÕES

    Ativo = false
    let LiberarEscrita = input =>{
        BloquearEscrita()
        document.getElementById(`${input}`).disabled = false
        document.getElementById(`${input}`).focus()

        if(input == "Senha"){
            inputSenha = document.getElementById(`inputConfirmarSenha`).disabled = false
            document.getElementById(`Senha`).type = "text"
            document.getElementById(`inputConfirmarSenha`).type = "text"

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
        document.getElementById(`bio`).disabled = true
        document.getElementById(`inputConfirmarSenha`).type = "password"
        document.getElementById(`Senha`).type = "password"
    }

    let Salvar = () =>{
        BloquearEscrita()

        let VfotoPerfil = document.getElementById("iconUser").getAttribute('src');
        let VNome = document.getElementById("Nome").value
        let Vusername = document.getElementById("@username").value
        let VSenha =  document.getElementById("Senha").value
        let VEmail =  document.getElementById("email").value
        let VBio = document.getElementById('bio').value
        let VSenhaConfirmada = document.getElementById("inputConfirmarSenha").value

        if(VNome == '' || Vusername == '' || VSenha == '' || VEmail == ''){
            alert("Nenhum valor pode ser vazio")
        }

        infoUser = {
            emailAntigo: loginInformations.email,
            senhaAntiga: loginInformations.senha,
            idUsuario: loginInformations.idUsuario,
            fotoPerfil: VfotoPerfil,
            nome: VNome,
            username: Vusername,
            senha:  VSenha,
            email:  VEmail,
            descricao: VBio
        }

        if(VSenha==VSenhaConfirmada || VSenhaConfirmada == undefined){
            if(VEmail.length <=80){
                if(VNome.length <= 50){
                    if(Vusername.length <= 30){
                        if(VSenha.length <= 20 && VSenha.length >=4){
                            if(VBio.length <= 400){

                            fetch("/atualizarUsuario", {
                                method:"POST",
                                headers:{
                                    "Content-type": "application/json"
                                },
                                body:JSON.stringify(infoUser)
                            }).then(response => response.json()) // Converte a resposta em um objeto JavaScript
                            .then(data => {
                                if(data.resposta == "Unique"){
                                    alert("E-mail ou username já estão sendo utilizados por outro usuário")
                                    return
                                } if(data.resposta == "Erro"){
                                    alert("Erro ao fazer atualização das informações")
                                    return
                                }
                                    localStorage.setItem("login", JSON.stringify(infoUser));
                                    alert("Informações atualizadas com sucesso")
                                })
                            }else{alert("Bio deve ter no máximo 400 caractéres")}
                        }else{alert("Senha muito longa ou curta")}
                    }else{alert("Username muito longo")}
                }else{alert("Nome muito longo")}
            }else{alert("Email muito longo")}
        }else{alert("Senhas não coincidem")}

    }

// SAIR

boxSair = document.querySelector('.confirmarSaida')
boxDesativar = document.querySelector('.confirmarDesativação')
boxExcluir = document.querySelector('.confirmarExclusão')

let Sair = () =>{
    document.body.style="pointer-events: none; user-select: none;"
    boxSair.style = "display: grid; pointer-events: all; user-select: auto;"
}

let Desativar = () =>{
    document.body.style="pointer-events: none; user-select: none;"
    boxDesativar.style = "display: grid; pointer-events: all; user-select: auto;"
}

let Excluir = () =>{
    document.body.style="pointer-events: none; user-select: none;"
    boxExcluir.style = "display: grid; pointer-events: all; user-select: auto;"
}
 
let confirmarSaida = () =>{
    localStorage.setItem("login", null);
    fechar(boxSair)
    window.location.href = "app.html"
}

let confirmarDesativação = () =>{
    fetch("/desativarUsuario", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(loginInformations)
    }).then(response => response.json()) // Converte a resposta em um objeto JavaScript
      .then(data => {
        localStorage.setItem("login", null);
        window.location.href = "app.html"
    })
}

let confirmarExclusão = () =>{
    fetch("/excluirUsuario", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(loginInformations)
    }).then(response => response.json()) // Converte a resposta em um objeto JavaScript
    .then(data => {
        localStorage.setItem("login", null);
        window.location.href = "app.html"
    })
}

let fechar = box =>{
    box.style = "display: none"
    document.body.style="pointer-events: all; user-select: auto;"
}
