import express from 'express';
import {signup,login,logout,getMe} from '../controllers/auth.controller.js'
import {portectRoute} from '../middleware/portectRoute.js'

const router =express.Router();

router.get("/me",portectRoute,getMe)
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);



export default router; 
