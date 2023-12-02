CREATE OR ALTER PROCEDURE CodeDrafts.spInserirUsuario
	@nome AS nVARCHAR(50),
	@username AS VARCHAR(30),
	@senha AS VARCHAR(20),
	@email AS VARCHAR(80)
AS
BEGIN
	declare cUsuarios Cursor for
	Select username, email, idUsuario from CodeDrafts.Usuario

	DECLARE 
	@usernameC AS VARCHAR(30),
	@emailC AS VARCHAR(80),
	@idUsuarioC AS INT,
	@idUsuario int = @@Identity

	OPEN cUsuarios 
	FETCH cUsuarios INTO @usernameC, @emailC, @idUsuarioC -- Primeiro registro é lido
	WHILE @@fetch_status = 0
		BEGIN
			if (@username = @usernameC or @email = @emailC) and @idUsuario != @idUsuarioC
				BEGIN
					Raiserror('Restrição UNIQUE em username e e-mail', 16, 1)
					CLOSE cUsuarios
					DEALLOCATE cUsuarios
					RETURN
				END
			FETCH cUsuarios INTO @usernameC, @emailC, @idUsuarioC
		END

	INSERT INTO CodeDrafts.Usuario (nome, username, descricao, fotoPerfil, senha, pontosTotais, ativo, quantidadeDenuncias, dataCriacaoUsuario, email)
	VALUES (@nome, @username, '', 'https://i.imgur.com/7wQ6mn4.png', @senha, 0, 1, 0, GETDATE(), @email) 

	CLOSE cUsuarios
	DEALLOCATE cUsuarios
END

CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarUsuario
    @idUsuario AS INT
AS
BEGIN
	DELETE FROM CodeDrafts.UsuarioComentario WHERE idComentario IN (SELECT idComentario FROM CodeDrafts.Comentario where idUsuario = @idUsuario 
		or idPost in (select idPost from CodeDrafts.Post where idUsuario = @idUsuario)) or idUsuario = @idUsuario

	DELETE FROM CodeDrafts.UsuarioUsuario WHERE idUsuario1 = @idUsuario OR idUsuario2 = @idUsuario
	DELETE FROM CodeDrafts.UsuarioPost WHERE idPost IN (SELECT idPost FROM CodeDrafts.Post where idUsuario = @idUsuario) OR idUsuario = @idUsuario 
	DELETE FROM CodeDrafts.UsuarioConquista WHERE idUsuario = @idUsuario


    DECLARE 
        @idUsuarioC AS INT,
        @pontosComentarioC AS INT,
        @idPost AS INT

    DECLARE cPosts CURSOR LOCAL FOR
        SELECT idPost FROM CodeDrafts.Post WHERE idUsuario = @idUsuario 

    OPEN cPosts
    FETCH cPosts INTO @idPost -- Primeiro registro é lido

    WHILE @@FETCH_STATUS = 0
    BEGIN
        DECLARE cComentariosPost CURSOR LOCAL FOR
            SELECT idUsuario, pontosComentario FROM CodeDrafts.Comentario WHERE idPost = @idPost

        OPEN cComentariosPost
        FETCH cComentariosPost INTO @idUsuarioC, @pontosComentarioC -- Primeiro registro é lido

        WHILE @@FETCH_STATUS = 0
        BEGIN
            UPDATE CodeDrafts.Usuario SET pontosTotais -= @pontosComentarioC WHERE idUsuario = @idUsuarioC
            FETCH cComentariosPost INTO @idUsuarioC, @pontosComentarioC
        END

        CLOSE cComentariosPost
        DEALLOCATE cComentariosPost

        FETCH cPosts INTO @idPost
    END

    CLOSE cPosts
    DEALLOCATE cPosts

	DELETE FROM CodeDrafts.Comentario WHERE idPost IN (SELECT idPost FROM CodeDrafts.Post WHERE idUsuario = @idUsuario) OR idUsuario = @idUsuario
	DELETE FROM CodeDrafts.PostTopico WHERE idPost IN (SELECT idPost FROM CodeDrafts.Post WHERE idUsuario = @idUsuario)
	DELETE FROM CodeDrafts.Post WHERE idUsuario = @idUsuario
	DELETE FROM CodeDrafts.Usuario WHERE idUsuario = @idUsuario

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

	declare cUsuarios Cursor Local for
	Select username, email, idUsuario from CodeDrafts.Usuario

	DECLARE 
	@usernameC AS VARCHAR(30),
	@emailC AS VARCHAR(80),
	@idUsuarioC AS INT

	OPEN cUsuarios 
	FETCH cUsuarios INTO @usernameC, @emailC, @idUsuarioC -- Primeiro registro é lido
	WHILE @@fetch_status = 0
		BEGIN
			if (@username = @usernameC or @email = @emailC) and @idUsuario != @idUsuarioC
				BEGIN
					Raiserror('Restrição UNIQUE em username e e-mail', 16, 1)
					CLOSE cUsuarios
					DEALLOCATE cUsuarios
					RETURN
				END
			FETCH cUsuarios INTO @usernameC, @emailC, @idUsuarioC
		END

	UPDATE CodeDrafts.Usuario
	SET nome = @nome, username = @username, descricao = @descricao, fotoPerfil = @fotoPerfil, senha = @senha, pontosTotais = @pontosTotais, 
	ativo = @ativo, quantidadeDenuncias = @quantidadeDenuncias, email = @email WHERE idUsuario = @idUsuario

	CLOSE cUsuarios
	DEALLOCATE cUsuarios
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




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirPost
	@titulo AS nVARCHAR(100),
	@conteudo AS nVARCHAR(4000),
	@pontosPost AS INT = 0,
	@capa AS VARCHAR(200),
	@aprovado AS BIT = 0,
	@quantidadeDenuncias AS INT = 0,
	@idUsuario AS INT
