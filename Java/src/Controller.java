import javafx.fxml.FXML;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;

import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javafx.scene.control.Button;
import javafx.scene.control.TextField;

import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;

import javafx.scene.control.ListView;

import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextArea;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.Pane;
import javafx.scene.text.Text;

import java.sql.Statement;

import javafx.fxml.Initializable;
import java.net.URL;

import java.security.Identity;
import java.util.ArrayList;

import java.util.List;
import java.util.ResourceBundle;

public class Controller implements Initializable {
    private List<Usuario> listaUsuarios;

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
    private TextField TxtFieldModificarIdConquista;

    @FXML
    private Label TxtDataCriacaoUsuario;

    @FXML
    private Text TxtTituloPostPost;

    @FXML
    private Label TxtTituloPostUsuario;

    @FXML
    private Text TxtStatusModificarConquista;

    @FXML
    private Pane ImgCapaPost;

    @FXML
    private ImageView ImgSetaDPost;

    @FXML
    private TextArea TxtAreaConteudoPost;

    @FXML
    private Label TxtNomeUsuarioUsuario;

    @FXML
    private Button BtnSetaEUsuario;

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
    private Button BtnZerarDenunciasPost;

    @FXML
    private TextField TxtFieldSelecionarIdConquista;

    @FXML
    private TextField EstBanidosDesativados;

    @FXML
    private TextField TxtFieldNomeTopicos;

    @FXML
    private Pane ImgFotoUsuario;

    @FXML
    private Text TxtUsernamePost;

    @FXML
    private TextField TxtFieldModificarNomeConquista;

    @FXML
    private TextField TxtFieldSelecionarLinkConquista1;

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
    private Button BtnSetaDUsuario;

    @FXML
    private TextArea TxtAreaConteudoPostUsuario;

    @FXML
    private TextField TxtFieldSelecionarNomeConquista;

    @FXML
    private TableColumn<?, ?> ColumnTopicosNome;

    @FXML
    private Button BtnExcluirConquista;

    @FXML
    private TextField TxtFieldPontosUsuario;

    @FXML
    private TextField TxtFieldIdUsuarioConquista;

    @FXML
    private Button BtnBanirUsuario;

    @FXML
    private TableColumn<?, ?> ColumnTopicosID;

    @FXML
    private TextField EstPontosTotais;

    @FXML
    private Button BtnEntregarConquista;


    @FXML
    private ListView<Topico> listaTopicos;

    @FXML
    private ListView<Usuario> ListaUsuariosConquista;


    @FXML
    void ActionOnWriteTopicosId(KeyEvent event){
        Conexao DBconexão = new Conexao();
        Connection conexão = DBconexão.getConexão();
       
        String id = TxtFieldIdTopicos.getText();
        
        if(id.equals("0")){
            TxtFieldNomeTopicos.setText("Digite aqui o nome do novo tópico");
        }else if(id.isBlank() == false  && id.matches("[0-9]+")){
            try {
                String comando = "SELECT nome FROM CodeDrafts.Topico where idTopico = " + id;
                Statement statement = conexão.createStatement();
                ResultSet queryResult = statement.executeQuery(comando);
    
                if(queryResult.next() && !queryResult.equals("")){
                    String texto = queryResult.getString("nome");
                    TxtFieldNomeTopicos.setText(texto);
                }else{TxtFieldNomeTopicos.setText("Não existe esse topico");}
    
            }catch (Exception e) {
                TxtFieldNomeTopicos.setText("Erro em encontrar esse post");
            }

        }else{TxtFieldNomeTopicos.setText("Não existe esse topico");}
        
    }

    @FXML
    void ActionCriarEditarTopico(ActionEvent event) throws Exception{
        Conexao DBconexão = new Conexao();
        Connection conexão = DBconexão.getConexão();
       
        String id = TxtFieldIdTopicos.getText();
        
        if(id.equals("0")){
            String nome = TxtFieldNomeTopicos.getText();

            String comando = "exec CodeDrafts.spInserirTopico '" + nome + "'";
            try {
                Statement statement = conexão.createStatement();
                int rowsAffected = statement.executeUpdate(comando);
                conexão.commit();
                TxtFieldIdTopicos.setText("foi!");
                adicionarTopicos(conexão);
            } catch (Exception e) {
                TxtFieldIdTopicos.setText("nao foi.");
                System.out.println(e);
            }
            
        }else if(id.isBlank() == false  && id.matches("[0-9]+")){
            
            String nome = TxtFieldNomeTopicos.getText();

            String comando = "update CodeDrafts.Topico set nome = '"+nome+"' where idTopico = " + id;
            try {
                Statement statement = conexão.createStatement();
                int rowsAffected = statement.executeUpdate(comando);
                conexão.commit();
                TxtFieldIdTopicos.setText("foi!");
                adicionarTopicos(conexão);
            } catch (Exception e) {
                TxtFieldIdTopicos.setText("nao foi.");
                System.out.println(e);
            }

        }else{TxtFieldIdTopicos.setText("ID");}
    }

