import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { followUnfollowUser, getSuggestedUsers, getUserProfile, updateUser } from "../controllers/user.controllor.js";

const router = express.Router();

router.get("/profile/:username",protectRoute,getUserProfile );
router.get("/suggested",protectRoute, getSuggestedUsers);
router.get("/follow/:id",protectRoute, followUnfollowUser);
router.post("/update/:id",protectRoute, updateUser);

export default router;