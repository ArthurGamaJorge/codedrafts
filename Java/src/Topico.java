import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Topico {
    private int idTopico;
    private String nome;
    
    public Topico(int idTopico, String nome) {
        this.idTopico = idTopico;
        this.nome = nome;
    }
    
    public int getIdTopico() {
        return this.idTopico;
    }
    
    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String toString(){
        return this.idTopico + " - " + this.nome;
    }

    public static List<Topico> criarListaTopicos(ResultSet resultSet) throws SQLException {
        List<Topico> listaTopicos = new ArrayList<>();

        while (resultSet.next()) {
            Topico topico = new Topico(
                    resultSet.getInt("idTopico"),
                    resultSet.getString("nome")
            );

            listaTopicos.add(topico);
        }

        return listaTopicos;
    }
}