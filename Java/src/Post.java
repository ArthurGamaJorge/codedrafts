public class Post {
    private String titulo;
    private String conteudo;

    public Post(String titulo, String conteudo){
        this.titulo = titulo;
        this.conteudo = conteudo;
    }

    public String getTitulo(){
        return this.titulo;
    }

    public String getConteudo(){
        return this.conteudo;
    }
}
