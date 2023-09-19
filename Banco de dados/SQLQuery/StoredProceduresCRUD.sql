CREATE OR ALTER PROCEDURE CodeDrafts.spInserirPost
	@titulo AS nVARCHAR(100),
	@conteudo AS nVARCHAR(4000),
	@pontosPost AS INT = 0,
	@dataCriacaoPost AS DATE,
	@capa AS VARCHAR(200),
	@aprovado AS BIT = 0,
	@idUsuario AS INT
AS
BEGIN
	INSERT INTO Post (titulo, conteudo, pontosPost, dataCriacaoPost, capa, aprovado, idUsuario)
	VALUES (@titulo, @conteudo, @pontosPost, GetDate(), @capa, @aprovado, @idUsuario) 
END

CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarPost
as
end

CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarPost
as
end

CREATE OR ALTER PROCEDURE CodeDrafts.spInserirUsuario
as
end

CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarUsuario
as
end

CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarUsuario
as
end

CREATE OR ALTER PROCEDURE CodeDrafts.spInserirComentario
as
end

CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarComentario
as
end

CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarComentario
as
end

CREATE OR ALTER PROCEDURE CodeDrafts.spInserirComentario
as
end

CREATE OR ALTER PROCEDURE CodeDrafts.spDeletarPost
as
end

CREATE OR ALTER PROCEDURE CodeDrafts.spAtualizarPost
as
end
