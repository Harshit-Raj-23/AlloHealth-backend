import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { addToQueue, getQueue, updateQueue } from "../controllers/queue.controller.js";

const router = Router();

router.route("/")
      .post(verifyJWT, addToQueue)
      .get(verifyJWT, getQueue);

router.route("/:id")
      .put(verifyJWT, updateQueue);

export default router;
