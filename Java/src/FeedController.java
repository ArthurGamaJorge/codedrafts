import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.ListView;

// povoar o list

public class FeedController {
    @FXML
    private ListView<Post> postListView;

    public void initialize() {
        // Inicialize a lista de postagens e adicione à ListView
        ObservableList<Post> posts = FXCollections.observableArrayList(
                new Post("Usuario1", "Conteudo da postagem 1"),
                new Post("Usuario2", "Conteudo da postagem 2")
                // Adicione mais postagens conforme necessário
        );

        //postListView.setItems(posts);
        //postListView.setCellFactory(param -> new PostCell());
    }
}