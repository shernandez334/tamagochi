import React, { useEffect, useState, useCallback } from "react";
import { fetchUserPets, updatePetEnergy } from "../services/api"; 
import "../styles/petList.css";

import redPet from "../assets/pets/pet-red.png";
import bluePet from "../assets/pets/pet-blue.png";
import greenPet from "../assets/pets/pet-green.png";
import yellowPet from "../assets/pets/pet-yellow.png";
import purplePet from "../assets/pets/pet-purple.png";

const petImages = { red: redPet, blue: bluePet, green: greenPet, yellow: yellowPet, purple: purplePet };

const PetList = ({ token, refreshTrigger }) => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPets = useCallback(async () => {
        if (!token) return;
        const userPets = await fetchUserPets(token);
        setPets(userPets);
    }, [token]);

    useEffect(() => {
        getPets();
    }, [getPets, refreshTrigger]); // ✅ Re-fetch pets when a new one is created

    const handleEnergyChange = async (petId, action) => {
        if (loading) return;
        setLoading(true);

        setPets((prevPets) =>
            prevPets.map((pet) =>
                pet.petId === petId
                    ? { ...pet, energy: calculateNewEnergy(pet.energy, action) }
                    : pet
            )
        );

        await updatePetEnergy(petId, action);
        setLoading(false);
        getPets();  // ✅ Refresh pet list
    };

    const calculateNewEnergy = (currentEnergy, action) => {
        switch (action) {
            case "sleep": return 100;
            case "play": return Math.max(0, currentEnergy - 15);
            case "feed": return Math.min(100, currentEnergy + 20);
            default: return currentEnergy;
        }
    };

    return (
        <div className="pet-list-container">
            <h2 className="pet-list-title">Your Pets</h2>

            <div className="pet-list">
                {pets.length === 0 ? (
                    <p>No pets found. Try adding one!</p>
                ) : (
                    pets.map((pet) => (
                        <div key={pet.petId} className="pet-item">
                            <img src={petImages[pet.color] || redPet} alt={pet.name} className="pet-image" />
                            <h3>{pet.name.replace(/['"]+/g, '')}</h3>

                            <div className="energy-bar">
                                <div className="energy-fill" style={{ width: `${pet.energy}%`, transition: "width 0.5s ease-in-out" }}></div>
                            </div>
                            <p>Energy: {pet.energy}%</p>

                            <div className="pet-actions">
                                <button disabled={loading} onClick={() => handleEnergyChange(pet.petId, "feed")}>🍖 Feed</button>
                                <button disabled={loading} onClick={() => handleEnergyChange(pet.petId, "play")}>🎾 Play</button>
                                <button disabled={loading} onClick={() => handleEnergyChange(pet.petId, "sleep")}>💤 Sleep</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PetList;