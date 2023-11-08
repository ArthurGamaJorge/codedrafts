import java.io.BufferedReader;
import java.io.FileReader;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;

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
    
    BufferedReader in = new BufferedReader(new FileReader("Java/src/ConnectionString.txt"));

    try{
        Connection conexão = DriverManager.getConnection(in.readLine());
        System.out.println("Conexão com banco de dados iniciada");
    } 
    catch(SQLException e){
        System.out.println("Erro na conexão com o banco de dados");
        e.printStackTrace();
    }

    in.close();
    launch(args);
    }
}