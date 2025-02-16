import React, { useEffect, useState } from "react";
import { fetchUserPets, updatePetEnergy } from "../services/api"; 
import "../styles/petList.css";

import redPet from "../assets/pets/pet-red.png";
import bluePet from "../assets/pets/pet-blue.png";
import greenPet from "../assets/pets/pet-green.png";
import yellowPet from "../assets/pets/pet-yellow.png";
import purplePet from "../assets/pets/pet-purple.png";

const petImages = {
    red: redPet,
    blue: bluePet,
    green: greenPet,
    yellow: yellowPet,
    purple: purplePet
};

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

    // 🛠 Function to update pet energy
    const handleEnergyChange = async (petId, change) => {
        setPets((prevPets) =>
            prevPets.map((pet) =>
                pet.petId === petId
                    ? { ...pet, energy: Math.max(0, Math.min(100, pet.energy + change)) }
                    : pet
            )
        );

        await updatePetEnergy(petId, change);
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
                            <img
                                src={pet.color && petImages[pet.color] ? petImages[pet.color] : redPet}
                                alt={pet.name}
                                className="pet-image"
                            />
                            <h3>{pet.name.replace(/['"]+/g, '')}</h3>

                            {/* Energy Bar */}
                            <div className="energy-bar">
                                <div
                                    className="energy-fill"
                                    style={{ width: `${pet.energy}%` }}
                                ></div>
                            </div>
                            <p>Energy: {pet.energy}%</p>

                            {/* 🛠 Interactive Buttons */}
                            <div className="pet-actions">
                                <button onClick={() => handleEnergyChange(pet.petId, +10)}>🍖 Feed</button>
                                <button onClick={() => handleEnergyChange(pet.petId, -15)}>🎾 Play</button>
                                <button onClick={() => handleEnergyChange(pet.petId, +5)}>💤 Rest</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default PetList;