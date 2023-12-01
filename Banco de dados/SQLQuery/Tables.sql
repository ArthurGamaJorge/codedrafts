CREATE SCHEMA CodeDrafts

CREATE TABLE CodeDrafts.Usuario(
	idUsuario INT PRIMARY KEY IDENTITY(1,1),
	nome nVARCHAR(50) NOT NULL,
	username VARCHAR(30) NOT NULL UNIQUE,
	descricao VARCHAR(400) NOT NULL,
	fotoPerfil VARCHAR(200) NOT NULL, -- DEFAULT 'noUserImage.png'
	senha VARCHAR(20) NOT NULL,
	ativo BIT NOT NULL, -- DEFAULT 1
	quantidadeDenuncias INT NOT NULL, -- DEFAULT 0
	pontosTotais INT NOT NULL, -- DEFAULT 0,
	dataCriacaoUsuario DATE NOT NULL, -- DEFAULT GETDATE()
	email VARCHAR(80) NOT NULL UNIQUE
)	


CREATE TABLE CodeDrafts.UsuarioUsuario(
	idUsuarioUsuario INT PRIMARY KEY IDENTITY(1,1),
	idUsuario1 INT NOT NULL,
	CONSTRAINT fk_AmigoUsuario1 FOREIGN KEY(idUsuario1)
	REFERENCES CodeDrafts.Usuario(idUsuario),
	idUsuario2 INT NOT NULL,
	CONSTRAINT fk_AmigoUsuario2 FOREIGN KEY(idUsuario2)
	REFERENCES CodeDrafts.Usuario(idUsuario),
	denunciado BIT NOT NULL -- DEFAULT 0
)

CREATE TABLE CodeDrafts.Moderador(
	idModerador INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(80) NOT NULL UNIQUE,
	senha VARCHAR(20) NOT NULL
)	

CREATE TABLE CodeDrafts.Post(
	idPost INT PRIMARY KEY IDENTITY(1,1),
	titulo nVARCHAR(100) NOT NULL,
	conteudo nVARCHAR(4000) NOT NULL,
	pontosPost INT NOT NULL, -- DEFAULT 0
	dataCriacaoPost DATE NOT NULL, -- DEFAULT GETDATE()
	capa VARCHAR(200) NULL,
	aprovado BIT NOT NULL, -- DEFAULT 1,
	quantidadeDenuncias INT NOT NULL DEFAULT 0,
	idUsuario INT NOT NULL,
	CONSTRAINT fk_PostUsuario FOREIGN KEY(idUsuario)
	REFERENCES CodeDrafts.Usuario(idUsuario)
)	



CREATE TABLE CodeDrafts.UsuarioPost(
	idUsuarioPost INT PRIMARY KEY IDENTITY(1,1),
	idUsuario INT NOT NULL,
	CONSTRAINT fk_UsuarioUsuarioPost FOREIGN KEY(idUsuario)
	REFERENCES CodeDrafts.Usuario(idUsuario),
	idPost INT NOT NULL,
	CONSTRAINT fk_PostUsuarioPost FOREIGN KEY(idPost)
	REFERENCES CodeDrafts.Post(idPost),
	denunciado BIT NOT NULL,
	curtido BIT
)	

CREATE TABLE CodeDrafts.Comentario(
	idComentario INT PRIMARY KEY IDENTITY(1,1),
	dataCriacaoComentario DATE NOT NULL, -- DEFAULT GETDATE()
	texto nvarchar(500) NOT NULL,
	pontosComentario INT NOT NULL, -- DEFAULT 0
	quantidadeDenuncias INT NOT NULL, -- DEFAULT 0
	idUsuario INT NOT NULL,
	CONSTRAINT fk_ComentarioUsuario FOREIGN KEY(idUsuario)
	REFERENCES CodeDrafts.Usuario(idUsuario),
	idPost INT NOT NULL,
	CONSTRAINT fk_ComentarioPost FOREIGN KEY(idPost)
	REFERENCES CodeDrafts.Post(idPost)
)	

CREATE TABLE CodeDrafts.UsuarioComentario(
	idUsuarioComentario INT PRIMARY KEY IDENTITY(1,1),
	idUsuario INT NOT NULL,
	CONSTRAINT fk_UsuarioUsuarioComentario FOREIGN KEY(idUsuario)
	REFERENCES CodeDrafts.Usuario(idUsuario),
	idComentario INT NOT NULL,
	CONSTRAINT fk_ComentarioUsuarioComentario FOREIGN KEY(idComentario)
	REFERENCES CodeDrafts.Comentario(idComentario),
	denunciado BIT NOT NULL,
	curtido BIT
)	



CREATE TABLE CodeDrafts.Topico(
	idTopico INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50) NOT NULL UNIQUE
)	

CREATE TABLE CodeDrafts.Conquista(
	idConquista INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50) NOT NULL UNIQUE,
	nivel INT NOT NULL, -- DEFAULT 1
	imagem VARCHAR(200) NOT NULL -- DEFAULT '<prizeIcon.png>'
)	
	
CREATE TABLE CodeDrafts.UsuarioConquista(
	idUsuarioConquista INT PRIMARY KEY IDENTITY(1,1),
	idUsuario INT NOT NULL,
	CONSTRAINT fk_UsuarioConquista FOREIGN KEY(idUsuario)
	REFERENCES CodeDrafts.Usuario(idUsuario),
	idConquista INT NOT NULL
	CONSTRAINT fk_ConquistaUsuario FOREIGN KEY(idConquista)
	REFERENCES CodeDrafts.Conquista(idConquista)
)

CREATE TABLE CodeDrafts.PostTopico(
	idPostTopico INT PRIMARY KEY IDENTITY(1,1),
	idPost INT NOT NULL,
	CONSTRAINT fk_PostTopico FOREIGN KEY(idPost)
	REFERENCES CodeDrafts.Post(idPost),
	idTopico INT NOT NULL
	CONSTRAINT fk_TopicoPost FOREIGN KEY(idTopico)
	REFERENCES CodeDrafts.Topico(idTopico)
)

-- CASCATA DE DROP TABLE
DROP TABLE CodeDrafts.Moderador
DROP TABLE CodeDrafts.UsuarioUsuario
DROP TABLE CodeDrafts.UsuarioPost
DROP TABLE CodeDrafts.UsuarioComentario
DROP TABLE CodeDrafts.PostTopico
DROP TABLE CodeDrafts.Topico
DROP TABLE CodeDrafts.Comentario
DROP TABLE CodeDrafts.UsuarioConquista
DROP TABLE CodeDrafts.Conquista
DROP TABLE CodeDrafts.Post
DROP TABLE CodeDrafts.Usuario

