import { Router } from "express";
import {
  logOutUser,
  loginUser,
  refreshAccessToken,
  registerUser,
  getUserChannelProfile,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  UpdateUserAvatar,
  UpdateUserCoverImage,
  getWatchHistory,
  deleteimageFromCloudinary,
  // getusernameParams,
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

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/update-account").patch(verifyJWT, updateAccountDetails);

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), UpdateUserAvatar);

router
  .route("/cover-imge")
  .patch(verifyJWT, upload.single("coverImage"), UpdateUserCoverImage);

router.route("/c/:username").get(verifyJWT, getUserChannelProfile);

router.route("/history").get(verifyJWT, getWatchHistory);

router.route("/delete").post(verifyJWT, deleteimageFromCloudinary);
export default router;
