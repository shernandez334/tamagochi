const API_URL = "http://localhost:8080";

export const updatePetEnergy = async (petId, action) => {
    const token = localStorage.getItem("token");

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

export const fetchUserPets = async () => {
    const token = localStorage.getItem("token"); 

    console.log("🛡 Retrieved Token:", token); 

    if (!token) {
        console.error("🚨 No token found in localStorage!");
        return [];
    }

    try {
        const response = await fetch(`${API_URL}/pets`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json"
            }
        });

        console.log("📡 API Response Status:", response.status); // ✅ Debugging

        if (!response.ok) {
            throw new Error(`Failed to fetch pets (Status: ${response.status})`);
        }

        return await response.json();
    } catch (error) {
        console.error("🚨 Error fetching pets:", error);
        return [];
    }
};


export const fetchAllPets = async (token) => {
    console.log("🔑 Fetching ALL pets with token:", token);

    try {
        const response = await fetch("http://localhost:8080/admin/pets", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        console.log("📡 API Response Status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Failed to fetch pets:", errorText);
            throw new Error("Failed to fetch pets");
        }

        const data = await response.json();
        console.log("✅ All pets received from backend:", data); // Ensure this logs pet data

        return data;
    } catch (error) {
        console.error("🚨 Error fetching all pets:", error);
        return [];
    }
};



export const createPet = async (petName, token) => {
    try {
        const response = await fetch(`${API_URL}/create`, {  
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: petName })
        });

        if (!response.ok) throw new Error("Failed to create pet");
        return await response.text();  
    } catch (error) {
        console.error("Error creating pet:", error);
        return null;
    }
};

export const deletePet = async (petId, token) => {
    try {
        const response = await fetch(`http://localhost:8080/pets/${petId}`, {  
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Failed to delete pet");
        return true; 
    } catch (error) {
        console.error("Error deleting pet:", error);
        return false;
    }
};

export const adminDeletePet = async (petId, token) => {
    try {
        const response = await fetch(`http://localhost:8080/admin/pets/${petId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Failed to delete pet");
        return true;
    } catch (error) {
        console.error("Error deleting pet:", error);
        return false;
    }
};