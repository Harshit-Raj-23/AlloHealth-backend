import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config({
    path: "./.env",
});

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        credentials: true,
    })
);

app.use(
    express.json({
        limit: "16kb",
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);

app.use(express.static("public"));

app.use(cookieParser());

// route import
import userRoute from "./routes/user.routes.js";
import doctorRoute from "./routes/doctor.routes.js";
import patientRoute from "./routes/patient.routes.js";
import appointmentRoute from "./routes/appointment.routes.js";
import queueRoute from "./routes/queue.routes.js";

// routes declaration
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/patients", patientRoute);
app.use("/api/v1/appointments", appointmentRoute);
app.use("/api/v1/queue", queueRoute);

export default app;
