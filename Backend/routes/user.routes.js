import express from 'express';
import { portectRoute } from '../middleware/portectRoute.js';
import {getUserProfile,followUnfollowUser,getSuggestedUsers} from '../controllers/user.controller.js'

const router = express.Router();

router.get("/profile/:username",portectRoute,getUserProfile)
router.get("/suggested",portectRoute,getSuggestedUsers)
router.get("/follow/:id",portectRoute,followUnfollowUser)
// router.get("/update",portectRoute,updateUserProfile)


export default  router;