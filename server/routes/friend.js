import express from "express";
import authenticate from "../middleware/authenticate.js";
import { FriendReq, friends, sendFriendReq, getSendRequest, friendRequestConfirm, allFriends, removeFriend } from "../controllers/friendController.js";

const router = express.Router();

router.get('/', authenticate, friends);
router.get('/all', authenticate, allFriends);
router.get('/requests', authenticate, FriendReq);
router.delete('/remove/:id', authenticate, removeFriend);
router.get('/send-requests', authenticate, getSendRequest);
router.put('/confirm-request/:id', authenticate, friendRequestConfirm);
router.post('/send-request', authenticate, sendFriendReq);

export default router;