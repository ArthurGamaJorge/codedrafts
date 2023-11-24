public class Usuario {

    private int idUsuario;
    private String username;
    private String nome;
    
    public Usuario(int id, String nome, String username) {
        this.idUsuario = id;
        this.username = username;
        this.nome = nome;
    }

    public String toString(){
        return this.idUsuario + " - " + this.nome + " (" + this.username + ")";
    }

}
