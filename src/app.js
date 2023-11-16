// Configurando o prisma
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// Configurando o express para usar o protocólo http
const express = require('express')
const app = express()

const route = require('./routes/route')

// Nescessários para utilizar da API do google cloud storage
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limita o tamanho da imagem para 5 megas
  },
});
const storage = new Storage({
  projectId: "codedrafts-401521",
  keyFilename: "keys.json"
});
const bucket = storage.bucket('imagesdrafts');

app.post("/upload", multer.single('imgfile'), (req, res) => {
  try {
    if (req.file) {
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send("Imagem enviada");
        console.log("Enviado");
      });
      blobStream.end(req.file.buffer);
    } else {
      throw "Erro ao enviar mensagem";
    }
  } catch (error) {
    if (error.code === "LIMIT_FILE_SIZE") {
      // Lidar com erro de tamanho de arquivo muito grande
      res.status(400).send("Tamanho do arquivo excede o limite permitido");
    } else {
      // Lidar com outros erros
      res.status(400).send(error);
    }
  }
});


// Decode e uncode de json para objeto e objeto para json
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', route)


// Node escuta requisições da porta 3000
app.listen(3000, () =>{
    console.log("Servidor Projeto Node com SQLServer")
})

var path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

// COLOCAR ARQUIVOS HTML
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, '../index.html'));
})
app.get("/app.html", function(req, res){
    res.sendFile(path.join(__dirname, '../app.html'));
})
app.get("/configurations.html", function(req, res){
    res.sendFile(path.join(__dirname, '../configurations.html'));
})
app.get("/user.html", function(req, res){
    res.sendFile(path.join(__dirname, '../user.html'));
})

let SavedidUsuario = null

// VERIFICAR LOGIN USUÁRIO
app.post("/verificarUsuario", async(req, res) =>{
  const users = await prisma.$queryRaw
  `select * from CodeDrafts.Usuario where email = ${req.body.email} and senha = ${req.body.senha} and ativo = 1`
  if(users != ''){
    SavedidUsuario = users[0].idUsuario
  }
  res.json(users)
})

app.post("/postsUser", async(req, res) =>{
  const posts = await prisma.$queryRaw
  `select * from CodeDrafts.V_PreviewPost where username = ${req.body.username} order by pontosPost DESC`;
  res.json(posts)
})

app.post("/comentariosuser", async(req, res) =>{
  const comentarios = await prisma.$queryRaw
  `select * from CodeDrafts.V_PreviewComentario where username = ${req.body.username} order by pontosComentario DESC`;
  res.json(comentarios)
})

app.post("/searchposts", async(req, res) =>{

  query = `select * from CodeDrafts.V_PreviewPost`
  if(req.body.temParametroBusca){
    query += ` WHERE (CHARINDEX('${req.body.content}', titulo, 0) > 0 OR CHARINDEX('${req.body.content}', conteudo, 0) > 0
    OR CHARINDEX('${req.body.content}', nome, 0) > 0)`
  }
  
  if(req.body.tópicos.length != 0){
    if(req.body.temParametroBusca){
      query += ` AND`
    }
    if(!req.body.temParametroBusca && (req.body.tópicos[0] != "Recentes" || req.body.tópicos.length > 1)){
      query += ` WHERE`
    }

    for(var i = 0; i < req.body.tópicos.length-1; i++){
      if(req.body.tópicos[i] != "Recentes"){
      query += ` CHARINDEX('${req.body.tópicos[i]}', tópicos, 0) > 0 AND`
      }
    } 
      if(req.body.tópicos[req.body.tópicos.length-1] != "Recentes"){
        query += ` CHARINDEX('${req.body.tópicos[req.body.tópicos.length-1]}', tópicos, 0) > 0`
      }
  }

  if(req.body.tópicos[0] == "Recentes"){
    query += ` order by idPost DESC`
  } else{
    query += ` order by pontosPost DESC`
  }

  try{
    posts = await prisma.$queryRawUnsafe(query)
  } catch{
    posts = {}
  }
    res.json(posts)
})

app.get("/filters", async(req, res) =>{
  const filters = await prisma.$queryRaw
  `select * from CodeDrafts.Topico`;
  res.json(filters)
})

app.post("/conquistas", async(req, res) =>{
  const conquistas = await prisma.$queryRaw
  `select nome, nivel, imagem from CodeDrafts.V_ConquistasUser C where C.idUsuario = ${req.body.idUsuario} order by nivel DESC`
  res.json(conquistas)
})

