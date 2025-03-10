import { saveMessage, getMessageById, saveImage, seenMessage, deliveredMessage, saveImageAndMsg } from "../controllers/messageController.js";
import authenticate from "../middleware/authenticate.js";
import express from "express";
import multerFileUpload from "../utils/fileupload.js";

const router = express.Router();
const upload = multerFileUpload('images');

router.get('/:id', authenticate, getMessageById);
router.post("/image", authenticate, upload.single('file'), saveImage);
router.post("/text-and-image", authenticate, upload.single('file'), saveImageAndMsg);
router.post('/message', authenticate, saveMessage);
router.put('/seen', seenMessage);
router.put("/delivered", deliveredMessage);

export default router;