    @FXML
    void ActionExcluirTopico(ActionEvent event) throws Exception{

        Conexao DBconexão = new Conexao();
        Connection conexão = DBconexão.getConexão();

        String idTopico = TxtFieldIdTopicos.getText();
        String comando = "exec CodeDrafts.spDeletarTopico " + idTopico;

        if(idTopico.isBlank() == false  && idTopico.matches("[0-9]+")){
            try {
                Statement statement = conexão.createStatement();
                int rowsAffected = statement.executeUpdate(comando);
                conexão.commit();
                TxtFieldIdTopicos.setText("foi!");
                adicionarTopicos(conexão);
            }catch(Exception e){System.out.println(e);TxtFieldIdTopicos.setText("nao foi.");}
        }else{
            TxtFieldIdTopicos.setText("ID");
        }
        
    }


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) { // inicia assim que abre a janela
        Conexao DB = new Conexao();
        Connection conexão = DB.getConexão();

        String querySelecionarUsuario =  "SELECT * FROM CodeDrafts.Usuario order by quantidadeDenuncias DESC"; 

    try{
        PreparedStatement statementGetUsuario = conexão.prepareStatement(querySelecionarUsuario);
        ResultSet queryResultUsuario = statementGetUsuario.executeQuery();
        this.listaUsuarios = Usuario.criarListaUsuarios(queryResultUsuario);

        adicionarEstatisticas(conexão);
        adicionarDadosPost(conexão);
        atualizarUsuario();
        adicionarTopicos(conexão);
        adicionarUsuariosConquista(conexão);

    } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public void receberInfoModerador(String nomeModerador, String emailModerador, int idModerador){
        TxtInfoModerador.setText(String.valueOf("Codedrafts - Logado: " + nomeModerador + " - " + emailModerador + " - ID:" + idModerador));
    }

    //public void adicionarConquistas(Connection conexao){
    //    try {
    //        String comando = "SELECT idConquista, nome, nivel, imagem from CodeDrafts.Conquista order by idConquista";
    //        Statement statement = conexao.createStatement();
    //        ResultSet result = statement.executeQuery(comando);
//
    //        ObservableList<Conquista> items = FXCollections.observableArrayList();
    //        
    //        while (result.next()) {
    //            int id = result.getInt("idUsuario");
    //            String nome = result.getString("nome");
    //            String username = result.getString("username");
    //            items.add(new Usuario(id,nome,username));
    //        }
//
    //        ListaUsuariosConquista.setItems(items);  
    //    } catch (Exception e) {
    //        System.out.println(e);
    //    }
    //}

    public void adicionarUsuariosConquista(Connection conexao){
        try {
            String comando = "SELECT nome, username, idUsuario from CodeDrafts.Usuario order by idUsuario";
            Statement statement = conexao.createStatement();
            ResultSet result = statement.executeQuery(comando);

            ObservableList<Usuario> items = FXCollections.observableArrayList();
            
            while (result.next()) {
                int id = result.getInt("idUsuario");
                String nome = result.getString("nome");
                String username = result.getString("username");
                //items.add(new Usuario(id,nome,username));
            }

            ListaUsuariosConquista.setItems(items);  
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void adicionarTopicos(Connection conexao) {
        try {
            String comando = "SELECT idTopico, nome FROM CodeDrafts.Topico order by idTopico";
            Statement statement = conexao.createStatement();
            ResultSet result = statement.executeQuery(comando);

            ObservableList<Topico> items = FXCollections.observableArrayList();
            
            while (result.next()) {
                int id = result.getInt("idTopico");
                String nome = result.getString("nome");
                items.add(new Topico(id, nome));
            }

            listaTopicos.setItems(items);  
        } catch (Exception e) {
            System.out.println(e);
        }

    }

    public void adicionarEstatisticas(Connection conexão){
        String queryCountUsers = "SELECT count(*) as 'quantosUsuarios' FROM CodeDrafts.Usuario";  
        String queryCountUsersDesativados = "SELECT count(*) as 'quantosUsuariosDesativados' FROM CodeDrafts.Usuario where ativo = 0";
        String queryCountUsersAtivos = "SELECT * from CodeDrafts.V_UsuariosAtivos";

        String queryContasAnuais = "SELECT * from CodeDrafts.V_UsuariosAno"; 
        String queryContasMensais = "SELECT * from CodeDrafts.V_UsuariosMes";  

        String queryPontosTotais = "select sum(pontosTotais) as 'pontosTotais' from CodeDrafts.Usuario";  

        String queryPosts = "SELECT count(*) as 'quantosPost' from CodeDrafts.Post";  

        String queryTempoCodeDrafts = "SELECT DATEDIFF(day, dataCriacaoUsuario, GETDATE()) as 'dias' FROM CodeDrafts.Usuario WHERE idUsuario = (SELECT MIN(idUsuario) FROM CodeDrafts.Usuario);";  
        
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
        String querySelecionarPostPost =  "SELECT * FROM CodeDrafts.V_PreviewPost"; 

    try{
        PreparedStatement statementGetPostPost = conexão.prepareStatement(querySelecionarPostPost);
        ResultSet queryResultPostPost = statementGetPostPost.executeQuery();

        // atriuir

        if (queryResultPostPost.next()){
            String titulo = queryResultPostPost.getString("titulo");
            TxtTituloPostPost.setText(String.valueOf(titulo));

            String texto = queryResultPostPost.getString("conteudo");
            TxtAreaConteudoPost.setText(String.valueOf(texto));

            String url = queryResultPostPost.getString("capa");
            ImgCapaPost.setStyle("-fx-background-image: url('" + url + "'); -fx-background-repeat: no-repeat; -fx-background-size: 100%;");

            String autor = queryResultPostPost.getString("username");
            TxtUsernamePost.setText(String.valueOf("@" + autor));

            String id = queryResultPostPost.getString("idPost");
            TxtPostPost.setText(String.valueOf("idPost:" + id));
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }

        // adicionar post, forma de selecionar um post em específico -> browse dos posts ; aprovar / reprovar POST
    }

 public void atualizarUsuario(){
        // atriuir

        if (!listaUsuarios.isEmpty()){
            int posicao = Usuario.getPosicao();

            if(posicao > listaUsuarios.size()-1){
                Usuario.setPosicao(0);
            }
            if(posicao < 0){
                Usuario.setPosicao(listaUsuarios.size() -1);
            }
            posicao = Usuario.getPosicao();

            Usuario usuarioAtual = listaUsuarios.get(posicao);


            String nome = usuarioAtual.getNome();
            TxtNomeUsuarioUsuario.setText(String.valueOf(nome));

            String username = usuarioAtual.getUsername();
            TxtUsernameUsuario.setText(String.valueOf("@" + username));

            String fotoPerfil = usuarioAtual.getFotoPerfil();
            ImgFotoUsuario.setStyle("-fx-background-image: url('" + fotoPerfil + "'); -fx-background-repeat: no-repeat; -fx-background-size: 100%;");

            String dataCriacao = usuarioAtual.getDataCriacao();
            TxtDataCriacaoUsuario.setText(String.valueOf(dataCriacao));

            String email = usuarioAtual.getEmail();
            TxtEmailUsuario.setText(String.valueOf(email));

            String bio = usuarioAtual.getBio();
            TxtAreaBioUsuario.setText(String.valueOf(bio));

            String pontosTotais  = usuarioAtual.getQuantidadeDenuncias();
            TxtFieldPontosUsuario.setText(String.valueOf(pontosTotais));

            String denuncias = usuarioAtual.getQuantidadeDenuncias();
            TxtFieldDenunciasUsuario.setText(String.valueOf(denuncias));

            TxtFieldLinkUsuario.setText(String.valueOf("https://codedrafts-5as0.onrender.com/user/" + username));
        }
    }

     @FXML
    void ActionRetornarUsuario(ActionEvent event) {
        Usuario.setPosicao(Usuario.getPosicao() - 1);
        atualizarUsuario();
    }

    @FXML
    void ActionAvancarUsuario(ActionEvent event) {
        Usuario.setPosicao(Usuario.getPosicao() + 1);
        atualizarUsuario();
    }
}