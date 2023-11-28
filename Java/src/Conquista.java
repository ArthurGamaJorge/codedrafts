import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Conquista {

    private int id;
    private String nome;
    private int nivel;
    private String imagem;
    
    public Conquista(int id, String nome, int nivel, String imagem) {
        this.id = id;
        this.nome = nome;
        this.nivel = nivel;
        this.imagem = imagem;
    }

    public int getId(){return this.id;}
    public String getNome(){return this.nome;}
    public int getNivel(){return this.nivel;}
    public String getImagem(){return this.imagem;}

    public void setId(int newV){this.id = newV;}
    public void setNome(String newV){this.nome = newV;}
    public void setNivel(int newV){this.nivel = newV;}
    public void setImagem(String newV){this.imagem = newV;}

    public static List<Conquista> criarListaTopicos(ResultSet resultSet) throws SQLException {
        List<Conquista> listaConquistas = new ArrayList<>();

        while (resultSet.next()) {
            Conquista conquista = new Conquista(
                    resultSet.getInt("idConquista"),
                    resultSet.getString("nome"),
                    resultSet.getInt("nivel"),
                    resultSet.getString("imagem")
            );

            listaConquistas.add(conquista);
        }

        return listaConquistas;
    }

    public String toString(){
        return this.id + " - " + this.nome + " - (" + this.nivel+")";
    }

}
