import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.Parent;
import javafx.scene.image.Image;
import javafx.stage.Stage;
 
public class App extends Application {
    
    public void start(Stage primaryStage) throws Exception{

    FXMLLoader fmxLoader = new FXMLLoader(getClass().getResource("TelaLogin.fxml"));
    Parent root = fmxLoader.load();
    Scene scene = new Scene(root);
    
    primaryStage.setTitle("Login");

    Image image = new Image("resources/icon.png");
    primaryStage.getIcons().add(image);

    primaryStage.setScene(scene);
    primaryStage.show();
}
 
 public static void main(String[] args) throws Exception{
    
    launch(args);
    }
}