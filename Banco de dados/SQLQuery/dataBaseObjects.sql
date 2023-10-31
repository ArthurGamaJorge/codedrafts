-- VIEWS


CREATE OR ALTER VIEW CodeDrafts.V_PreviewPost AS
SELECT P.idPost, P.titulo, LEFT(P.conteudo, 200) conteudo, P.pontosPost, P.dataCriacaoPost, P.capa, U.idUsuario, U.nome as 'usuário', U.username,
stuff((select ' ' + T.nome from CodeDrafts.Topico T, CodeDrafts.PostTopico PT 
where PT.idTopico = T.idTopico and PT.idPost = P.idPost for Xml path('')),1,1, '') as 'tópicos'

FROM CodeDrafts.Post P JOIN CodeDrafts.Usuario U ON P.idUsuario = U.idUsuario 
where P.aprovado = 1 AND U.ativo = 1 

select * from CodeDrafts.V_PreviewPost order by pontosPost DESC

CREATE OR ALTER VIEW CodeDrafts.V_ConquistasUser AS
select C.nome, C.nivel, C.imagem, U.idUsuario 
from CodeDrafts.UsuarioConquista UC,
CodeDrafts.Conquista C,
CodeDrafts.Usuario U
where UC.idConquista = C.idConquista and UC.idUsuario = U.idUsuario

select C.nome, C.nivel, C.imagem from CodeDrafts.V_ConquistasUser C, CodeDrafts.Usuario where idUsuario = 1 order by nivel DESC

CREATE OR ALTER VIEW CodeDrafts.V_Ranking AS
SELECT TOP 10 U.nome, U.pontosTotais, U.fotoPerfil, U.username FROM CodeDrafts.Usuario U where U.ativo = 1 ORDER BY U.pontosTotais DESC, U.nome

-- ÍNDICES


CREATE INDEX ixPost
ON CodeDrafts.Post(titulo, capa, dataCriacaoPost) -- conteúdo é grande demais para gerar índice


-- TRIGGERS

CREATE OR ALTER TRIGGER CodeDrafts.trVerificarUserCriado ON CodeDrafts.Usuario
FOR INSERT, UPDATE AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @ultimoId INT, @username VARCHAR(30), @email VARCHAR(80), @senha VARCHAR(20)

	select @ultimoId = idUsuario, @username = username, @email = email, @senha = senha
	from Inserted

	IF (LEN(@senha) < 4) -- Verifica se a senha possui menos de 8 digitos
	BEGIN
		IF EXISTS (SELECT * FROM DELETED) -- Se o que ativou o trigger foi um update
			update CodeDrafts.Usuario set senha = d.senha from deleted d -- Desfaz alteração
		ELSE -- Se o que ativou o trigger foi um insert
			DELETE FROM CodeDrafts.Usuario WHERE idUsuario = @ultimoId -- Apaga registro
		RAISERROR('Senha deve ter 4 ou mais digitos', 15, 1);
	END

END

-- Triggers de log de post

CREATE OR ALTER TRIGGER CodeDrafts.trAlterarLogPost ON CodeDrafts.Post
FOR UPDATE AS
BEGIN
	DECLARE 
		  @idPost INT, @quemModificou INT

	SELECT         
		  @idPost = idPost, @quemModificou = quemModificou FROM inserted
	IF (SELECT aprovado FROM CodeDrafts.Post WHERE idPost = @idPost) = 1 AND @quemModificou is not null
		INSERT INTO CodeDrafts.LogPost VALUES(@quemModificou, @idPost, 'Aprovar')
END


CREATE OR ALTER TRIGGER CodeDrafts.trDeletarLogPost ON CodeDrafts.Post
FOR DELETE AS
BEGIN
	DECLARE 
		  @idPost INT, @quemModificou INT

	SELECT         
		  @idPost = idPost, @quemModificou = quemModificou FROM deleted

	INSERT INTO CodeDrafts.LogPost VALUES(@quemModificou, @idPost, 'Deletar')
END
