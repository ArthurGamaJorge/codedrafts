import javafx.fxml.FXML;
import javafx.event.ActionEvent;

import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javafx.scene.control.Button;
import javafx.scene.control.TextField;

import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.TableView;
import javafx.scene.control.TextArea;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyEvent;
import javafx.scene.text.Text;


import java.sql.Statement;
import javafx.scene.control.TableColumn;

import javafx.fxml.Initializable;
import java.net.URL;
import java.util.ResourceBundle;

import javax.print.DocFlavor.STRING;

public class Controller implements Initializable {



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
    private TextField TxtFieldSelecionarLinkConquista1;

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
    private TableColumn ColumnTopicosID;

    @FXML
    private TableColumn ColumnTopicosNome;

    @FXML
    void ActionCriarEditarTopico(KeyEvent event){
        Conexao DBconexão = new Conexao();
        Connection conexão = DBconexão.getConexão();
       
        String id = TxtFieldIdTopicos.getText();
        
        if(id == "0"){
            TxtFieldNomeTopicos.setText("Digite o nome do novo tópico");
        }if(id.isBlank() == false){
            try {
            
                String comando = "SELECT nome FROM CodeDrafts.Topico where idTopico = " + id;
                Statement statement = conexão.createStatement();
                ResultSet queryResult = statement.executeQuery(comando);
    
                if(queryResult.next()){
                    String texto = queryResult.getString("nome");
                    TxtFieldNomeTopicos.setText(texto);
                }
    
    
            } catch (Exception e) {
                TxtFieldNomeTopicos.setText("Não existe esse post");
            }
        }
        
    }

    @FXML
    void ActionExcluirTopico(ActionEvent event) throws Exception{
        System.out.println("A");
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) { // inicia assim que abre a janela
        
        Conexao DB = new Conexao();
        Connection conexão = DB.getConexão();
        adicionarEstatisticas(conexão);
        adicionarDadosPost(conexão);
    }

    public void receberInfoModerador(String nomeModerador, String emailModerador, int idModerador){
        TxtInfoModerador.setText(String.valueOf("Codedrafts - Logado: " + nomeModerador + " - " + emailModerador + " - ID:" + idModerador));
    }

