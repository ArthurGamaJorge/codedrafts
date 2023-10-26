CREATE OR ALTER PROCEDURE CodeDrafts.spInserirUsuario
	@nome AS nVARCHAR(50),
	@username AS VARCHAR(30),
	@senha AS VARCHAR(20),
	@email AS VARCHAR(80)
AS
BEGIN
	INSERT INTO CodeDrafts.Usuario (nome, username, descricao, fotoPerfil, senha, pontosTotais, ativo, quantidadeDenuncias, dataCriacaoUsuario, email)
	VALUES (@nome, @username, '', 'noUserImage.png', @senha, 0, 1, 0, GETDATE(), @email) 
END



CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarUsuario
	@idUsuario AS INT
AS
BEGIN
	DELETE FROM CodeDrafts.Usuario WHERE idUsuario = @idUsuario
	DELETE FROM CodeDrafts.Post WHERE idUsuario = @idUsuario
	DELETE FROM CodeDrafts.Comentario WHERE idUsuario = @idUsuario
	DELETE FROM CodeDrafts.UsuarioConquista WHERE idUsuario = @idUsuario
	DELETE FROM CodeDrafts.Amigo where idUsuario1 = @idUsuario OR idUsuario2 = @idUsuario
END




CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarUsuario
	@idUsuario AS INT,
	@nome AS nVARCHAR(50),
	@username AS VARCHAR(30),
	@descricao AS VARCHAR(400),
	@fotoPerfil AS VARCHAR(200),
	@senha AS VARCHAR(20),
	@pontosTotais AS INT,
	@ativo AS BIT,
	@quantidadeDenuncias AS INT,
	@email AS VARCHAR(80)
AS
BEGIN
	UPDATE CodeDrafts.Usuario
	SET nome = @nome, username = @username, descricao = @descricao, fotoPerfil = @fotoPerfil, senha = @senha, pontosTotais = @pontosTotais, 
	ativo = @ativo, quantidadeDenuncias = @quantidadeDenuncias, email = @email WHERE idUsuario = @idUsuario
END



CREATE OR ALTER PROCEDURE CodeDrafts.spInserirUsuarioUsuario
	@idUsuario1 AS INT,
	@idUsuario2 AS INT,
	@confirmado AS BIT,
	@denunciado AS BIT
AS
BEGIN
	INSERT INTO CodeDrafts.UsuarioUsuario(idUsuario1, idUsuario2, confirmado, denunciado)
	VALUES (@idUsuario1, @idUsuario2, @confirmado, @denunciado) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarUsuarioUsuario
	@idUsuarioUsuario AS INT
AS
BEGIN
	DELETE FROM CodeDrafts.UsuarioUsuario WHERE idUsuarioUsuario = @idUsuarioUsuario
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarUsuarioUsuario
	@idUsuarioUsuario AS INT,
	@idUsuario1 AS INT,
	@idUsuario2 AS INT,
	@confirmado AS BIT,
	@denunciado AS BIT
AS
BEGIN
	UPDATE CodeDrafts.UsuarioUsuario
	SET idUsuario1 = @idUsuario1, idUsuario2 = @idUsuario2, confirmado = @confirmado, denunciado = @denunciado WHERE idUsuarioUsuario = @idUsuarioUsuario
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirPost
	@titulo AS nVARCHAR(100),
	@conteudo AS nVARCHAR(4000),
	@pontosPost AS INT = 0,
	@dataCriacaoPost AS DATE,
	@capa AS VARCHAR(200),
	@aprovado AS BIT = 0,
	@quantidadeDenuncias AS INT = 0,
	@idUsuario AS INT,
	@quemModificou AS INT -- Pode ser nulo 
AS
BEGIN
	INSERT INTO CodeDrafts.Post (titulo, conteudo, pontosPost, dataCriacaoPost, capa, aprovado, quantidadeDenuncias, idUsuario, quemModificou)
	VALUES (@titulo, @conteudo, @pontosPost, GETDATE(), @capa, @aprovado, @quantidadeDenuncias, @idUsuario, @quemModificou) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarPost
	@idPost AS INT,
	@quemModificou AS INT
AS
BEGIN
	UPDATE CodeDrafts.Post set quemModificou = @quemModificou -- Antes de deletar armazena quem fez isso para o trigger o detectar
	DELETE FROM CodeDrafts.Post WHERE idPost = @idPost
	DELETE FROM CodeDrafts.Comentario where idPost = @idPost
	DELETE FROM CodeDrafts.PostTopico where idPost = @idPost
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarPost
	@idPost AS INT,
	@titulo AS nVARCHAR(100),
	@conteudo AS nVARCHAR(4000),
	@pontosPost AS INT,
	@capa AS VARCHAR(200),
	@aprovado AS BIT,
	@quantidadeDenuncias AS INT,
	@quemModificou AS INT
AS
BEGIN
	UPDATE CodeDrafts.Post
	SET titulo = @titulo, conteudo = @conteudo, pontosPost = @pontosPost, capa = @capa, 
	aprovado = @aprovado, quantidadeDenuncias = @quantidadeDenuncias, quemModificou = @quemModificou WHERE idPost = @idPost
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirUsuarioPost
	@idUsuario AS INT,
	@idPost AS INT,
	@denunciado AS BIT,
	@curtido AS BIT
