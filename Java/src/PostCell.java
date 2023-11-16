import javafx.scene.control.ListCell;

// classe para personalisar aparência de cada post

public class PostCell extends ListCell<Post> {
    @Override
    protected void updateItem(Post post, boolean empty) {
        super.updateItem(post, empty);

        if (empty || post == null) { // se não houver post, 
            setText(null);
            setGraphic(null);
            
        } else { // se houver um post não vazio
            // Personalizar a exibição do post
            setText(post.getTitulo() + ": " + post.getConteudo());
        }
    }
}