    public void adicionarEstatisticas(Connection conexão){
        String queryCountUsers = "SELECT count(*) as 'quantosUsuarios' FROM CodeDrafts.Usuario";  
        String queryCountUsersDesativados = "SELECT count(*) as 'quantosUsuariosDesativados' FROM CodeDrafts.Usuario where ativo = 0";
        String queryCountUsersAtivos = "SELECT * from CodeDrafts.V_UsuariosAtivos";

        String queryContasAnuais = "SELECT * from CodeDrafts.V_UsuariosAno"; 
        String queryContasMensais = "SELECT * from CodeDrafts.V_UsuariosMes";  

        String queryPosts = "SELECT count(*) from CodeDrafts.Post";  
        
        try{ 
            PreparedStatement statementCountUsers = conexão.prepareStatement(queryCountUsers);
            ResultSet queryResultCountUsers = statementCountUsers.executeQuery();

            PreparedStatement statementCountUsersAtivos = conexão.prepareStatement(queryCountUsersAtivos);
            ResultSet queryResultCountUsersAtivos = statementCountUsersAtivos.executeQuery();

            PreparedStatement statementCountUsersDesativados = conexão.prepareStatement(queryCountUsersDesativados);
            ResultSet queryResultCountUsersDesativados = statementCountUsersDesativados.executeQuery();

            PreparedStatement statementCountUsersAnuais= conexão.prepareStatement(queryContasAnuais);
            ResultSet queryResultCountUsersAnuais = statementCountUsersAnuais.executeQuery();

            PreparedStatement statementCountUsersMensais = conexão.prepareStatement(queryContasMensais);
            ResultSet queryResultCountUsersMensais = statementCountUsersMensais.executeQuery();

            PreparedStatement statementCountPontos = conexão.prepareStatement(queryPontosTotais);
            ResultSet queryResultCountPontos = statementCountPontos.executeQuery();

            PreparedStatement statementCountPosts = conexão.prepareStatement(queryPosts);
            ResultSet queryResultCountPosts = statementCountPosts.executeQuery();

            PreparedStatement statementCountTime = conexão.prepareStatement(queryTempoCodeDrafts);
            ResultSet queryResultCountTime = statementCountTime.executeQuery();


            if (queryResultCountUsers.next()) {
                int quantosUsuarios = queryResultCountUsers.getInt("quantosUsuarios");
                EstQtosUsuarios.setText(String.valueOf(quantosUsuarios));
            }
            if (queryResultCountUsersAtivos.next()) {
                int quantosUsuariosAtivos = queryResultCountUsersAtivos.getInt("usuariosAtivos");
                EstUsuariosAtivos.setText(String.valueOf(quantosUsuariosAtivos));
            }
            if (queryResultCountUsersDesativados.next()) {
                int quantosUsuariosDesativados = queryResultCountUsersDesativados.getInt("quantosUsuariosDesativados");
                EstBanidosDesativados.setText(String.valueOf(quantosUsuariosDesativados));
            }
            if (queryResultCountUsersAnuais.next()) {
                int quantosUsuariosAnuais = queryResultCountUsersAnuais.getInt("usuariosAno");
                EstNovosUsuariosAno.setText(String.valueOf(quantosUsuariosAnuais));
            }
            if (queryResultCountUsersMensais.next()) {
                int quantosUsuariosMensais = queryResultCountUsersMensais.getInt("usuariosMes");
                EstNovosUsuariosMes.setText(String.valueOf(quantosUsuariosMensais));
            }
            if (queryResultCountPontos.next()) {
                int quantosPontos = queryResultCountPontos.getInt("pontosTotais");
                EstPontosTotais.setText(String.valueOf(quantosPontos));
            }
            if (queryResultCountPosts.next()) {
                int quantosPosts = queryResultCountPosts.getInt("quantosPost");
                EstQuantidadePosts.setText(String.valueOf(quantosPosts));
            }
            if (queryResultCountTime.next()) {
                int quantosDias = queryResultCountTime.getInt("dias");
                EstTempoDesdeUserUm.setText(String.valueOf(quantosDias) + " dias");
            }    

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public void adicionarDadosPost(Connection conexão){
        // querys
        String querySelecionarTituloPostPost =  "SELECT titulo FROM CodeDrafts.Post"; // pegar título
        String querySelecionarTextoPostPost =  "SELECT conteudo FROM CodeDrafts.Post"; // pegar texto post
        String querySelecionarImagemPostPost =  "SELECT capa FROM CodeDrafts.Post"; // pegar imagem post
        String querySelecionarAutorPostPost =  "SELECT username FROM CodeDrafts.Usuario WHERE CodeDrafts.Usuario.idUsuario = CodeDrafts.Usuario.idUsuario"; // pegar @autor
        String querySelecionarIdPostPost =  "SELECT idPost FROM CodeDrafts.Post"; // pegar id post

        // Statements

    // pegar título
        PreparedStatement statementGetTituloPostPost = conexão.prepareStatement(querySelecionarTituloPostPost);
        ResultSet queryResultTituloPostPost = statementGetTituloPostPost.executeQuery();

    // pegar texto post
        PreparedStatement statementGetTextoPostPost = conexão.prepareStatement(querySelecionarTextoPostPost);
        ResultSet queryResultTextoPostPost = statementGetTextoPostPost.executeQuery();

    // pegar imagem post
        PreparedStatement statementGetImagemPostPost = conexão.prepareStatement(querySelecionarImagemPostPost);
        ResultSet queryResultImagemPostPost = statementGetImagemPostPost.executeQuery();
        
    // pegar @autor
        PreparedStatement statementGetAutorPostPost = conexão.prepareStatement(querySelecionarAutorPostPost);
        ResultSet queryResultAutorPostPost = statementGetAutorPostPost.executeQuery();
    
    // pegar id post
        PreparedStatement statementGetIdPostPost = conexão.prepareStatement(querySelecionarIdPostPost);
        ResultSet queryResultIdPostPost = statementGetIdPostPost.executeQuery();

        // atriuir

        if (queryResultTituloPostPost.next()){
            String titulo = queryResultTituloPostPost.getString(1);
            TxtTituloPostPost.setText(String.valueOf(textoTitulo));
        }
        if (queryResultTextoPostPost.next()){
            String texto = queryResultTextoPostPost.getString(1);
            TxtAreaConteudoPost.setText(String.valueOf(texto));
        }
        if (queryResultImagemPostPost.next()){
            String url = queryResultImagemPostPost.getString(1);
            ImgCapaPost.setStyle("-fx-background-image: url(" + url + "); -fx-background-repeat: no-repeat; -fx-background-size: 100%;");
        }
        if (queryResultAutorPostPost.next()){
            String autor = queryResultAutorPostPost.getString(1);
            TxtUsernamePost.setText(String.valueOf(autor));
        }
        if (queryResultIdPostPost.next()){
            String id = queryResultIdPostPost.getString(1);
            TxtPostPost.setText(String.valueOf(id));
        }


        // adicionar post, forma de selecionar um post em específico -> browse dos posts ; aprovar / reprovar POST
    }
}

