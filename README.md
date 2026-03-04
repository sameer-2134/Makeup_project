# ✨ Aura Craft - Professional Makeup Artist Ledger

A premium, aesthetic administrative suite designed specifically for makeup artists to manage bookings, track revenue, and streamline client communication.

![Project Status](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/Frontend-React.js-blue)
![Firebase](https://img.shields.io/badge/Backend-Firebase-orange)

---

## 📸 Overview
**Aura Craft** helps artists like Bhumi transition from manual paper-based ledgers to a sophisticated digital dashboard. It focuses on minimalist design and maximum utility.

## 🚀 Key Features
* **The Aura Ledger:** A real-time database of all professional sessions with advanced search and status filtering (Paid/Pending).
* **Live Dashboard:** Visual overview of total revenue, pending payments, and upcoming session counts.
* **Persistent Authentication:** Secure admin login with session persistence—stay logged in even after browser restarts.
* **WhatsApp Integration:** Direct one-click confirmation messages to clients using the WhatsApp API.
* **Mobile First Design:** Fully responsive layout tailored for artists on the go.

## 🛠️ Tech Stack
* **Frontend:** React.js (Vite)
* **Database:** Google Firebase Firestore
* **Styling:** Modern CSS3 with Glassmorphism and premium Typography (Cinzel & Outfit)
* **Icons:** Emoji-based minimalist iconography

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/sameer-2134/Makeup_project.git](https://github.com/sameer-2134/Makeup_project.git)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Firebase Configuration:**
    Create a `src/firebase.jsx` and add your Firebase credentials:
    ```javascript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🤝 Contribution
Built with ❤️ for Bhumi's Artistry. 

---
Developed by [Sameer](https://github.com/sameer-2134)