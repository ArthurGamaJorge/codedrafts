CREATE OR ALTER PROCEDURE CodeDrafts.spInserirUsuario
	@nome AS nVARCHAR(50),
	@username AS VARCHAR(30),
	@descricao AS VARCHAR(400),
	@fotoPerfil AS VARCHAR(200),
	@senha AS VARCHAR(20),
	@pontosTotais AS INT = 0,
	@ativo AS BIT = 1,
	@quantidadeDenuncias AS INT = 0,
	@dataCriacaoUsuario AS DATE,
	@email AS VARCHAR(80)
AS
BEGIN
	INSERT INTO Usuario (nome, username, descricao, fotoPerfil, senha, pontosTotais, ativo, quantidadeDenuncias, dataCriacaoUsuario, email)
	VALUES (@nome, @username, @descricao, @fotoPerfil, @senha, @pontosTotais, @ativo, @quantidadeDenuncias, GETDATE(), @email) 
END



CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarUsuario
	@idUsuario AS INT
AS
BEGIN
	DELETE FROM Usuario WHERE idUsuario = @idUsuario
	DELETE FROM Post WHERE idUsuario = @idUsuario
	DELETE FROM Comentario WHERE idUsuario = @idUsuario
	DELETE FROM UsuarioConquista WHERE idUsuario = @idUsuario
	DELETE FROM Amigo where idUsuario1 = @idUsuario OR idUsuario2 = @idUsuario
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
	UPDATE Usuario
	SET nome = @nome, username = @username, descricao = @descricao, fotoPerfil = @fotoPerfil, senha = @senha, pontosTotais = @pontosTotais, 
	ativo = @ativo, quantidadeDenuncias = @quantidadeDenuncias, email = @email WHERE idUsuario = @idUsuario
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirAmigo
	@idUsuario1 AS INT,
	@idUsuario2 AS INT,
	@confirmado AS BIT = 0
AS
BEGIN
	INSERT INTO Amigo (idUsuario1, idUsuario2, confirmado)
	VALUES (@idUsuario1, @idUsuario2, @confirmado) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarAmigo
	@idAmigo AS INT
AS
BEGIN
	DELETE FROM Amigo WHERE idAmigo = @idAmigo
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarAmigo
	@idAmigo AS INT,
	@idUsuario1 AS INT,
	@idUsuario2 AS INT,
	@confirmado AS BIT
AS
BEGIN
	UPDATE Amigo
	SET idUsuario1 = @idUsuario1, idUsuario2 = @idUsuario2, confirmado = @confirmado WHERE idAmigo = @idAmigo
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirPost
	@titulo AS nVARCHAR(100),
	@conteudo AS nVARCHAR(4000),
	@pontosPost AS INT = 0,
	@dataCriacaoPost AS DATE,
	@capa AS VARCHAR(200),
	@aprovado AS BIT = 0,
	@quantidadeDenuncias AS INT = 0
AS
BEGIN
	INSERT INTO Post (titulo, conteudo, pontosPost, dataCriacaoPost, capa, aprovado, quantidadeDenuncias)
	VALUES (@titulo, @conteudo, @pontosPost, GETDATE(), @capa, @aprovado, @quantidadeDenuncias) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarPost
	@idPost AS INT
AS
BEGIN
	DELETE FROM Post WHERE idPost = @idPost
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarPost
	@idPost AS INT,
	@titulo AS nVARCHAR(100),
	@conteudo AS nVARCHAR(4000),
	@pontosPost AS INT,
	@capa AS VARCHAR(200),
	@aprovado AS BIT,
	@quantidadeDenuncias AS INT
AS
BEGIN
	UPDATE Post
	SET titulo = @titulo, conteudo = @conteudo, pontosPost = @pontosPost, capa = @capa, 
	aprovado = @aprovado, quantidadeDenuncias = @quantidadeDenuncias WHERE idPost = @idPost
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirComentario
	@dataCriacaoComentario AS DATE,
	@texto AS nvarchar(500),
	@pontosComentario AS INT = 0, 
	@quantidadeDenuncias AS INT = 0,
	@idUsuario AS INT,
	@idPost AS INT
AS
BEGIN
	INSERT INTO Comentario (dataCriacaoComentario, texto, pontosComentario, quantidadeDenuncias, idUsuario, idPost)
	VALUES (GETDATE(), @texto, @pontosComentario, @quantidadeDenuncias @idUsuario, @idPost) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarComentario
	@idComentario AS INT
AS
BEGIN
	DELETE FROM Comentario WHERE idComentario = @idComentario
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarComentario
	@idComentario as INT,
	@texto AS nvarchar(500),
	@pontosComentario AS INT
	@quantidadeDenuncias AS INT,
AS
BEGIN
	UPDATE Comentario
	SET texto = @texto, pontosComentario = @pontosComentario, quantidadeDenuncias = @quantidadeDenuncias WHERE idComentario = @idComentario
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirTopico
	@nome AS VARCHAR(50)
AS
BEGIN
	INSERT INTO Topico (nome)
	VALUES (@nome) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarTopico
	@idTopico AS INT
AS
BEGIN
	DELETE FROM Topico WHERE idTopico = @idTopico
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarTopico
	@idTopico AS INT,
	@nome AS VARCHAR(50)
AS
BEGIN
	UPDATE Topico
	SET nome = @nome WHERE idTopico = @idTopico
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirConquista
	@nome AS VARCHAR(50),
	@nivel AS INT,
	@numeroDeUsuarios AS INT = 0,
	@imagem AS VARCHAR(200)
AS
BEGIN
	IF @imagem IS NULL OR @imagem = ''
		set @imagem = '<ImagemPadrao>'
	IF @nivel IS NULL OR @nivel = ''
		set @nivel = 1
	INSERT INTO Conquista (nome, nivel, numeroDeUsuarios, imagem)
	VALUES (@nome, @nivel, @numeroDeUsuarios, @imagem) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarConquista
	@idConquista AS INT
AS
BEGIN
	DELETE FROM Conquista WHERE idConquista = @idConquista
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarConquista
	@idConquista AS INT,
	@nome AS VARCHAR(50),
	@nivel AS INT,
	@numeroDeUsuarios AS INT,
	@imagem AS VARCHAR(200)
AS
BEGIN
	UPDATE Conquista
	SET nome = @nome, nivel = @nivel, numeroDeUsuarios = @numeroDeUsuarios, imagem = @imagem WHERE idConquista = @idConquista
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirUsuarioConquista
	@idUsuario AS INT,
	@idConquista AS INT
AS
BEGIN
	INSERT INTO UsuarioConquista (idUsuario, idConquista)
	VALUES (@idUsuario, @idConquista) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarUsuarioConquista
	@idUsuarioConquista AS INT
AS
BEGIN
	DELETE FROM UsuarioConquista WHERE idUsuarioConquista = @idUsuarioConquista
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarUsuarioConquista
	@idUsuarioConquista AS INT,
	@idUsuario AS INT,
	@idConquista AS INT
AS
BEGIN
	UPDATE UsuarioConquista
	SET idUsuario = @idUsuario, idConquista = @idConquista WHERE idUsuarioConquista = @idUsuarioConquista
END