app.get("/ranks", async(req, res) =>{
  const ranks = await prisma.$queryRaw
  `select * from CodeDrafts.V_Ranking`;

  const existeConquista = await prisma.$queryRaw
  `select * from CodeDrafts.UsuarioConquista where idUsuario = ${ranks[0].idUsuario} and idConquista = 8`;

  if(existeConquista == ""){
    await prisma.$queryRaw
  `insert into CodeDrafts.UsuarioConquista values(${ranks[0].idUsuario}, 8)`;
  }
  res.json(ranks)
})

// CONFIGURATIONS

app.post("/atualizarUsuario", async(req, res) =>{
  if(SavedidUsuario == req.body.idUsuario){

      const u = await prisma.$queryRaw
        `select * from CodeDrafts.Usuario where email = ${req.body.emailAntigo} and senha = ${req.body.senhaAntiga}`
    try{
      await prisma.$queryRaw 
          `exec CodeDrafts.spAtualizarUsuario ${u[0].idUsuario}, ${req.body.nome}, ${req.body.username}, 
          ${req.body.descricao}, ${req.body.fotoPerfil}, ${req.body.senha}, ${u[0].pontosTotais}, ${u[0].ativo}, ${u[0].quantidadeDenuncias}, ${req.body.email}`;

          res.json({resposta: "Sucesso"})
          return
    } catch(error){
        if (error.message.includes("UNIQUE em username e e-mail")){
          res.json({resposta: "Unique"})
        }else{
            console.log(error.message)
            res.json({resposta: "Erro"})
        }
      }} else{
        res.json({resposta: "Fracasso"})
      }
  })

app.post("/signup", async(req, res) =>{
  try{
     await prisma.$queryRaw
    `exec CodeDrafts.spInserirUsuario ${req.body.name}, ${req.body.username}, ${req.body.senha}, ${req.body.email}`;
    res.json({resposta: "Sucesso"})
  } catch(error){
    if (error.message.includes("UNIQUE em username e e-mail")){
      res.json({resposta: "Unique"})
    } else{
      res.json({resposta: "Erro"})
    }
  }
  })

// INTERAÇÕES

app.post("/jareportoupost", async(req, res) =>{
  if(SavedidUsuario == req.body.idUsuario){
    const report = await prisma.$queryRaw
    `select * from CodeDrafts.UsuarioPost where idUsuario = ${req.body.idUsuario} and idPost = ${req.body.idPost} and denunciado = 1`;
    if(report != ''){
      res.json({resposta: "True", idPost: req.body.idPost})
    } 
    else{
      if(req.body.ação != "verificar"){
        res.json({resposta: "False"})
        const existeTabela = await prisma.$queryRaw
        `select * from CodeDrafts.UsuarioPost where idUsuario = ${req.body.idUsuario} and idPost = ${req.body.idPost}`;

        if(report == ''){
          await prisma.$queryRaw
          `exec CodeDrafts.spInserirUsuarioPost ${req.body.idUsuario}, ${req.body.idPost}, 1, null`}
        else{
          await prisma.$queryRaw`
            exec CodeDrafts.spAtualizarUsuarioPost ${existeTabela.idUsuarioPost}, 1, ${existeTabela.curtido};
            UPDATE CodeDrafts.Post set quantidadeDenuncias += 1 where idPost = ${req.body.idPost};
          `;
        }}
      else{
        res.json({resposta: "False", idPost: req.body.idPost})
      }}} else{
        res.json({resposta: "Fracasso", idPost: req.body.idPost})
      }
  })

  app.post("/jareportoucomentario", async(req, res) =>{


    if(SavedidUsuario == req.body.idUsuario){
      const report = await prisma.$queryRaw
      `select * from CodeDrafts.UsuarioComentario where idUsuario = ${req.body.idUsuario} and idComentario = ${req.body.idComentario} and denunciado = 1`;
      if(report != ''){
        res.json({resposta: "True", idComentario: req.body.idComentario})
      } 
      else{
        if(req.body.ação != "verificar"){
          res.json({resposta: "False"})
          const existeTabela = await prisma.$queryRaw
          `select * from CodeDrafts.UsuarioComentario where idUsuario = ${req.body.idUsuario} and idComentario = ${req.body.idComentario}`;
  
          if(report == ''){
            await prisma.$queryRaw
            `exec CodeDrafts.spInserirUsuarioComentario ${req.body.idUsuario}, ${req.body.idComentario}, 1, null`}
          else{
            await prisma.$queryRaw`
              exec CodeDrafts.spAtualizarUsuarioComentario ${existeTabela.idUsuarioComentario}, 1, ${existeTabela.curtido};
              UPDATE CodeDrafts.Comentario set quantidadeDenuncias += 1 where idComentario = ${req.body.idComentario};
            `;
          }}
        else{
          res.json({resposta: "False", idComentario: req.body.idComentario})
        }}} else{
          res.json({resposta: "Fracasso", idComentario: req.body.idComentario})
        }
    })

