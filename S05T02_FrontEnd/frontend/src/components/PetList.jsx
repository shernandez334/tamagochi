import React, { useEffect, useState } from "react";
import { fetchUserPets } from "../services/api";
import "../styles/petList.css";
import PetCreation from "./PetCreation.jsx";

const PetList = ({ token }) => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const getPets = async () => {
            if (!token) return;
            const userPets = await fetchUserPets(token);
            setPets(userPets);
        };
        getPets();
    }, [token]);

    return (
        <div className="pet-list-container">
            <div className="pet-list">
               
                {pets.length === 0 ? (
                    <p>No pets found. Try adding one!</p>
                ) : (
                    <ul>
                        {pets.map((pet) => (
                            <li key={pet.id}>{pet.name}</li>
                        ))}
                    </ul>
                )}
            </div>

            <PetCreation token={token} onPetCreated={() => window.location.reload()} />
        </div>
    );
};

export default PetList;