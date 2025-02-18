# 🐾 Virtual Pet Simulator 🏡

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Spring Boot](https://img.shields.io/badge/Backend-SpringBoot-green?logo=springboot)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-red?logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-yellow)

### 🌟 **A fun virtual pet game where users can feed, play, and customize their pets with accessories and backgrounds!**

---

## 🚀 Features
✔️ **User Authentication:** Secure login and token-based authentication (JWT).  
✔️ **Virtual Pets:** Create, manage, and interact with pets.  
✔️ **Energy System:** Feed, play, and rest to maintain pet energy.  
✔️ **Custom Accessories:** Add cool accessories like 🎩, 👓, or 🎀.  
✔️ **Dynamic Backgrounds:** Choose fun backgrounds for your pet.  
✔️ **Admin Panel:** Admin users can view and delete pets.

---

## 🛠 **Tech Stack**
- **Frontend:** React (with hooks, state management)
- **Backend:** Spring Boot (REST API)
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Icons & Styling:** React Icons, CSS

---

## 📦 **Installation Guide**
### 🔹 **1. Clone the Repository**
```sh
git clone https://github.com/shernandez334/your-repo-name.git
cd your-repo-name
```

### 🔹 **2. Backend Setup**
```sh
cd backend
mvn clean install
mvn spring-boot:run
```
The backend should now be running at **http://localhost:8080** 🚀

### 🔹 **3. Frontend Setup**
```sh
cd frontend
yarn install
yarn dev
```
The frontend should now be running at **http://localhost:3000** 🎨

---

## 🔗 **API Endpoints**

### 🛡️ **Authentication**
- `POST /login` → Logs in a user (returns JWT) 🔑
- `POST /register` → Registers a new user

### 🐾 **Pets**
- `POST /create` → Create a new pet
- `GET /pets` → Fetch user's pets
- `PATCH /pets/{petId}/energy` → Update pet energy (feed, play, sleep)
- `DELETE /pets/{petId}` → Delete a pet (only the owner or admin can delete it)

### 🛑 **Admin**
- `GET /admin/pets` → Get all pets (Admin only)
- `DELETE /admin/pets/{petId}` → Delete any pet (Admin only)

---

## 🎨 **Frontend Customization (CSS Backgrounds & Accessories)**
Users can personalize their pets with **fun accessories** and **interactive backgrounds**!

### 🎩 **Accessories**
- 🎩 Hat
- 👓 Glasses
- 🎀 Bow

### 🎨 **Backgrounds**
Use CSS backgrounds to place pets in different environments:
```css
.background-1 {
    background-image: url('/assets/bg1.jpg');
}

.background-2 {
    background-image: url('/assets/bg2.jpg');
}

.background-3 {
    background-image: url('/assets/bg3.jpg');
}
```
Users can select a background from the UI, and it will apply only on the front-end.

---

## 🚀 **Future Improvements**
✅ Add more accessories and animations  
✅ Improve UI with better pet expressions  
🚀 Add leaderboards & social sharing

---

## 📜 **License**
This project is **MIT Licensed**.

---

## 🤝 **Contributing**
Feel free to **fork** this project, submit **pull requests**, or suggest new features! 🎉

---

## 🧑‍💻 **Author**
**Santiago Hernandez Beltran**  
GitHub: [@shernandez334](https://github.com/shernandez334)  
