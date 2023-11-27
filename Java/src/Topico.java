public class Topico {
    private int idTopico;
    private String nome;
    
    public Topico(int idTopico, String nome) {
        this.idTopico = idTopico;
        this.nome = nome;
    }
    
    public int getId() {
        return this.idTopico;
    }
    
    public String getNome() {
        return this.nome;
    }

    public String toString(){
        return this.idTopico + " - " + this.nome;
    }
}