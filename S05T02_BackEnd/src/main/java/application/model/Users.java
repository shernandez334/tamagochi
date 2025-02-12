package application.model;

import application.enums.UserRole;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Getter
@Setter
@Document(collection = "users")
public class Users {

    @Id
    private String id;
    private String username;
    private String password;
    private UserRole UserRole;
    private List<Long> petIds;
}