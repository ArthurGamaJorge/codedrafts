-- VIEWS


CREATE OR ALTER VIEW CodeDrafts.V_PreviewPost AS
SELECT P.titulo, LEFT(P.conteudo, 200) conteudo, P.pontosPost, P.dataCriacaoPost, P.capa, P.quantidadeDenuncias, U.nome 
FROM CodeDrafts.Post P JOIN CodeDrafts.Usuario U ON P.idUsuario = U.idUsuario
where P.aprovado = 1 AND U.ativo = 1

CREATE OR ALTER VIEW CodeDrafts.V_Ranking AS
SELECT TOP 10 U.nome, U.pontosTotais, U.fotoPerfil FROM CodeDrafts.Usuario U where U.ativo = 1 ORDER BY(U.pontosTotais) 

-- ÍNDICES


CREATE INDEX ixPost
ON CodeDrafts.Post(titulo, capa, dataCriacaoPost) -- conteúdo é grande demais para gerar índice


-- TRIGGERS

CREATE OR ALTER TRIGGER CodeDrafts.trVerificarUserCriado ON CodeDrafts.Usuario
FOR INSERT, UPDATE AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @ultimoId INT = @@IDENTITY, -- obtém id do usuário que foi recém inserido
	@username VARCHAR(30), @email VARCHAR(80), @senha VARCHAR(20)

	select @username = username, @email = email, @senha = senha
	from Inserted

	IF (LEN(@senha) < 8)
	BEGIN
		DELETE FROM CodeDrafts.Usuario WHERE idUsuario = @ultimoId 
		RAISERROR('Senha deve ter 8 ou mais digitos', 15, 1);
	END

END

