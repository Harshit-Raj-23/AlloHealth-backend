import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { 
    createPatient, getPatients, getPatientById, updatePatient, deletePatient 
} from "../controllers/patient.controller.js";

const router = Router();

router.route("/")
      .post(verifyJWT, createPatient)
      .get(verifyJWT, getPatients);

router.route("/:id")
      .get(verifyJWT, getPatientById)
      .put(verifyJWT, updatePatient)
      .delete(verifyJWT, deletePatient);

export default router;
