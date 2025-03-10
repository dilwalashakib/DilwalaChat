import express from "express";
import authenticate from "../middleware/authenticate.js";
import { registerController, loginController, logoutController, profilePicUpdate, allUsers } from '../controllers/userController.js';
import multerFileUpload from "../utils/fileupload.js";

const router = express.Router();
const upload = multerFileUpload('profile');

router.get('/', authenticate, allUsers);
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', authenticate, logoutController);
router.put('/profile-image', authenticate, upload.single('file'), profilePicUpdate);
// router.delete("/", allUserRemove);

export default router;