import React, { useState } from "react";
import { createPet } from "../services/api"; 
import "../styles/petCreation.css";

const PetCreation = ({ token, refreshPets }) => {
    const [showModal, setShowModal] = useState(false);
    const [petName, setPetName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreatePet = async () => {
        if (!petName.trim()) return;

        setLoading(true);
        const success = await createPet(petName, token);

        if (success) {
            setPetName(""); 
            setShowModal(false); 
            refreshPets(); // ✅ Refresh the pet list instantly
        }

        setLoading(false);
    };

    return (
        <>
            <button className="add-pet-button" onClick={() => setShowModal(true)}>➕</button>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Create a New Pet</h2>
                        <input 
                            type="text" 
                            placeholder="Enter pet name..." 
                            value={petName} 
                            onChange={(e) => setPetName(e.target.value)}
                        />
                        <div className="modal-actions">
                            <button onClick={handleCreatePet} disabled={loading}>
                                {loading ? "Creating..." : "Create Pet"}
                            </button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PetCreation;