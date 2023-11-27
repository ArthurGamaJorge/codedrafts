
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

    public String toString(){
        return this.id + " - " + this.nome + " - (" + this.nivel + ", "+ this.imagem +")";
    }

}
