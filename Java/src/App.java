import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.Parent;
import javafx.stage.Stage;
 
public class App extends Application {
    
    public void start(Stage primaryStage) throws Exception{

    FXMLLoader fmxLoader = new FXMLLoader(getClass().getResource("TelaLogin.fxml"));
    Parent root = fmxLoader.load();
    Scene scene = new Scene(root);
    
    primaryStage.setTitle("Login");
            primaryStage.setScene(scene);
            primaryStage.show();
}
 
 public static void main(String[] args) {
        launch(args);
    }
}