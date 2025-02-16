const API_URL = "http://localhost:8080";

// 🔹 Update pet energy
export const updatePetEnergy = async (petId, action) => {
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch(`${API_URL}/pets/${petId}/energy`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ action })
        });

        if (!response.ok) {
            throw new Error("Failed to update energy");
        }

        return await response.text();
    } catch (error) {
        console.error("Error updating energy:", error);
        return null;
    }
};

// 🔹 Fetch user pets
export const fetchUserPets = async (token) => {
    try {
        const response = await fetch(`${API_URL}/pets`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Failed to fetch pets");
        return await response.json();
    } catch (error) {
        console.error("Error fetching pets:", error);
        return [];
    }
};

// 🔹 Create a new pet
export const createPet = async (petName, token) => {
    try {
        const response = await fetch(`${API_URL}/create`, {  
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(petName)  // ✅ Send raw string instead of an object
        });

        if (!response.ok) throw new Error("Failed to create pet");
        return await response.text();  // ✅ Expect text response from backend
    } catch (error) {
        console.error("Error creating pet:", error);
        return null;
    }
};