# 🏥 Allo Health - Front Desk System (Backend)

This is the backend service for the **Front Desk System** at a clinic.  
It allows front desk staff to manage patients, doctors, appointments, and queues.

---

## 🚀 Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT (Access + Refresh tokens)  
- **Utilities:** bcrypt, cookie-parser, cors, dotenv, multer  
- **Dev Tools:** Nodemon  

---

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/allohealth-backend.git
   cd allohealth-backend

2. **Install dependencies**
    ```bash
    npm install

3. **Environment Variables**
    ```env
    PORT=5000
    MONGODB_URI=your-mongodb-connection-uri
    NODE_ENV=development

    ACCESS_TOKEN_SECRET=your-access-token-secret
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=your-refresh-token-secret
    REFRESH_TOKEN_EXPIRY=7d

    CORS_ORIGIN=http://localhost:1234

4. **Run the server**
    ```bash
    npm run dev

The API will start at: http://localhost:5000/api/v1