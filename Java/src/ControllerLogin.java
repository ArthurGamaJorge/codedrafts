import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;

import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Connection;

import javafx.event.ActionEvent;

import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.Node;

import javafx.stage.Stage;

public class ControllerLogin {
    @FXML
    private Button buttonLogar;

    @FXML
    private TextField inputEmail;

    @FXML
    private PasswordField inputSenha;

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
                    FXMLLoader loader = new FXMLLoader(getClass().getResource("TelaPrincipal.fxml"));
                    Parent root = loader.load();
                    Stage stage = (Stage)((Node)event.getSource()).getScene().getWindow();
                    Scene scene = new Scene(root);

                    stage.setScene(scene);
                    scene.getWindow().centerOnScreen();
                    stage.setTitle("CodeDrafts");
                    stage.show();

                    String nomeModerador = queryResult.getString("nome");
                    String emailModerador = queryResult.getString("email");
                    int idModerador = queryResult.getInt("idModerador");

                    Controller telaPrincipalController = loader.getController();

                    telaPrincipalController.receberInfoModerador(nomeModerador, emailModerador, idModerador);

                } else{
                    System.out.println("Informações de login erradas");
                }
        } catch(Exception e){
            System.out.println("Erro na conexão");
            e.printStackTrace();
        }


    }

}
