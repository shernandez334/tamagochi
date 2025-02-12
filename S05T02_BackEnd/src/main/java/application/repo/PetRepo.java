package application.repo;

import application.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PetRepo extends JpaRepository<Pet, Long> {
    List<Pet> findByOwnerId(String ownerId);
}