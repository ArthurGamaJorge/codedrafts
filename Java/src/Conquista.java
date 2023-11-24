
public class Conquista {

    private int idUsuario;
    private String username;
    private String nome;
    
    public Conquista(int id, String nome, String username) {
        this.idUsuario = id;
        this.username = username;
        this.nome = nome;
    }

    public String toString(){
        return this.idUsuario + " - " + this.nome + " (" + this.username + ")";
    }

}
