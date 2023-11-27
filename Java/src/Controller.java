import javafx.fxml.FXML;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;

import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.ButtonType;
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
import javafx.stage.Modality;

import java.sql.Statement;

import javafx.fxml.Initializable;
import java.net.URL;

import java.util.List;
import java.util.ResourceBundle;

import javafx.event.EventHandler;
import javafx.scene.input.MouseEvent;

public class Controller implements Initializable {
    private Connection conexão;
    private List<Usuario> listaUsuarios;
    private List<Post> listaPosts;
    private List<Topico> listaTopicos;

    @FXML
    private TextArea TxtAreaBioUsuario;

    @FXML
    private TableView<?> TablePesquisarUsuarioConquista;

    @FXML
    private TextField EstQtosUsuarios;

    @FXML
    private TextField EstNovosUsuariosMes;

    @FXML
    private Label TxtQuantosUsers;

    @FXML
    private Label TxtQuantosPosts;

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
    private Text txtNDenunciasPost;

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
    private Pane ImgCapaPostUsuario;

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
    private ListView<Topico> listViewTopicos;

    @FXML
    private Label TxtQuantasDenunciasUserPost;

    @FXML
    private ListView<Conquista> ListaConquista;

    @FXML
    private ListView<Usuario> ListaUsuariosConquista;

