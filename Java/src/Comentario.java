import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Comentario {
    private static int posicao = 0; // posição atual da lista de comentários
    private int idComentario;
    private String texto;
    private int pontosComentario;
    private int quantidadeDenuncias;
    private int idUsuario;
    private String username;
    private int idPost;

    public Comentario(int idComentario, String texto, int pontosComentario, int quantidadeDenuncias, int idUsuario, int idPost, String username) {
        this.idComentario = idComentario;
        this.texto = texto;
        this.pontosComentario = pontosComentario;
        this.quantidadeDenuncias = quantidadeDenuncias;
        this.idUsuario = idUsuario;
        this.username = username;
        this.idPost = idPost;
    }

    public static int getPosicao() {
        return posicao;
    }

    public static void setPosicao(int novaPosicao) {
        posicao = novaPosicao;
    }

    public int getId() {
        return this.idComentario;
    }

    public String getTexto() {
        return this.texto;
    }

    public int getPontosComentario() {
        return this.pontosComentario;
    }

    public int getQuantidadeDenuncias() {
        return this.quantidadeDenuncias;
    }

    public int getIdUsuario() {
        return this.idUsuario;
    }

    public String getUsername() {
        return this.username;
    }

    public int getIdPost() {
        return this.idPost;
    }

    public static List<Comentario> criarListaComentarios(ResultSet resultSet) throws SQLException {
        List<Comentario> listaComentarios = new ArrayList<>();

        while (resultSet.next()) {
            Comentario comentario = new Comentario(
                    resultSet.getInt("idComentario"),
                    resultSet.getString("texto"),
                    resultSet.getInt("pontosComentario"),
                    resultSet.getInt("quantidadeDenuncias"),
                    resultSet.getInt("idUsuario"),
                    resultSet.getInt("idPost"),
                    resultSet.getString("username")
            );

            listaComentarios.add(comentario);
        }

        return listaComentarios;
    }
}
