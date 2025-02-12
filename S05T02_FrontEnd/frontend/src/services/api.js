const API_URL = "http://localhost:8080"; // Your backend URL

// 🔹 Function to fetch user's pets
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