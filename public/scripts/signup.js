
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

                        try {
                            info={
                                email:email,
                                name:name,
                                username:username,
                                password:password
                            }

                            fetch("/signup", {
                                method:"POST",
                                headers:{
                                    "Content-type": "application/json"
                                },
                                body:JSON.stringify(info)
                            })

                            window.location.href = "../app.html"


                        }catch (error) {
                            alert("Não foi possível fazer o cadastro.")
                        }

                    }else{alert("Senha muito longa ou curta")}
                }else{alert("Username muito longo")}
            }else{alert("Nome muito longo")}
        }else{alert("Email muito longo")}
    }else{alert("Senhas não coincidem")}


    

}