AS
BEGIN
	INSERT INTO CodeDrafts.Post (titulo, conteudo, pontosPost, dataCriacaoPost, capa, aprovado, quantidadeDenuncias, idUsuario)
	VALUES (@titulo, @conteudo, @pontosPost, GETDATE(), @capa, @aprovado, @quantidadeDenuncias, @idUsuario) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarPost
	@idPost AS INT
AS
BEGIN
	DELETE FROM CodeDrafts.UsuarioPost where idPost = @idPost
	DELETE UC FROM CodeDrafts.UsuarioComentario UC WHERE UC.idComentario IN(select C.idComentario FROM CodeDrafts.Comentario C WHERE idPost = @idPost)
	UPDATE CodeDrafts.Usuario set pontosTotais -= (select pontosPost from CodeDrafts.Post where idPost = @idPost) where idUsuario = (select idUsuario from CodeDrafts.Post where idPost = @idPost)

	declare cComentarios Cursor for
	Select idUsuario, pontosComentario from CodeDrafts.Comentario where idPost = @idPost

	DECLARE 
	@idUsuario AS INT,
	@pontosComentario AS INT

	OPEN cComentarios 
	FETCH cComentarios INTO @idUsuario, @pontosComentario -- Primeiro registro é lido
	WHILE @@fetch_status = 0
		BEGIN
			UPDATE CodeDrafts.Usuario set pontosTotais -= @pontosComentario where idUsuario = @idUsuario
			FETCH cComentarios INTO @idUsuario, @pontosComentario
		END

	CLOSE cComentarios
	DEALLOCATE cComentarios

	DELETE FROM CodeDrafts.Comentario where idPost = @idPost
	DELETE FROM CodeDrafts.PostTopico where idPost = @idPost
	DELETE FROM CodeDrafts.Post WHERE idPost = @idPost
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirUsuarioPost
	@idUsuario AS INT,
	@idPost AS INT,
	@denunciado AS BIT,
	@curtido AS BIT
AS
BEGIN
	IF @denunciado = 1
		UPDATE CodeDrafts.Post set quantidadeDenuncias += 1 where idPost = @idPost
	IF @curtido = 1
		UPDATE CodeDrafts.Post set pontosPost += 1 where idPost = @idPost
	IF @curtido = 0
		UPDATE CodeDrafts.Post set pontosPost -= 1 where idPost = @idPost

	INSERT INTO CodeDrafts.UsuarioPost(idUsuario, idPost, denunciado, curtido)
	VALUES (@idUsuario, @idPost, @denunciado, @curtido) 
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
	DELETE FROM CodeDrafts.UsuarioComentario where idComentario = @idComentario

	UPDATE CodeDrafts.Usuario set pontosTotais -= (select pontosComentario from CodeDrafts.Comentario where idComentario = @idComentario) where idUsuario = (select idUsuario from CodeDrafts.Comentario where idComentario = @idComentario)
	DELETE FROM CodeDrafts.Comentario WHERE idComentario = @idComentario
END




CREATE OR ALTER PROCEDURE CodeDrafts.spInserirUsuarioComentario
	@idUsuario AS INT,
	@idComentario AS INT,
	@denunciado AS BIT,
	@curtido AS BIT
AS
BEGIN
	IF @denunciado = 1
		UPDATE CodeDrafts.Comentario set quantidadeDenuncias += 1 where idComentario = @idComentario
	IF @curtido = 1
		UPDATE CodeDrafts.Comentario set pontosComentario += 1 where idComentario = @idComentario
	IF @curtido = 0
		UPDATE CodeDrafts.Comentario set pontosComentario -= 1 where idComentario = @idComentario

	INSERT INTO CodeDrafts.UsuarioComentario(idUsuario, idComentario, denunciado, curtido)
	VALUES (@idUsuario, @idComentario, @denunciado, @curtido) 
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
	DELETE FROM CodeDrafts.PostTopico WHERE idTopico = @idTopico
	DELETE FROM CodeDrafts.Topico WHERE idTopico = @idTopico
END

select * from CodeDrafts.Topico

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
		set @imagem = 'images/prizeIcon.png'
	IF @nivel IS NULL OR @nivel = ''
		set @nivel = 1
	INSERT INTO CodeDrafts.Conquista (nome, nivel, imagem)
	VALUES (@nome, @nivel, @imagem) 
END


CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarConquista
	@idConquista AS INT
AS
BEGIN
	DELETE FROM CodeDrafts.UsuarioConquista WHERE idConquista = @idConquista
	DELETE FROM CodeDrafts.Conquista WHERE idConquista = @idConquista
END


CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarConquista
	@idConquista AS INT,
	@nome AS VARCHAR(50),
	@nivel AS INT,
	@imagem AS VARCHAR(200)
AS
BEGIN
	UPDATE CodeDrafts.Conquista
	SET nome = @nome, nivel = @nivel, imagem = @imagem WHERE idConquista = @idConquista
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


