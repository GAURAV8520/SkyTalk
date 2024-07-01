import express from 'express';
import { portectRoute } from '../middleware/portectRoute.js';
import {createPost,deletePost,commmentOnPost,likeUnlikePost,getAllPosts,getLikedPosts,getFollowingPosts,getUserPosts} from '../controllers/post.controller.js'

const router=express.Router();


router.get("/following",portectRoute,getFollowingPosts);
router.get("/likes/:id",portectRoute,getLikedPosts);
router.get("/all",portectRoute,getAllPosts);
router.post("/create",portectRoute,createPost)
router.get("/user/:username",portectRoute,getUserPosts)
router.delete("/:id",portectRoute,deletePost)
router.post('/like/:id',portectRoute,likeUnlikePost)
router.post("/comment/:id",portectRoute,commmentOnPost)


export default router;

