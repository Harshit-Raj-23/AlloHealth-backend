import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { 
    createAppointment, getAppointments, updateAppointment, deleteAppointment 
} from "../controllers/appointment.controller.js";

const router = Router();

router.route("/")
      .post(verifyJWT, createAppointment)
      .get(verifyJWT, getAppointments);

router.route("/:id")
      .put(verifyJWT, updateAppointment)
      .delete(verifyJWT, deleteAppointment);

export default router;
