import React, { useEffect, useState, useCallback } from "react";
import { fetchUserPets, fetchAllPets, updatePetEnergy, deletePet, adminDeletePet } from "../services/api"; 
import "../styles/petList.css";
import { FaTrash } from "react-icons/fa";

import redPet from "../assets/pets/pet-red.png";
import bluePet from "../assets/pets/pet-blue.png";
import greenPet from "../assets/pets/pet-green.png";
import yellowPet from "../assets/pets/pet-yellow.png";
import purplePet from "../assets/pets/pet-purple.png";

const petImages = { red: redPet, blue: bluePet, green: greenPet, yellow: yellowPet, purple: purplePet };

const PetList = ({ token, refreshTrigger, isAdmin }) => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPets = useCallback(async () => {
        if (!token) {
            console.error("🚨 No token found!");
            return;
        }
    
        console.log("🛑 Calling fetchAllPets...");
        console.log("🔑 Admin Token Used:", token);
    
        try {
            const petsData = isAdmin 
                ? await fetchAllPets(token)   
                : await fetchUserPets(token);
    
            console.log("🐾 Pets received in PetList:", petsData);
    
            if (Array.isArray(petsData) && petsData.length > 0) {
                setPets(petsData);  // ✅ Ensure state updates correctly
            } else {
                console.warn("⚠️ Pets data is empty or not an array:", petsData);
            }
        } catch (error) {
            console.error("🚨 Error fetching pets in PetList:", error);
        }
    }, [token, isAdmin]);    

    useEffect(() => {
        console.log("🔄 Fetching pets in PetList...");
        console.log("👤 isAdmin:", isAdmin); 
        console.log("🔑 Token used:", token); 
    
        getPets(); // ✅ Call without `.then()`, since it's an async function
    }, [getPets, refreshTrigger, isAdmin, token]);

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
        getPets();
    };

    const calculateNewEnergy = (currentEnergy, action) => {
        switch (action) {
            case "sleep": return 100;
            case "play": return Math.max(0, currentEnergy - 15);
            case "feed": return Math.min(100, currentEnergy + 20);
            default: return currentEnergy;
        }
    };

    const handleDeletePet = async (petId) => {
        const confirmed = window.confirm("Are you sure you want to delete this pet?");
        if (!confirmed) return;

        const success = isAdmin ? await adminDeletePet(petId, token) : await deletePet(petId, token);

        if (success) {
            setPets((prevPets) => prevPets.filter((pet) => pet.petId !== petId)); // ✅ Instantly remove pet from UI
        } else {
            alert("❌ Failed to delete pet.");
        }
    };

    return (
        <div className="pet-list-container">
            <h2 className="pet-list-title">{isAdmin ? "All Pets (Admin)" : "Your Pets"}</h2>

            <div className="pet-list">
                {pets.length === 0 ? (
                    <p>No pets found.</p>
                ) : (
                    pets.map((pet) => (
                        <div key={pet.petId} className="pet-item">
                            {isAdmin && (
                                <button className="delete-icon" onClick={() => handleDeletePet(pet.petId)}>
                                    <FaTrash />
                                </button>
                            )}

                            <img src={petImages[pet.color] || redPet} alt={pet.name} className="pet-image" />
                            <h3>{pet.name.replace(/['"]+/g, '')}</h3>

                            <div className="energy-bar">
                                <div className="energy-fill" style={{ width: `${pet.energy}%`, transition: "width 0.5s ease-in-out" }}></div>
                            </div>
                            <p>Energy: {pet.energy}%</p>

                            {!isAdmin && (
                                <div className="pet-actions">
                                    <button disabled={loading} onClick={() => handleEnergyChange(pet.petId, "feed")}>🍖 Feed</button>
                                    <button disabled={loading} onClick={() => handleEnergyChange(pet.petId, "play")}>🎾 Play</button>
                                    <button disabled={loading} onClick={() => handleEnergyChange(pet.petId, "sleep")}>💤 Sleep</button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PetList;