import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { 
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor 
} from "../controllers/doctor.controller.js";

const router = Router();

router.route("/")
      .post(verifyJWT, createDoctor)
      .get(verifyJWT, getDoctors);

router.route("/:id")
      .get(verifyJWT, getDoctorById)
      .put(verifyJWT, updateDoctor)
      .delete(verifyJWT, deleteDoctor);

export default router;
