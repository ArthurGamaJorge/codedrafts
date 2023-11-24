
//public class Usuario {
//
//    private int idUsuario;
//    private String username;
//    private String nome;
//    
//    public Usuario(int id, String nome, String username) {
//        this.idUsuario = id;
//        this.username = username;
//        this.nome = nome;
//    }
//
//    public String toString(){
//        return this.idUsuario + " - " + this.nome + " (" + this.username + ")";
//    }
//
//}

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Usuario {
    private static int posicao = 0; // posição atual da lista de usuários
    private String nome;
    private String username;
    private String fotoPerfil;
    private String dataCriacao;
    private String email;
    private String bio;
    private String pontosTotais;
    private String quantidadeDenuncias;


    public Usuario(String nome, String username, String fotoPerfil, String dataCriacao, String email, String bio, String pontosTotais, String quantidadeDenuncias) {
        this.nome = nome;
        this.username = username;
        this.fotoPerfil = fotoPerfil;
        this.dataCriacao = dataCriacao;
        this.email = email;
        this.bio = bio;
        this.pontosTotais = pontosTotais;
        this.quantidadeDenuncias = quantidadeDenuncias;
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

    public String getPontosTotais() {
        return this.pontosTotais;
    }

    public String getQuantidadeDenuncias() {
        return this.quantidadeDenuncias;
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
                    resultSet.getString("pontosTotais"),
                    resultSet.getString("quantidadeDenuncias")
            );

            listaUsuarios.add(usuario);
        }

        return listaUsuarios;
    }
}

