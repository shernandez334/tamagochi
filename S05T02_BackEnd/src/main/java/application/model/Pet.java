package application.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "pets")
@NoArgsConstructor
@Getter
@Setter
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long petId;

    @Column(nullable = false)
    private String name;

    private String color;
    private int energy;

    @Column(name = "owner_id", nullable = false)
    private String ownerId;
}