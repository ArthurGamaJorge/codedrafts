import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;

import javafx.event.ActionEvent;

import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.Node;

import javafx.stage.Stage;

public class Controller {

    @FXML
    private Button buttonLogar;

    @FXML
    private TextField inputEmail;

    @FXML
    private PasswordField inputSenha;

    @FXML
    void handleButtonAction(ActionEvent event) throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("TelaPrincipal.fxml"));
        Stage stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        Scene scene = new Scene(root);

        stage.setScene(scene);
        scene.getWindow().centerOnScreen();
        stage.setTitle("CodeDrafts");
        stage.show();
    }

}