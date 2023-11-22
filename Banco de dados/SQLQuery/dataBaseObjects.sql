-- VIEWS


CREATE OR ALTER VIEW CodeDrafts.V_PreviewPost AS
SELECT P.idPost, P.titulo, LEFT(P.conteudo, 300) + '...' AS conteudo, P.pontosPost, P.dataCriacaoPost, P.capa, U.idUsuario, U.nome, U.username,
stuff((select ' ' + T.nome from CodeDrafts.Topico T, CodeDrafts.PostTopico PT 
where PT.idTopico = T.idTopico and PT.idPost = P.idPost for Xml path('')),1,1, '') as 'tópicos'
FROM CodeDrafts.Post P JOIN CodeDrafts.Usuario U ON P.idUsuario = U.idUsuario 
where P.aprovado = 1 AND U.ativo = 1 

CREATE OR ALTER VIEW CodeDrafts.V_PreviewComentario AS
SELECT idComentario, U.nome, U.username, U.fotoPerfil, C.texto, C.pontosComentario, C.idPost, P.titulo
FROM CodeDrafts.Usuario U, CodeDrafts.Comentario C, CodeDrafts.Post P WHERE C.idUsuario = U.idUsuario AND U.ativo = 1 AND C.idPost = P.idPost

CREATE OR ALTER VIEW CodeDrafts.V_ConquistasUser AS
select C.nome, C.nivel, C.imagem, U.idUsuario 
from CodeDrafts.UsuarioConquista UC,
CodeDrafts.Conquista C,
CodeDrafts.Usuario U
where UC.idConquista = C.idConquista and UC.idUsuario = U.idUsuario

select C.nome, C.nivel, C.imagem from CodeDrafts.V_ConquistasUser C, CodeDrafts.Usuario where idUsuario = 1 order by nivel DESC

CREATE OR ALTER VIEW CodeDrafts.V_Ranking AS
SELECT TOP 10 U.idUsuario, U.nome, U.fotoPerfil, U.username, U.pontosTotais
FROM CodeDrafts.Usuario U where U.ativo = 1 ORDER BY pontosTotais DESC, U.nome

CREATE OR ALTER VIEW CodeDrafts.V_UsuariosAno AS
SELECT COUNT(*) as 'usuariosAno' FROM CodeDrafts.Usuario where YEAR(dataCriacaoUsuario) = Year(GETDATE())

CREATE OR ALTER VIEW CodeDrafts.V_UsuariosMes AS
SELECT COUNT(*) as 'usuariosMes' FROM CodeDrafts.Usuario where Month(dataCriacaoUsuario) = Month(GETDATE())

CREATE OR ALTER VIEW CodeDrafts.V_UsuariosAtivos AS
SELECT COUNT(U.idUsuario) as 'usuariosAtivos' FROM CodeDrafts.Usuario U
WHERE EXISTS (SELECT 1 FROM CodeDrafts.Post P WHERE P.idUsuario = U.idUsuario AND DATEDIFF(day, P.dataCriacaoPost, GETDATE()) < 30) OR
EXISTS (SELECT 1  FROM CodeDrafts.Comentario C  WHERE C.idUsuario = U.idUsuario AND DATEDIFF(day, C.dataCriacaoComentario, GETDATE()) < 30)

-- ÍNDICES

CREATE INDEX ixPost
ON CodeDrafts.Post(titulo, capa, dataCriacaoPost) -- conteúdo é grande demais para gerar índice


-- TRIGGERS

CREATE OR ALTER TRIGGER CodeDrafts.trPontosConquistas ON CodeDrafts.Usuario
FOR UPDATE AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @ultimoId INT, @pontos INT

	select @ultimoId = idUsuario, @pontos = pontosTotais from Inserted

	if @pontos >= 10
		BEGIN
			if not exists(select * from CodeDrafts.UsuarioConquista where idUsuario = @ultimoId and idConquista = 2)
				exec CodeDrafts.spInserirUsuarioConquista @ultimoId, 2
		END
	if @pontos >= 50
		BEGIN
			if not exists(select * from CodeDrafts.UsuarioConquista where idUsuario = @ultimoId and idConquista = 3)
				exec CodeDrafts.spInserirUsuarioConquista @ultimoId, 3
		END
	if @pontos >= 100
		BEGIN
			if not exists(select * from CodeDrafts.UsuarioConquista where idUsuario = @ultimoId and idConquista = 5)
				exec CodeDrafts.spInserirUsuarioConquista @ultimoId, 5
		END
END

CREATE OR ALTER TRIGGER CodeDrafts.trUsuáriosConquista ON CodeDrafts.Usuario
FOR INSERT AS
BEGIN
	DECLARE @ultimoId INT
	select @ultimoId = idUsuario from Inserted

	if (select count(*) from CodeDrafts.Usuario) < 100
		exec CodeDrafts.spInserirUsuarioConquista @ultimoId, 6
END


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
