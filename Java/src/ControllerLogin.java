import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;

import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Connection;

import javafx.event.ActionEvent;

import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.ButtonType;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.Node;
import javafx.stage.Modality;
import javafx.stage.Stage;

public class ControllerLogin {
    @FXML
    private Button buttonLogar;

    @FXML
    private TextField inputEmail;

    @FXML
    private PasswordField inputSenha;

    public static boolean exibirMensagem(String titulo, String mensagem, Alert.AlertType tipoAlerta) {
        Alert alerta = new Alert(tipoAlerta);
        alerta.setTitle(titulo);
        alerta.setHeaderText(null);
        alerta.setContentText(mensagem);
        alerta.initModality(Modality.APPLICATION_MODAL);

        alerta.getButtonTypes().setAll(ButtonType.OK);

        return alerta.showAndWait().filter(response -> response == ButtonType.OK).isPresent();
    }

    @FXML
    void handleButtonAction(ActionEvent event) throws Exception{
        String email = inputEmail.getText();
        String senha = inputSenha.getText();


        if(email.isBlank() || senha.isBlank()){
            System.out.println("Email ou senha não podem ser vázios");
            return;
        }

        String verificarLogin = "select * from CodeDrafts.Moderador where email = '" + email + "' and senha = '" + senha +"'";

        Conexao DBconexão = new Conexao();
        Connection conexão = DBconexão.getConexão();
        try{
            Statement statement = conexão.createStatement();
            ResultSet queryResult = statement.executeQuery(verificarLogin);

            if(queryResult.next()) {
                FXMLLoader fmxLoader = new FXMLLoader(getClass().getResource("TelaPrincipal.fxml"));
                Parent root = fmxLoader.load();

                Stage stage = (Stage)((Node)event.getSource()).getScene().getWindow();
                Scene scene = new Scene(root);

                stage.setScene(scene);
                scene.getWindow().centerOnScreen();
                stage.setTitle("CodeDrafts");
                stage.show();

                String nomeModerador = queryResult.getString("nome");
                String emailModerador = queryResult.getString("email");
                int idModerador = queryResult.getInt("idModerador");

                Controller telaPrincipalController = fmxLoader.getController();

                telaPrincipalController.receberInfoModerador(nomeModerador, emailModerador, idModerador);

            } else{
                exibirMensagem("Login incorreto", "Informações de login erradas", Alert.AlertType.ERROR);
            }
        } catch(Exception e){
            System.out.println("Erro na conexão");
            e.printStackTrace();
        }


    }

}
