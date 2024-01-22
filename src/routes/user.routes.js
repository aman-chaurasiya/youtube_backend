import { Router } from "express";
import {
  logOutUser,
  loginUser,
  refreshAccessToken,
  registerUser,
  getUserChannelProfile,
} from "../controllers/user.controller.js";
import { upload } from "./../middlewares/multer.middlewere.js";
import { verifyJWT } from "../middlewares/auth.middlewere.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secured routes

router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/Profile").post(getUserChannelProfile);

export default router;