app.post("/jareportouusuario", async(req, res) =>{
  if(SavedidUsuario == req.body.idUsuario){
    const report = await prisma.$queryRaw
    `select * from CodeDrafts.UsuarioUsuario where ((idUsuario1 = ${req.body.idUsuario} and idUsuario2 = ${req.body.idOutroUsuario})
    or (idUsuario1 = ${req.body.idOutroUsuario} and idUsuario2 = ${req.body.idUsuario})) and denunciado = 1`;
    
    if(report != ''){
      res.json({resposta: "True"})
      return
    } 

    else{
      if(req.body.ação != "verificar"){
        res.json({resposta: "False"})
        const existeTabela = await prisma.$queryRaw
        `select * from CodeDrafts.UsuarioUsuario where idUsuario1 = ${req.body.idUsuario} and idUsuario2 = ${req.body.idOutroUsuario}`;

        if(report == ''){
          await prisma.$queryRaw
          `exec CodeDrafts.spInserirUsuarioUsuario ${req.body.idUsuario}, ${req.body.idOutroUsuario}, 0, 1`}
        else{
          await prisma.$queryRaw`
            exec CodeDrafts.spAtualizarUsuarioPost ${existeTabela.idUsuarioUsuario}, ${req.body.idUsuario}, ${req.body.idOutroUsuario}, ${existeTabela.confirmado}, 1;
            UPDATE CodeDrafts.Usuario set quantidadeDenuncias += 1 where idUsuario = ${req.body.idOutroUsuario};
          `;
        }}
      else{
        res.json({resposta: "False"})
      }}}
      else{
        res.json({resposta: "Fracasso"})
      }
  })


app.post("/curtidaspost", async(req, res) =>{
    const existeTabela = await prisma.$queryRaw
        `select * from CodeDrafts.UsuarioPost where idUsuario = ${req.body.idUsuario} and idPost = ${req.body.idPost} and curtido is not null`;
    
    criadorPost = await prisma.$queryRaw   
          `select idUsuario from CodeDrafts.Post where idPost = ${req.body.idPost}`;
  
    if(req.body.ação == "verificar"){
      if(existeTabela != ""){
        res.json(existeTabela)
        return
      }
      res.json({resposta: ""})
      return
    }
  

  if(SavedidUsuario == req.body.idUsuario){
      const existeInteração = await prisma.$queryRaw
          `select * from CodeDrafts.UsuarioPost where idUsuario = ${req.body.idUsuario} and idPost = ${req.body.idPost}`;
        
      if(existeInteração != ""){
        mudança = 1
        if(req.body.ação == "descurtir"){
          await prisma.$queryRaw
          `exec CodeDrafts.spAtualizarUsuarioPost ${existeInteração[0].idUsuarioPost}, ${existeInteração[0].denunciado}, 0`
        
        if(existeInteração[0].curtido == 1){mudança = 2}
        await prisma.$queryRaw`
          UPDATE CodeDrafts.Post set pontosPost -= ${mudança} where idPost = ${req.body.idPost};
          UPDATE CodeDrafts.Usuario set pontosTotais -= ${mudança} where idUsuario = ${criadorPost[0].idUsuario};
        `;
      
        } 
        if(req.body.ação == "tirarDescurtida"){
          await prisma.$queryRaw`
          exec CodeDrafts.spAtualizarUsuarioPost ${existeInteração[0].idUsuarioPost}, ${existeInteração[0].denunciado}, null;
          UPDATE CodeDrafts.Post set pontosPost += 1 where idPost = ${req.body.idPost};
          UPDATE CodeDrafts.Usuario set pontosTotais += 1 where idUsuario = ${criadorPost[0].idUsuario};
        `;
        }

        if(req.body.ação == "curtir"){
          await prisma.$queryRaw
          `exec CodeDrafts.spAtualizarUsuarioPost ${existeInteração[0].idUsuarioPost}, ${existeInteração[0].denunciado}, 1`
          
          if(existeInteração[0].curtido == 0){mudança = 2}
          await prisma.$queryRaw`
            UPDATE CodeDrafts.Post set pontosPost += ${mudança} where idPost = ${req.body.idPost};
            UPDATE CodeDrafts.Usuario set pontosTotais += ${mudança} where idUsuario = ${criadorPost[0].idUsuario};
          `;

        } 
        if(req.body.ação == "tirarCurtida"){
          await prisma.$queryRaw`
            exec CodeDrafts.spAtualizarUsuarioPost ${existeInteração[0].idUsuarioPost}, ${existeInteração[0].denunciado}, null;
            UPDATE CodeDrafts.Post set pontosPost -= 1 where idPost = ${req.body.idPost};
            UPDATE CodeDrafts.Usuario set pontosTotais -= 1 where idUsuario = ${criadorPost[0].idUsuario};`;
        }}
      else{
          opção = -1
          mudança = null
          if(req.body.ação == "descurtir"){
            opção = 0
          } 
          if(req.body.ação == "tirarDescurtida" || req.body.ação == "tirarCurtida"){
            opção = null
          }
          if(req.body.ação == "curtir"){
            opção = 1
          } 
          
          await prisma.$queryRaw
          `exec CodeDrafts.spInserirUsuarioPost ${req.body.idUsuario}, ${req.body.idPost}, 0, ${opção}`
      
          if(opção == 1){
            await prisma.$queryRaw
              `UPDATE CodeDrafts.Usuario set pontosTotais += 1 where idUsuario = ${criadorPost[0].idUsuario}`;
          }
          if(opção == 0){
            await prisma.$queryRaw
              `UPDATE CodeDrafts.Usuario set pontosTotais -= 1 where idUsuario = ${criadorPost[0].idUsuario}`;
          }
    }
  }else{
      res.json({resposta: ""})
    }
})



