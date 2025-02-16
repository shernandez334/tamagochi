const API_URL = "http://localhost:8080"; 

export const updatePetEnergy = async (petId, change) => {
    const token = localStorage.getItem("authToken");

    await fetch(`http://localhost:8080/pets/${petId}/energy`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ change })
    });
};

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

// 🔹 Function to create a new pet
export const createPet = async (petName, token) => {
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(petName)
        });

        if (!response.ok) throw new Error("Failed to create pet");
        return await response.json();
    } catch (error) {
        console.error("Error creating pet:", error);
        return null;
    }
};