package application.database;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@Configuration
public class DatabaseInitializer {

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "";

    @Bean
    public DataSource dataSource() {
        createDatabaseIfNotExists();
        return DataSourceBuilder.create()
                .url("jdbc:mysql://localhost:3306/pets")
                .username(USERNAME)
                .password(PASSWORD)
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build();
    }

    private void createDatabaseIfNotExists() {
        try (Connection connection = DataSourceBuilder.create()
                .url(JDBC_URL)
                .username(USERNAME)
                .password(PASSWORD)
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build()
                .getConnection();
             Statement statement = connection.createStatement()) {

            statement.executeUpdate("CREATE DATABASE IF NOT EXISTS pets");
            System.out.println("✅ Database 'pets' checked/created successfully!");

        } catch (SQLException e) {
            System.err.println("⚠️ Error creating database: " + e.getMessage());
            throw new RuntimeException("Database creation failed", e);
        }
    }
}