app.post("/curtidascomentario", async(req, res) =>{
  const existeTabela = await prisma.$queryRaw
      `select * from CodeDrafts.UsuarioComentario where idUsuario = ${req.body.idUsuario} and idComentario = ${req.body.idComentario} and curtido is not null`;
  
  criadorComentario = await prisma.$queryRaw   
        `select idUsuario from CodeDrafts.Comentario where idComentario = ${req.body.idComentario}`;

  if(req.body.ação == "verificar"){
    if(existeTabela != ""){
      res.json(existeTabela)
      return
    }
    res.json({resposta: ""})
    return
  }

if(SavedidUsuario == req.body.idUsuario){
    const existeInteração = await prisma.$queryRaw
        `select * from CodeDrafts.UsuarioComentario where idUsuario = ${req.body.idUsuario} and idComentario = ${req.body.idComentario}`;
      
    if(existeInteração != ""){
      mudança = 1
      if(req.body.ação == "descurtir"){
        await prisma.$queryRaw
        `exec CodeDrafts.spAtualizarUsuarioComentario ${existeInteração[0].idUsuarioComentario}, ${existeInteração[0].denunciado}, 0`
      
      if(existeInteração[0].curtido == 1){mudança = 2}
      await prisma.$queryRaw`
        UPDATE CodeDrafts.Comentario set pontosComentario -= ${mudança} where idComentario = ${req.body.idComentario};
        UPDATE CodeDrafts.Usuario set pontosTotais -= ${mudança} where idUsuario = ${criadorComentario[0].idUsuario};
      `;
    
      } 
      if(req.body.ação == "tirarDescurtida"){
        await prisma.$queryRaw`
        exec CodeDrafts.spAtualizarUsuarioComentario ${existeInteração[0].idUsuarioComentario}, ${existeInteração[0].denunciado}, null;
        UPDATE CodeDrafts.Comentario set pontosComentario += 1 where idComentario = ${req.body.idComentario};
        UPDATE CodeDrafts.Usuario set pontosTotais += 1 where idUsuario = ${criadorComentario[0].idUsuario};
      `;
      }

      if(req.body.ação == "curtir"){
        await prisma.$queryRaw
        `exec CodeDrafts.spAtualizarUsuarioComentario ${existeInteração[0].idUsuarioComentario}, ${existeInteração[0].denunciado}, 1`
        
        if(existeInteração[0].curtido == 0){mudança = 2}
        await prisma.$queryRaw`
          UPDATE CodeDrafts.Comentario set pontosComentario += ${mudança} where idComentario = ${req.body.idComentario};
          UPDATE CodeDrafts.Usuario set pontosTotais += ${mudança} where idUsuario = ${criadorComentario[0].idUsuario};
        `;

      } 
      if(req.body.ação == "tirarCurtida"){
        await prisma.$queryRaw`
          exec CodeDrafts.spAtualizarUsuarioComentario ${existeInteração[0].idUsuarioComentario}, ${existeInteração[0].denunciado}, null;
          UPDATE CodeDrafts.Comentario set pontosComentario -= 1 where idComentario = ${req.body.idComentario};
          UPDATE CodeDrafts.Usuario set pontosTotais -= 1 where idUsuario = ${criadorComentario[0].idUsuario};`;
      }}
    else{
        opção = -1
        mudança = null
        if(req.body.ação == "descurtir"){
          opção = 0
        } 
        if(req.body.ação == "tirarDescurtida" || req.body.ação == "tirarCurtida"){
          opção = null
        }
        if(req.body.ação == "curtir"){
          opção = 1
        } 

        await prisma.$queryRaw
        `exec CodeDrafts.spInserirUsuarioComentario ${req.body.idUsuario}, ${req.body.idComentario}, 0, ${opção}`
    
        if(opção == 1){
          await prisma.$queryRaw
            `UPDATE CodeDrafts.Usuario set pontosTotais += 1 where idUsuario = ${criadorComentario[0].idUsuario}`;
        }
        if(opção == 0){
          await prisma.$queryRaw
            `UPDATE CodeDrafts.Usuario set pontosTotais -= 1 where idUsuario = ${criadorComentario[0].idUsuario}`;
        }
  }
}else{
    res.json({resposta: "Fracasso"})
    return
  }

res.json({resposta: ""})
})


