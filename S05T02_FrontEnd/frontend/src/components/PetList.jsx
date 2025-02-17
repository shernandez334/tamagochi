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

const accessoriesList = ["🎩", "👓", "🎀", "🎸", "🎈", "🦄"];
const backgrounds = ["bg1", "bg2", "bg3"]; 

const PetList = ({ token, refreshTrigger, isAdmin }) => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [randomAttributes, setRandomAttributes] = useState({});

    const getPets = useCallback(async () => {
        if (!token) {
            console.error("🚨 No token found!");
            return;
        }

        try {
            const petsData = isAdmin ? await fetchAllPets(token) : await fetchUserPets(token);

            if (Array.isArray(petsData)) {
                setPets(petsData); 
            } else {
                console.warn("⚠️ Pets data is empty or not an array:", petsData);
            }
        } catch (error) {
            console.error("🚨 Error fetching pets:", error);
        }
    }, [token, isAdmin]);

    useEffect(() => {
        getPets();
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

    const randomizeAccessory = (petId) => {
        setRandomAttributes(prev => ({
            ...prev,
            [petId]: {
                ...prev[petId],
                accessory: accessoriesList[Math.floor(Math.random() * accessoriesList.length)]
            }
        }));
    };

    const randomizeBackground = (petId) => {
        setRandomAttributes(prev => ({
            ...prev,
            [petId]: {
                ...prev[petId],
                background: backgrounds[Math.floor(Math.random() * backgrounds.length)]
            }
        }));
    };

    const handleDeletePet = async (petId) => {
        const confirmed = window.confirm("Are you sure you want to delete this pet?");
        if (!confirmed) return;

        const success = isAdmin ? await adminDeletePet(petId, token) : await deletePet(petId, token);

        if (success) {
            setPets((prevPets) => prevPets.filter((pet) => pet.petId !== petId));
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
                    pets.map((pet) => {
                        const { accessory, background } = randomAttributes[pet.petId] || {};

                        return (
                            <div key={pet.petId} className={`pet-item ${background || ""}`}>
                                <button className="delete-icon" onClick={() => handleDeletePet(pet.petId)}>
                                    <FaTrash />
                                </button>

                                <img src={petImages[pet.color] || redPet} alt={pet.name} className="pet-image" />
                                
                                <h3>{pet.name.replace(/['"]+/g, '')} {accessory || ""}</h3>

                                <div className="energy-bar">
                                    <div className="energy-fill" style={{ width: `${pet.energy}%`, transition: "width 0.5s ease-in-out" }}></div>
                                </div>
                                <p>Energy: {pet.energy}%</p>

                                <div className="pet-actions">
                                    <button onClick={() => handleEnergyChange(pet.petId, "sleep")}>😴 Sleep</button>
                                    <button onClick={() => handleEnergyChange(pet.petId, "play")}>⚽ Play</button>
                                    <button onClick={() => handleEnergyChange(pet.petId, "feed")}>🍎 Feed</button>

                                    <button onClick={() => randomizeAccessory(pet.petId)}>🎭 Random Accessory</button>
                                    <button onClick={() => randomizeBackground(pet.petId)}>🎨 Random Background</button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default PetList;