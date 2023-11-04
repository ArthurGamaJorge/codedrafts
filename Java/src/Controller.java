import javafx.fxml.FXML;
import javafx.event.ActionEvent;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

public class Controller {

    @FXML
    private Button buttonLogar;

    @FXML
    private TextField inputEmail;

    @FXML
    private PasswordField inputSenha;

    @FXML
    void handleButtonAction(ActionEvent event) {
        System.out.println("oopa");
    }

}