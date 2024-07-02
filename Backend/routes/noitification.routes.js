import express from 'express';
import { portectRoute } from '../middleware/portectRoute.js';
import {getNotifications,deleteNotifications} from '../controllers/notification.controller.js'


const router = express.Router();

router.get("/",portectRoute,getNotifications);
router.delete("/",portectRoute,deleteNotifications);
// router.delete("/:id",portectRoute,deleteSingleNotification);


export default router;