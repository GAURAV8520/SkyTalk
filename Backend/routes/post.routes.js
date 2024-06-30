import express from 'express';
import { portectRoute } from '../middleware/portectRoute.js';
import {createPost,deletePost,commmentOnPost} from '../controllers/post.controller.js'

const router=express.Router();

router.post("/create",portectRoute,createPost)
router.delete("/:id",portectRoute,deletePost)
// router.post('/like',portectRoute,likeUnlikePost)
router.post("/comment/:id",portectRoute,commmentOnPost)


export default router;