app.get('/user/*', async (req, res) => {
  const urlString = req.url;
  const urlAsString = urlString.toString();
  const usernameV = urlAsString.split("/");
  const username = usernameV[2];;


    const search = await prisma.$queryRaw `select * from CodeDrafts.Usuario where username=${username}`;
  

  if (search != "") {
    result = search[0]
    res.send(createUserPage(result))

  } else {
    res.send(`
      <br><br>
      <h1 style="font-size:70px;text-align:center">Usuário não encontrado.</h1>
      `);
  }
});


app.get('/post/*', async (req, res) => {
  const urlString = req.url;
  const urlAsString = urlString.toString();
  const idV = urlAsString.split("/");
  const idPost = parseInt(idV[2]);


  const search = await prisma.$queryRaw `select * from CodeDrafts.Post where idPost=${idPost}`;


  if (search != "") {
    postInfo = search[0]
    const userSearch = await prisma.$queryRaw `select * from CodeDrafts.Usuario where idUsuario=${postInfo.idUsuario}`;
    userInfo = userSearch[0]

    comentarios = await prisma.$queryRaw
    `select * from CodeDrafts.V_PreviewComentario PC where idPost = ${idPost}`

    res.send(createPostPage(postInfo, userInfo, comentarios))

  } else {
    res.send(`
      <br><br>
      <h1 style="font-size:70px;text-align:center">Post não encontrado.</h1>
      `);
  }
});



app.post("/postar", async(req, res) =>{
  if(SavedidUsuario == req.body.idUsuario){
    await prisma.$queryRaw
    `exec Codedrafts.spInserirPost ${req.body.titulo},${req.body.conteudo},0,${req.body.capa},1,0,${req.body.idUsuario},null`

    const idPostSearch = await prisma.$queryRaw
    `select idPost from codedrafts.post order by idPost desc`

    idPost = parseInt(idPostSearch[0].idPost)

    for(i=0;i<req.body.topicos.length;i++){
      await prisma.$queryRaw
      `insert into codedrafts.PostTopico values (${idPost},${req.body.topicos[i]});`
    }
  } 
})

app.post("/comentar", async(req, res)=>{
  if(SavedidUsuario == req.body.idUsuario){
    await prisma.$queryRaw
    `exec CodeDrafts.spInserirComentario ${req.body.texto}, ${req.body.idUsuario}, ${req.body.idPost}`
    res.json({resposta: "Sucesso"})
  } else{
    res.json({resposta: "Fracasso"})
  }
})

app.post("/deletarpost", async(req, res) =>{
  post = await prisma.$queryRaw
  `select * from CodeDrafts.Post where idPost = ${req.body.idPost}`

  if(SavedidUsuario == post[0].idUsuario){
    await prisma.$queryRaw
    `exec CodeDrafts.spDeletarPost ${req.body.idPost},${req.body.idModerador}`

    res.json({resposta: "Sucesso"})
  }else{
    res.json({resposta: "Fracasso"})
  }
})