    public static boolean exibirMensagem(String titulo, String mensagem, Alert.AlertType tipoAlerta) {
        Alert alerta = new Alert(tipoAlerta);
        alerta.setTitle(titulo);
        alerta.setHeaderText(null);
        alerta.setContentText(mensagem);
        alerta.initModality(Modality.APPLICATION_MODAL);

        alerta.getButtonTypes().setAll(ButtonType.OK, ButtonType.CANCEL);

        return alerta.showAndWait().filter(response -> response == ButtonType.OK).isPresent();
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) { // inicia assim que abre a janela
        Conexao DB = new Conexao();
        this.conexão = DB.getConexão();

        String querySelecionarPost =  "SELECT P.idPost, P.titulo, P.conteudo, P.pontosPost, P.dataCriacaoPost, P.capa, P.quantidadeDenuncias, U.username FROM CodeDrafts.Post P JOIN CodeDrafts.Usuario U ON P.idUsuario = U.idUsuario "; 
        String querySelecionarUsuario =  "SELECT U.*, (SELECT TOP 1 P.idPost FROM CodeDrafts.Post P WHERE P.idUsuario = U.idUsuario ORDER BY P.quantidadeDenuncias DESC) AS idPostMaisDenuncias FROM CodeDrafts.Usuario U ORDER BY U.quantidadeDenuncias DESC;";
        String querySelecionarTopico =  "SELECT * from CodeDrafts.Topico order by idTopico";  

    try{
        PreparedStatement statementGetPost = this.conexão.prepareStatement(querySelecionarPost);
        ResultSet queryResultPost = statementGetPost.executeQuery();
        this.listaPosts = Post.criarListaPosts(queryResultPost);

        PreparedStatement statementGetUsuario = this.conexão.prepareStatement(querySelecionarUsuario);
        ResultSet queryResultUsuario = statementGetUsuario.executeQuery();
        this.listaUsuarios = Usuario.criarListaUsuarios(queryResultUsuario);

        PreparedStatement statementGetTopico = this.conexão.prepareStatement(querySelecionarTopico);
        ResultSet queryResultTopico = statementGetTopico.executeQuery();
        this.listaTopicos = Topico.criarListaTopicos(queryResultTopico);

        adicionarEstatisticas();
        atualizarPost();
        atualizarUsuario();
        atualizarTopicos();
        adicionarUsuariosConquista();
        adicionarConquistas(conexão);

    } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public void receberInfoModerador(String nomeModerador, String emailModerador, int idModerador){
        TxtInfoModerador.setText(String.valueOf("Codedrafts - Logado: " + nomeModerador + " - " + emailModerador + " - ID:" + idModerador));
    }

    @FXML
    void ActionOnWriteTopicosId(KeyEvent event){
        verNome();    
    }

    private void verNome(){
        String id = TxtFieldIdTopicos.getText();
        
        if(id.equals("0")){
            TxtFieldNomeTopicos.setPromptText("Digite aqui o nome do novo tópico");
        }else if(id.isBlank() == false  && id.matches("[0-9]+")){
            try {
                for(int j = 0; j < this.listaTopicos.size(); j++){
                    if(this.listaTopicos.get(j).getIdTopico() == Integer.parseInt(id)){
                        TxtFieldNomeTopicos.setText(this.listaTopicos.get(j).getNome());
                        return;
                    }
                }
                TxtFieldNomeTopicos.setPromptText("Não existe esse topico");

                } catch (Exception e) {
                    TxtFieldNomeTopicos.setPromptText("Erro em encontrar esse post");
                }

        }else{TxtFieldNomeTopicos.setPromptText("Não existe esse topico");}
    }

    @FXML
    void ActionCriarEditarTopico(ActionEvent event) throws Exception{    
        String id = TxtFieldIdTopicos.getText();
        
        if(id.equals("0")){
            String nome = TxtFieldNomeTopicos.getText();

            String comando = "exec CodeDrafts.spInserirTopico '" + nome + "'";
            try {
                this.conexão.createStatement().executeUpdate(comando);
                this.conexão.commit();
                TxtFieldIdTopicos.setPromptText("foi!");

                String comandoUltimoId = "SELECT idTopico from CodeDrafts.Topico order by idTopico desc";
                ResultSet result = this.conexão.createStatement().executeQuery(comandoUltimoId);

                if (result.next()) {
                    this.listaTopicos.add(new Topico(result.getInt("idTopico"), nome));
                }
            } catch (Exception e) {
                TxtFieldIdTopicos.setPromptText("nao foi.");
                System.out.println(e);
            }
            
        }else if(!id.isBlank() && id.matches("[0-9]+")){
            
            String nome = TxtFieldNomeTopicos.getText();

            String comando = "update CodeDrafts.Topico set nome = '"+nome+"' where idTopico = " + id;
            for(var i = 0; i < this.listaTopicos.size(); i++){
                if(this.listaTopicos.get(i).getIdTopico() == Integer.parseInt(id)){
                    this.listaTopicos.get(i).setNome(nome);
                }
            }
            try {
                this.conexão.createStatement().executeUpdate(comando);
                this.conexão.commit();

                TxtFieldIdTopicos.setPromptText("foi!");
                atualizarTopicos();
            } catch (Exception e) {
                TxtFieldIdTopicos.setPromptText("nao foi.");
                System.out.println(e);
            }

        }else{TxtFieldIdTopicos.setPromptText("ID");}
        atualizarTopicos();
    }

    @FXML
    void ActionExcluirTopico(ActionEvent event) throws Exception{

        String idTopico = TxtFieldIdTopicos.getText();
        String comando = "exec CodeDrafts.spDeletarTopico " + idTopico;

        if(idTopico.isBlank() == false  && idTopico.matches("[0-9]+")){
            try {
                Statement statement = this.conexão.createStatement();
                statement.executeUpdate(comando);
                this.conexão.commit();
                TxtFieldIdTopicos.setPromptText("foi!");

                for(int i = 0; i < this.listaTopicos.size(); i++){
                    if(this.listaTopicos.get(i).getIdTopico() == Integer.parseInt(idTopico)){
                        this.listaTopicos.remove(i);
                    }
                }

                atualizarTopicos();
            }catch(Exception e){System.out.println(e);TxtFieldIdTopicos.setPromptText("nao foi.");}
        }else{
            TxtFieldIdTopicos.setPromptText("ID");
        }
        
    }

    public void adicionarConquistas(Connection conexao){
        try {
            String comando = "SELECT idConquista, nome, nivel, imagem from CodeDrafts.Conquista order by idConquista";
            Statement statement = conexao.createStatement();
            ResultSet result = statement.executeQuery(comando);

            ObservableList<Conquista> items = FXCollections.observableArrayList();
            
            while (result.next()) {
                int id = result.getInt("idConquista");
                String nome = result.getString("nome");
                int nivel = result.getInt("nivel");
                String imagem = result.getString("imagem");
                items.add(new Conquista(id,nome,nivel,imagem));
            }
            ListaConquista.setItems(items);  
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void adicionarUsuariosConquista(){
        try {
            String comando = "SELECT nome, username, idUsuario from CodeDrafts.Usuario order by idUsuario";
            Statement statement = this.conexão.createStatement();
            ResultSet result = statement.executeQuery(comando);

            ObservableList<Usuario> items = FXCollections.observableArrayList();
            
            while (result.next()) {
                int id = result.getInt("idUsuario");
                String nome = result.getString("nome");
                String username = result.getString("username");
                items.add(new Usuario(nome,username,id));
            }

            ListaUsuariosConquista.setItems(items);  
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void atualizarTopicos() {
        if (!this.listaTopicos.isEmpty()){
            try {
                ObservableList<Topico> items = FXCollections.observableArrayList();
                
                for(int i = 0; i < this.listaTopicos.size(); i++){
                    int id = this.listaTopicos.get(i).getIdTopico();
                    String nome = this.listaTopicos.get(i).getNome();
                    items.add(new Topico(id, nome));
                }

                listViewTopicos.setItems(items);  
            } catch (Exception e) {
                System.out.println(e);
            }

            listViewTopicos.setOnMouseClicked(new EventHandler<MouseEvent>() {
                @Override
                public void handle(MouseEvent event) {
                    if (listViewTopicos.getSelectionModel().getSelectedItem() != null) {
                        int selectedId = listViewTopicos.getSelectionModel().getSelectedItem().getIdTopico();
                        TxtFieldIdTopicos.setText(String.valueOf(selectedId));
                        verNome();
                    }
                }
            });
        }
    }




    public void adicionarEstatisticas(){
        String queryCountUsers = "SELECT count(*) as 'quantosUsuarios' FROM CodeDrafts.Usuario";  
        String queryCountUsersDesativados = "SELECT count(*) as 'quantosUsuariosDesativados' FROM CodeDrafts.Usuario where ativo = 0";
        String queryCountUsersAtivos = "SELECT * from CodeDrafts.V_UsuariosAtivos";

        String queryContasAnuais = "SELECT * from CodeDrafts.V_UsuariosAno"; 
        String queryContasMensais = "SELECT * from CodeDrafts.V_UsuariosMes";  

        String queryPontosTotais = "select sum(pontosTotais) as 'pontosTotais' from CodeDrafts.Usuario";  

        String queryPosts = "SELECT count(*) as 'quantosPost' from CodeDrafts.Post";  

        String queryTempoCodeDrafts = "SELECT DATEDIFF(day, dataCriacaoUsuario, GETDATE()) as 'dias' FROM CodeDrafts.Usuario WHERE idUsuario = (SELECT MIN(idUsuario) FROM CodeDrafts.Usuario);";  
        
        try{ 
            PreparedStatement statementCountUsers = this.conexão.prepareStatement(queryCountUsers);
            ResultSet queryResultCountUsers = statementCountUsers.executeQuery();

            PreparedStatement statementCountUsersAtivos = this.conexão.prepareStatement(queryCountUsersAtivos);
            ResultSet queryResultCountUsersAtivos = statementCountUsersAtivos.executeQuery();

            PreparedStatement statementCountUsersDesativados = this.conexão.prepareStatement(queryCountUsersDesativados);
            ResultSet queryResultCountUsersDesativados = statementCountUsersDesativados.executeQuery();

            PreparedStatement statementCountUsersAnuais= this.conexão.prepareStatement(queryContasAnuais);
            ResultSet queryResultCountUsersAnuais = statementCountUsersAnuais.executeQuery();

            PreparedStatement statementCountUsersMensais = this.conexão.prepareStatement(queryContasMensais);
            ResultSet queryResultCountUsersMensais = statementCountUsersMensais.executeQuery();

            PreparedStatement statementCountPontos = this.conexão.prepareStatement(queryPontosTotais);
            ResultSet queryResultCountPontos = statementCountPontos.executeQuery();

            PreparedStatement statementCountPosts = this.conexão.prepareStatement(queryPosts);
            ResultSet queryResultCountPosts = statementCountPosts.executeQuery();

            PreparedStatement statementCountTime = this.conexão.prepareStatement(queryTempoCodeDrafts);
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

    

    public void atualizarPost() {
        if (!this.listaPosts.isEmpty()) {
            int posicao = Post.getPosicao();
    
            if (posicao > this.listaPosts.size() - 1) {
                Post.setPosicao(0);
            }
            if (posicao < 0) {
                Post.setPosicao(this.listaPosts.size() - 1);
            }
            posicao = Post.getPosicao();
    
            Post postAtual = this.listaPosts.get(posicao);

            TxtQuantosPosts.setText(String.valueOf(posicao + 1 + " / " + this.listaPosts.size()));
    
            String titulo = postAtual.getTitulo();
            TxtTituloPostPost.setText(String.valueOf(titulo));
    
            String texto = postAtual.getConteudo();
            TxtAreaConteudoPost.setText(String.valueOf(texto));
    
            String url = postAtual.getCapa();
            ImgCapaPost.setStyle("-fx-background-image: url('" + url + "'); -fx-background-repeat: no-repeat; -fx-background-size: 100%;");
    
            String username = postAtual.getUsername();
            TxtUsernamePost.setText(String.valueOf("@" + username));

            int nDenuncias = postAtual.getQuantidadeDenuncias();
            txtNDenunciasPost.setText(String.valueOf(nDenuncias));
    
            int id = postAtual.getIdPost();
            TxtPostPost.setText(String.valueOf(id));
        }
    }
    
    @FXML
    void ActionRetornarPost(ActionEvent event) {
        Post.setPosicao(Post.getPosicao() - 1);
        atualizarPost();
    }
    
    @FXML
    void ActionAvancarPost(ActionEvent event) {
        Post.setPosicao(Post.getPosicao() + 1);
        atualizarPost();
    }
    

 public void atualizarUsuario(){
        // atriuir

        if (!this.listaUsuarios.isEmpty()){
            int posicao = Usuario.getPosicao();

            if(posicao > this.listaUsuarios.size()-1){
                Usuario.setPosicao(0);
            }
            if(posicao < 0){
                Usuario.setPosicao(this.listaUsuarios.size() -1);
            }
            posicao = Usuario.getPosicao();

            Usuario usuarioAtual = this.listaUsuarios.get(posicao);

            TxtQuantosUsers.setText(String.valueOf(posicao + 1 + " / " + this.listaUsuarios.size()));

            TxtNomeUsuarioUsuario.setText(String.valueOf(usuarioAtual.getNome()));

            String username = usuarioAtual.getUsername();
            TxtUsernameUsuario.setText(String.valueOf("@" + username));

            ImgFotoUsuario.setStyle("-fx-background-image: url('" + usuarioAtual.getFotoPerfil() + "'); -fx-background-repeat: no-repeat; -fx-background-size: 100%;");

            TxtDataCriacaoUsuario.setText(String.valueOf(usuarioAtual.getDataCriacao()));

            TxtEmailUsuario.setText(String.valueOf(usuarioAtual.getEmail()));

            TxtAreaBioUsuario.setText(String.valueOf(usuarioAtual.getBio()));

            TxtFieldPontosUsuario.setText(String.valueOf(usuarioAtual.getPontosTotais()));

            TxtFieldDenunciasUsuario.setText(String.valueOf(usuarioAtual.getQuantidadeDenuncias()));

            if(!usuarioAtual.getAtivo()){
                BtnDesativarUsuario.setText("Reativar");
            } else{
                BtnDesativarUsuario.setText("Desativar");
            }

            TxtFieldLinkUsuario.setText(String.valueOf("https://codedrafts-5as0.onrender.com/user/" + username));
            boolean existe = false;
            for(int i = 0; i < this.listaPosts.size(); i++){
                if(this.listaPosts.get(i).getIdPost() == usuarioAtual.getIdPostMaisDenuncias()){
                    existe = true;
                    TxtTituloPostUsuario.setText(String.valueOf(this.listaPosts.get(i).getTitulo()));
                    ImgCapaPostUsuario.setStyle("-fx-background-image: url('" + this.listaPosts.get(i).getCapa() + "'); -fx-background-repeat: no-repeat; -fx-background-size: 100%;");
                    TxtAreaConteudoPostUsuario.setText(String.valueOf(this.listaPosts.get(i).getConteudo()));
                    TxtQuantasDenunciasUserPost.setText(String.valueOf(this.listaPosts.get(i).getQuantidadeDenuncias()));
                }
            }
            if(!existe){
                TxtTituloPostUsuario.setText("");
                ImgCapaPostUsuario.setStyle("");
                TxtAreaConteudoPostUsuario.setText("");
                TxtQuantasDenunciasUserPost.setText("0");
            }
        }
    }

    @FXML
    void ActionDesativarUsuario(ActionEvent event) {
        String comando = "";
        try{
            if(BtnDesativarUsuario.getText().equals("Desativar")){
                comando = "update CodeDrafts.Usuario set ativo = 0 where username = '" + TxtUsernameUsuario.getText().substring(1) + "'";
                EstBanidosDesativados.setText(String.valueOf(Integer.parseInt(EstBanidosDesativados.getText()) + 1));
                this.listaUsuarios.get(Usuario.getPosicao()).setAtivo(false);
            } else{
                comando = "update CodeDrafts.Usuario set ativo = 1 where username = '" + TxtUsernameUsuario.getText().substring(1) + "'";
                EstBanidosDesativados.setText(String.valueOf(Integer.parseInt(EstBanidosDesativados.getText()) - 1));
                this.listaUsuarios.get(Usuario.getPosicao()).setAtivo(true);
            }
            Statement statement = this.conexão.createStatement();
            statement.executeUpdate(comando);
            this.conexão.commit();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        atualizarUsuario();
    }

    @FXML
    void ActionBanirUsuario(ActionEvent event) {
        boolean resultado = exibirMensagem("ATENÇÃO!", "Deseja realmente banir esse usuário?", Alert.AlertType.CONFIRMATION);

    if (resultado) {
        int idUsuario = 0;
        try{
            String queryIdUsuario = "SELECT idUsuario FROM CodeDrafts.Usuario where username = '" + TxtUsernameUsuario.getText().substring(1) + "'";
            ResultSet queryResultIdUsuario = this.conexão.prepareStatement(queryIdUsuario).executeQuery();

            if (queryResultIdUsuario.next()) {
                idUsuario = queryResultIdUsuario.getInt("idUsuario");
            }

            String comando = "exec CodeDrafts.spDeletarUsuario " + idUsuario;

            Statement statement = this.conexão.createStatement();
            statement.executeUpdate(comando);
            this.conexão.commit();

            this.listaUsuarios.remove(Usuario.getPosicao());

            if (Usuario.getPosicao() != 0) {
                Usuario.setPosicao(Usuario.getPosicao() - 1);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        atualizarUsuario();
        
    }
}

    @FXML
    void ActionZerarDenunciasUsuario(ActionEvent event) {
        boolean resultado = exibirMensagem("ATENÇÃO!", "Deseja realmente zerar as denúncias desse usuário?", Alert.AlertType.CONFIRMATION);
        if(resultado){
            try{
                String comando = "update CodeDrafts.Usuario set quantidadeDenuncias = 0 where username = '" + TxtUsernameUsuario.getText().substring(1) + "'";
                String comando2 = "delete from CodeDrafts.UsuarioUsuario where idUsuario2 = (select idUsuario from CodeDrafts.Usuario where username = '" + TxtUsernameUsuario.getText().substring(1) + "')";
                this.listaUsuarios.get(Usuario.getPosicao()).setQuantidadeDenuncias(0);
                
                this.conexão.createStatement().executeUpdate(comando);
                this.conexão.createStatement().executeUpdate(comando2);

                this.conexão.commit();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            atualizarUsuario();
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