AS
BEGIN
	INSERT INTO CodeDrafts.UsuarioPost(idUsuario, idPost, denunciado, curtido)
	VALUES (@idUsuario, @idPost, @denunciado, @curtido) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarUsuarioPost
	@idUsuarioPost AS INT
AS
BEGIN
	DELETE FROM CodeDrafts.UsuarioPost WHERE idUsuarioPost = @idUsuarioPost
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarUsuarioPost
	@idUsuarioPost AS INT,
	@denunciado AS BIT,
	@curtido AS BIT
AS
BEGIN
	UPDATE CodeDrafts.UsuarioPost
	SET denunciado = @denunciado, curtido = @curtido WHERE idUsuarioPost = @idUsuarioPost
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirComentario
	@dataCriacaoComentario AS DATE,
	@texto AS nvarchar(500),
	@idUsuario AS INT,
	@idPost AS INT
AS
BEGIN
	INSERT INTO CodeDrafts.Comentario (dataCriacaoComentario, texto, pontosComentario, quantidadeDenuncias, idUsuario, idPost)
	VALUES (GETDATE(), @texto, 0, 0, @idUsuario, @idPost) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarComentario
	@idComentario AS INT
AS
BEGIN
	DELETE FROM CodeDrafts.Comentario WHERE idComentario = @idComentario
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarComentario
	@idComentario as INT,
	@texto AS nvarchar(500),
	@pontosComentario AS INT,
	@quantidadeDenuncias AS INT
AS
BEGIN
	UPDATE CodeDrafts.Comentario
	SET texto = @texto, pontosComentario = @pontosComentario, quantidadeDenuncias = @quantidadeDenuncias WHERE idComentario = @idComentario
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirUsuarioComentario
	@idUsuario AS INT,
	@idComentario AS INT,
	@denunciado AS BIT,
	@curtido AS BIT
AS
BEGIN
	INSERT INTO CodeDrafts.UsuarioComentario(idUsuario, idComentario, denunciado, curtido)
	VALUES (@idUsuario, @idComentario, @denunciado, @curtido) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarUsuarioComentario
	@idUsuarioComentario AS INT
AS
BEGIN
	DELETE FROM CodeDrafts.UsuarioComentario WHERE idUsuarioComentario = @idUsuarioComentario
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarUsuarioComentario
	@idUsuarioComentario AS INT,
	@denunciado AS BIT,
	@curtido AS BIT
AS
BEGIN
	UPDATE CodeDrafts.UsuarioComentario
	SET denunciado = @denunciado, curtido = @curtido WHERE idUsuarioComentario = @idUsuarioComentario
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirTopico
	@nome AS VARCHAR(50)
AS
BEGIN
	INSERT INTO CodeDrafts.Topico (nome)
	VALUES (@nome) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarTopico
	@idTopico AS INT
AS
BEGIN
	DELETE FROM CodeDrafts.Topico WHERE idTopico = @idTopico
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarTopico
	@idTopico AS INT,
	@nome AS VARCHAR(50)
AS
BEGIN
	UPDATE CodeDrafts.Topico
	SET nome = @nome WHERE idTopico = @idTopico
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirConquista
	@nome AS VARCHAR(50),
	@nivel AS INT,
	@imagem AS VARCHAR(200)
AS
BEGIN
	IF @imagem IS NULL OR @imagem = ''
		set @imagem = 'prizeIcon.png'
	IF @nivel IS NULL OR @nivel = ''
		set @nivel = 1
	INSERT INTO CodeDrafts.Conquista (nome, nivel, numeroDeUsuarios, imagem)
	VALUES (@nome, @nivel, 0, @imagem) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarConquista
	@idConquista AS INT
AS
BEGIN
	DELETE FROM CodeDrafts.Conquista WHERE idConquista = @idConquista
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarConquista
	@idConquista AS INT,
	@nome AS VARCHAR(50),
	@nivel AS INT,
	@numeroDeUsuarios AS INT,
	@imagem AS VARCHAR(200)
AS
BEGIN
	UPDATE CodeDrafts.Conquista
	SET nome = @nome, nivel = @nivel, numeroDeUsuarios = @numeroDeUsuarios, imagem = @imagem WHERE idConquista = @idConquista
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirUsuarioConquista
	@idUsuario AS INT,
	@idConquista AS INT
AS
BEGIN
	INSERT INTO CodeDrafts.UsuarioConquista (idUsuario, idConquista)
	VALUES (@idUsuario, @idConquista) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarUsuarioConquista
	@idUsuarioConquista AS INT
AS
BEGIN
	DELETE FROM CodeDrafts.UsuarioConquista WHERE idUsuarioConquista = @idUsuarioConquista
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarUsuarioConquista
	@idUsuarioConquista AS INT,
	@idUsuario AS INT,
	@idConquista AS INT
AS
BEGIN
	UPDATE CodeDrafts.UsuarioConquista
	SET idUsuario = @idUsuario, idConquista = @idConquista WHERE idUsuarioConquista = @idUsuarioConquista
END