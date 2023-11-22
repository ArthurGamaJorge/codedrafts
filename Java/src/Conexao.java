import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;

public class Conexao {
    public static Connection conexão; 

    public static void conectar(){

        try{
            BufferedReader in = new BufferedReader(new FileReader("Java/src/ConnectionString.txt"));
            conexão = DriverManager.getConnection(in.readLine());
            System.out.println("Conexão com banco de dados iniciada");
            in.close();
        } 
        catch(SQLException e){
            System.out.println("Erro na conexão com o banco de dados");
            e.printStackTrace();
        } 
        catch(IOException e){
            System.out.println("Não foi possível achar o arquivo de conexão");
            e.printStackTrace();
        }
    }

    public Connection getConexão(){
        return conexão;
    }
}
