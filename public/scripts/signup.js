
function cadastro(){

    event.preventDefault()

    var email = document.getElementById("emailInput").value
    var name = document.getElementById("nameInput").value
    var username = document.getElementById("usernameInput").value
    var password= document.getElementById("passwordInput").value
    var password2 = document.getElementById("password2Input").value
    

    if(password==password2){
        if(email.length <=80){
            if(name.length <= 50){
                if(username.length <= 30){
                    if(password.length <= 20 && password.length >=4){

                            info={
                                email:email,
                                name:name,
                                username:username,
                                senha:password
                            }

                            fetch("/signup", {
                                method:"POST",
                                headers:{
                                    "Content-type": "application/json"
                                },
                                body:JSON.stringify(info)
                            }).then(response => response.json()) // Converte a resposta em um objeto JavaScript
                            .then(data => {
                                if(data.resposta == "Unique"){
                                    alert("E-mail ou username já estão sendo utilizados por outro usuário")
                                    return
                                } if(data.resposta == "Erro"){
                                    alert("Erro ao fazer atualização das informações")
                                    return
                                }
                                localStorage.setItem("login", JSON.stringify(info))
                                window.location.href = "../app.html"
                            })


                    }else{alert("Senha muito longa ou curta")}
                }else{alert("Username muito longo")}
            }else{alert("Nome muito longo")}
        }else{alert("Email muito longo")}
    }else{alert("Senhas não coincidem")}


    

}