app.post("/deletarcomentario", async(req, res) =>{
  comentario = await prisma.$queryRaw
  `select * from CodeDrafts.Comentario where idComentario = ${req.body.idComentario}`

  if(SavedidUsuario == comentario[0].idUsuario){
    await prisma.$queryRaw
    `exec CodeDrafts.spDeletarComentario ${req.body.idComentario}`

    res.json({resposta: "Sucesso"})
  }else{
    res.json({resposta: "Fracasso"})
  }
})

app.post("/excluirUsuario", async(req, res) =>{
  if(SavedidUsuario == req.body.idUsuario){
    await prisma.$queryRaw
    `exec CodeDrafts.spDeletarUsuario ${req.body.idUsuario}`
    res.json({resposta: "Sucesso"})
  }else{
    res.json({resposta: "Fracasso"})
  }
})

app.post("/desativarUsuario", async(req, res) =>{
  if(SavedidUsuario == req.body.idUsuario){
  await prisma.$queryRaw
  `update CodeDrafts.Usuario set ativo = 0 where idUsuario = ${req.body.idUsuario}`

  res.json({resposta: "Sucesso"})
  } else{
    res.json({resposta: "Fracasso"})
  }
})



function createUserPage(data){
return `<!DOCTYPE html>
  <html lang="pt-br">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="icon" href="../../images/logoIconWithoutBackground.png">
      <title>${data.nome}</title>
  
      <link rel="stylesheet" href="../../styles/estiloUser.css">
      <link rel="stylesheet" href="../../styles/boxes.css">
      <link rel="stylesheet" href="../../styles/styleGenerico.css">
  
      <script src="../../scripts/avoidFlickering.js"></script>
  </head>
  <body id="${data.idUsuario}">
  
      <button class="botao" id="btnConfigs" onclick="reportarUser()"><img src="../../images/report.png"></button>
      <a class="botao" id="btnVoltar" href="../../app.html">Voltar</a>
  
     <header id="menuHeader">
          <button class="headerButton" id="headerConfigs" onclick="reportarUser()" id="menuConfigs"><img src="../../images/report.png"></button>
          <a class="headerButton" id="headerVoltar" href="../../app.html">Voltar</a>
     </header>
  
     <div id="pageContent">
          <div id="geral">
              <div id="topper">
                  <div id="mainInfo">
                      <div id="boxAvatar">
                          <img src="${data.fotoPerfil}" id="userAvatar">
                      </div>
                      <div id="boxTexto">
                          <div id="boxUserName">
                              <p id="nomeDoUsuario">${data.nome}</p>
                          </div>
                          <div id="boxInfo">
                              <p id="userName">${data.username}</p>
                              <p id="pontos">${data.pontosTotais}</p>
                          </div>
                      </div>
                  </div>
              </div>
              
              <div id="center">
                  <aside id="boxConquistas">
                      <div id="quadradoConquistas">
  
                      </div>
                  </aside>
  
  
                  <div id="boxCbPosts">
                      <div id="divContentButtons">
                          <button onclick="selecionar('Posts')" id="Posts" class="contentButton">Posts</button>
                          <button onclick="selecionar('Comentarios')" id="Comentarios" class="contentButton">Comentários</button>
                          <button onclick="selecionar('CbPessoal')" id="CbPessoal" class="contentButton">Pessoal</button>
                          <button onclick="selecionar('CbConquistas')" id="CbConquistas" class="contentButton">Conquistas</button>
                      </div>
  
                      <div id="boxPosts" class="boxCbs"></div>

                      <div id="boxComentarios" class="boxCbs"></div>
  
                      <div id="boxCbPessoal" class="boxCbs">
                          <div id="boxCbPessoalRanking">
                          </div>
                          <div id="boxCbPessoalCEDBio">
                              <div id="boxCbBIO">
                                  <div id="containerBio"></div>
                              </div>
                              <div id="boxCbCED">
                              </div>
                          </div>
                      </div>
  
                      <div id="boxCbConquistas" class="boxCbs">
                      </div>
  
                  </div>
          
              </div>
          </div>        
          <aside id="side">
              <div id="boxBIO">
                  <div id="bio">
                      <p id="bioText">${data.descricao}</p>
                  </div>
              </div>
          
              <div id="boxCED">
                  <div id="conquistaEmDestaque">
  
                      <div class="cardConquista" id="cardConquistaEmDestaque">
                          
                      </div>
  
                  </div>
              </div>
  
              <div id="boxRANKING">
                  <div id="ranking">
                      
                  </div>
              </div>
          </aside>
      </div>
  
  <section id="box" class="confirmarDenuncia">
      <h1>Confirmar denúncia</h1>
      <p>Deseja denunciar o post desse usuário? </p>
      <button onclick="confirmarDenuncia('post')" id="ConfirmarButton">Confirmar</button>
      <button onclick="fecharDenuncia()"  id="RetornarButton">Retornar</button>
      <button id="exitLogin" onclick="fecharDenuncia()">X</button>
  </section>

  <section id="box" class="confirmarDenuncia denunciaComentario">
    <h1>Confirmar denúncia</h1>
    <p>Deseja denunciar o comentário desse usuário? </p>
    <button onclick="confirmarDenuncia('comentario')" id="ConfirmarButton">Confirmar</button>
    <button onclick="fecharDenuncia()"  id="RetornarButton">Retornar</button>
    <button id="exitLogin" onclick="fecharDenuncia()">X</button>
  </section>
  
  <section id="box" class="confirmarDenuncia DenunciaUser">
      <h1>Confirmar denúncia</h1>
      <p>Deseja denunciar esse usuário? </p>
      <button onclick="confirmarDenuncia('usuario')" id="ConfirmarButton">Confirmar</button>
      <button onclick="fecharDenuncia()"  id="RetornarButton">Retornar</button>
      <button id="exitLogin" onclick="fecharDenuncia()">X</button>
  </section>

  <section id="box" class="confirmarDenuncia confirmarDeletarPost">
    <h1>Confirmar Deleção</h1>
    <p>Deseja realmente apagar seu post? </p>
    <button onclick="confirmarDeleção('post')" id="ConfirmarButton">Confirmar</button>
    <button onclick="fecharDeleção()"  id="RetornarButton">Retornar</button>
    <button id="exitLogin" onclick="fecharDeleção()">X</button>
</section>

<section id="box" class="confirmarDenuncia confirmarDeletarComentario">
    <h1>Confirmar Deleção</h1>
    <p>Deseja realmente apagar seu comentário? </p>
    <button onclick="confirmarDeleção('comentario')" id="ConfirmarButton">Confirmar</button>
    <button onclick="fecharDeleção()"  id="RetornarButton">Retornar</button>
    <button id="exitLogin" onclick="fecharDeleção()">X</button>
</section>
  
  <p id="idUsuario">${data.idUsuario}</p>
  <img id="tema" src="../../images/DarkIcon.png" style="display: none">
      
      <script src="../../scripts/changeTheme.js"></script>
      <script src="../../scripts/coment.js"></script>
      <script src="../../scripts/userSelectedButton.js"></script>
      <script src="../../scripts/scriptUser.js"></script>
      <script src="../../scripts/Post.js"></script>
  
  </body>
  </html>`
}


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



