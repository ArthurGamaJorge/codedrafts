import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Usuario implements Comparable<String> {
    private static int posicao = 0; // posição atual da lista de usuários
    private String nome;
    private String username;
    private String fotoPerfil;
    private String dataCriacao;
    private String email;
    private String bio;
    private int pontosTotais;
    private int quantidadeDenuncias;
    private int postsMaisDenuncias;
    private boolean ativo;


    public Usuario(String nome, String username, String fotoPerfil, String dataCriacao, String email, String bio, int pontosTotais, int quantidadeDenuncias, int postsMaisDenuncias, boolean ativo) {
        this.nome = nome;
        this.username = username;
        this.fotoPerfil = fotoPerfil;
        this.dataCriacao = dataCriacao;
        this.email = email;
        this.bio = bio;
        this.pontosTotais = pontosTotais;
        this.quantidadeDenuncias = quantidadeDenuncias;
        this.postsMaisDenuncias = postsMaisDenuncias;
        this.ativo = ativo;
    }

    public static int getPosicao() {
        return posicao;
    }

    public static void setPosicao(int novaPosicao) {
        posicao = novaPosicao;
    }

    public String getNome() {
        return this.nome;
    }

    public String getUsername() {
        return this.username;
    }

    public String getFotoPerfil() {
        return this.fotoPerfil;
    }

    public String getDataCriacao() {
        return this.dataCriacao;
    }

    public String getEmail() {
        return this.email;
    }

    public String getBio() {
        return this.bio;
    }

    public int getPontosTotais() {
        return this.pontosTotais;
    }

    public int getQuantidadeDenuncias() {
        return this.quantidadeDenuncias;
    }

    public void setQuantidadeDenuncias(int quantidadeDenuncias) {
        this.quantidadeDenuncias = quantidadeDenuncias;
    }

    public boolean getAtivo() {
        return this.ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public int getIdPostMaisDenuncias() {
        return this.postsMaisDenuncias;
    }

    // Método estático para criar objetos Usuario

    public static List<Usuario> criarListaUsuarios(ResultSet resultSet) throws SQLException {
        List<Usuario> listaUsuarios = new ArrayList<>();

        while (resultSet.next()) {
            Usuario usuario = new Usuario(
                    resultSet.getString("nome"),
                    resultSet.getString("username"),
                    resultSet.getString("fotoPerfil"),
                    resultSet.getString("dataCriacaoUsuario"),
                    resultSet.getString("email"),
                    resultSet.getString("descricao"),
                    resultSet.getInt("pontosTotais"),
                    resultSet.getInt("quantidadeDenuncias"),
                    resultSet.getInt("idPostMaisDenuncias"),
                    resultSet.getBoolean("ativo")
            );

            listaUsuarios.add(usuario);
        }

        return listaUsuarios;
    }

    // Comparable

    public int compareTo(String target) {
        return this.username.compareTo(target);
    }
}

