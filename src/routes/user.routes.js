import { Router } from "express";
import {
  loginUser,
  loggedInUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(loginUser);

// secured routes
router.route("/me").get(verifyJWT, loggedInUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
