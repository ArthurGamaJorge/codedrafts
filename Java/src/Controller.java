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

import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.TableView;
import javafx.scene.control.TextArea;
import javafx.scene.image.ImageView;
import javafx.scene.text.Text;

import javafx.stage.Stage;

public class Controller {

    @FXML
    private TextArea TxtAreaBioUsuario;

    @FXML
    private TableView<?> TablePesquisarUsuarioConquista;

    @FXML
    private TextField EstQtosUsuarios;

    @FXML
    private TextField EstNovosUsuariosMes;

    @FXML
    private TextField EstQuantidadePosts;

    @FXML
    private TextField EstUsuariosAtivos;

    @FXML
    private TextField TxtFieldSelecionarNivelConquista;

    @FXML
    private TextField TxtFieldDenunciasUsuario;

    @FXML
    private TextField EstNovosUsuariosAno;

    @FXML
    private Text TxtPostsComTopico;

    @FXML
    private ImageView ImgSetaDUsuario;

    @FXML
    private TextField TxtFieldModificarIdConquista;

    @FXML
    private ImageView ImgSetaEUsuario;

    @FXML
    private Label TxtDataCriacaoUsuario;

    @FXML
    private TextField TxtFieldLinkImagem;

    @FXML
    private Text TxtTituloPostPost;

    @FXML
    private Label TxtTituloPostUsuario;

    @FXML
    private Text TxtStatusModificarConquista;

    @FXML
    private ImageView ImgCapaPost;

    @FXML
    private ImageView ImgSetaDPost;

    @FXML
    private TextArea TxtAreaConteudoPost;

    @FXML
    private Label TxtNomeUsuarioUsuario;

    @FXML
    private Text TxtPostPost;

    @FXML
    private Text TxtInfoModerador;

    @FXML
    private Button BtnZerarDenunciasUsuario;

    @FXML
    private TextField TxtFieldUsernameConquista;

    @FXML
    private ImageView ImgSetaEPost;

    @FXML
    private Label TxtEmailUsuario;

    @FXML
    private TableView<?> TableComentariosPost;

    @FXML
    private Button BtnZerarDenunciasPost;

    @FXML
    private TextField TxtFieldSelecionarIdConquista;

    @FXML
    private TextField EstBanidosDesativados;

    @FXML
    private TextField TxtFieldNomeTopicos;

    @FXML
    private ImageView ImgFotoUsuario;

    @FXML
    private Text TxtUsernamePost;

    @FXML
    private TextField TxtFieldModificarNomeConquista;

    @FXML
    private TextField TxtFieldIdTopicos;

    @FXML
    private TextField TxtFieldNomeUsuarioConquista;

    @FXML
    private Button BtnExcluirTopico;

    @FXML
    private TextField TxtFieldUsuariosComConquista;

    @FXML
    private Text TxtStatusEntregarConquista;

    @FXML
    private Label TxtUsernameUsuario;

    @FXML
    private TextField TxtFieldLinkUsuario;

    @FXML
    private TableView<?> TableTopicos;

    @FXML
    private Button BtnDenunciarUsuarioPost;

    @FXML
    private TextField EstTempoDesdeUserUm;

    @FXML
    private ComboBox<?> ComboBoxModificarNivelConquista;

    @FXML
    private Button BtnModificarConquista;

    @FXML
    private Button BtnExcluirPost;

    @FXML
    private Button BtnModificarTopico;

    @FXML
    private ImageView ImgImagemConquista;

    @FXML
    private TableView<?> TableConquistas;

    @FXML
    private Button BtnDesativarUsuario;

    @FXML
    private ImageView ImgCapaPostUsuario;

    @FXML
    private TextArea TxtAreaConteudoPostUsuario;

    @FXML
    private TextField TxtFieldSelecionarNomeConquista;

    @FXML
    private Button BtnExcluirConquista;

    @FXML
    private TextField TxtFieldPontosUsuario;

    @FXML
    private TextField TxtFieldIdUsuarioConquista;

    @FXML
    private Button BtnBanirUsuario;

    @FXML
    private Text TxtLinkImagemConquista;

    @FXML
    private TextField EstPontosTotais;

    @FXML
    private Button BtnEntregarConquista;

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

        String verificarLogin = "select count(1) from CodeDrafts.Moderador where email = '" + email + "' and senha = '" + senha +"'";

        Conexao DBconexão = new Conexao();
        Connection conexão = DBconexão.getConexão();
        try{
            Statement statement = conexão.createStatement();
            ResultSet queryResult = statement.executeQuery(verificarLogin);

            while(queryResult.next()){
                if(queryResult.getInt(1) == 1){
                    Parent root = FXMLLoader.load(getClass().getResource("TelaPrincipal.fxml"));
                    Stage stage = (Stage)((Node)event.getSource()).getScene().getWindow();
                    Scene scene = new Scene(root);

                    stage.setScene(scene);
                    scene.getWindow().centerOnScreen();
                    stage.setTitle("CodeDrafts");
                    stage.show();
                    break;
                } else{
                    System.out.println("Informações de login erradas");
                }
            }
        } catch(Exception e){
            System.out.println("Erro na conexão");
            e.printStackTrace();
        }


    }

    void ActionCriarEditarTopico(ActionEvent event) throws Exception{
        System.out.println("A");
    }

}