function createPostPage(postInfo, userInfo, comentarios){

  complementoCapa = `<img src="${postInfo.capa}" id="divCapa">`
  if(postInfo.capa == null){complementoCapa = ""}

 let páginaPost = `
  <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userInfo.nome}'s Post</title>

    <link rel="stylesheet" type="text/css" href="../../styles/styleGenerico.css">
    <link rel="stylesheet" type="text/css" href="../../styles/boxes.css">
    <link rel="stylesheet" type="text/css" href="../../styles/postStyle.css">
    <link rel="icon" href="../../images/logoIconWithoutBackground.png">
    <script src="../../scripts/avoidFlickering.js"></script>
</head>
<body class="${postInfo.idPost}">

    <a href="../../app.html" style="color:white;background-color:#a01111;padding:10px;border-radius:20px;position:fixed;top:10px;left:10px">Voltar ao App</a>

    <div class="centro" id="${postInfo.idPost}">
        <div class="boxPost" id="${postInfo.idPost}">

           ${complementoCapa}

            <div id="informacoesPost">
                <div id="tituloContainer">
                    <h1 id="titulo">${postInfo.titulo}</h1>
                </div>

                <div id="informacoesUser" class="informacoes">
                    <div id="boxAutorAvatar">
                        <img class="avatar" src="${userInfo.fotoPerfil}">
                    </div>

                    <div class="containerNome">
                        <a style="color:#fff" href="../../user/${userInfo.username}" id="nomeAutorPost">${userInfo.nome} (@${userInfo.username}) </a>
                    </div>
                </div>

  

            </div>

            <div id="boxTexto">
                <p id="texto">${postInfo.conteudo}</p>
            </div>
            <div class="interaçõesComent">
            <div class="curtidas">
                <span id="quantasCurtidas">${postInfo.pontosPost}</span> 
                <button id="like" onclick="curtir(this, 'post')"> <img src="https://i.imgur.com/Z6N47DN.png">  </button>
                <button id="dislike" onclick="descurtir(this, 'post')"> <img src="https://i.imgur.com/QQ1qeod.png"> </button>
            <button id="report" onclick="reportar(this)"> <img src="https://i.imgur.com/nzxHb7H.png"> </button>
        </div>
        </div>
      `

      if(comentarios.length > 0){
        páginaPost += `<div id="boxComentarios">`
      }

    for(var i = 0; i<comentarios.length; i++){
      páginaPost += `
      <div class="comentario ${comentarios[i].username}" id="${comentarios[i].idComentario}">
      <div class="informacoes">
      <div class="boxComentarioAvatar">
          <img class="avatar" src="${comentarios[i].fotoPerfil}">
      </div>

      <div class="containerNome">
          <p class="nomeAutorComentario">${comentarios[i].nome}</p>
      </div>
      </div>

      <div class="boxTextoComentario">
          <p class="texto">${comentarios[i].texto}</p>
      </div>

      <div class="BoxCurtidasComentario">
      <div class="interaçõesComent">
      <div class="curtidas">
          <span id="quantasCurtidas">${comentarios[i].pontosComentario}</span> 
          <button id="like" onclick="curtir(this, 'comentario')"> <img src="https://i.imgur.com/Z6N47DN.png">  </button>
          <button id="dislike" onclick="descurtir(this, 'comentario')"> <img src="https://i.imgur.com/QQ1qeod.png"> </button>
      <button id="report" onclick="reportarComent(this)"> <img src="https://i.imgur.com/nzxHb7H.png"> </button>
      </div>
      </div>
      </div>
    </div>
      `
    }

    if(comentarios.length > 0){
      páginaPost += `</div>`
    }

páginaPost += `
        <div id="boxComentarios">

        <div class="comentario">
            <div class="informacoes">
                <div class="boxComentarioAvatar">
                    <img class="avatar avatarUsuario" src="">
                </div>

                <div class="containerNome">
                    <p class="nomeAutorComentario AutorComentario">autor</p>
                </div>
            </div>

            <textarea class="areaComentario"></textarea> <br>
            <button class="EnviarComentario" onclick="Comentar()">Enviar</button>

              </div>
            </div>        
          </div>
        </div>
        <img id="tema" src = "../../images/lightIcon.png" style="display: none">

      <section id="box" class="confirmarDenuncia">
          <h1>Confirmar denúncia</h1>
          <p>Deseja denunciar o post desse usuário? </p>
          <button onclick="confirmarDenuncia('post')" id="ConfirmarButton">Confirmar</button>
          <button onclick="fecharDenuncia()"  id="RetornarButton">Retornar</button>
          <button id="exitLogin" onclick="fecharDenuncia()">X</button>
      </section>

      
    <section id="box" class="confirmarDenuncia confirmarDeletarComentario">
      <h1>Confirmar Deleção</h1>
      <p>Deseja realmente apagar seu comentário? </p>
      <button onclick="confirmarDeleção('comentario')" id="ConfirmarButton">Confirmar</button>
      <button onclick="fecharDeleção()"  id="RetornarButton">Retornar</button>
      <button id="exitLogin" onclick="fecharDeleção()">X</button>
    </section>

    <section id="box" class="confirmarDenuncia denunciaComentario">
      <h1>Confirmar denúncia</h1>
      <p>Deseja denunciar o comentário desse usuário? </p>
      <button onclick="confirmarDenuncia('comentario')" id="ConfirmarButton">Confirmar</button>
      <button onclick="fecharDenuncia()"  id="RetornarButton">Retornar</button>
      <button id="exitLogin" onclick="fecharDenuncia()">X</button>
    </section>

        <script src="../../scripts/Post.js"></script>
        <script src="../../scripts/coment.js"></script>
        <script src="../../scripts/changeTheme.js"></script>
        <script src="../../scripts/Post.js"></script>
        </body>
        </html>`

  return páginaPost
}