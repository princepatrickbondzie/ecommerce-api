import express from "express";
import authorization from "../../middlewares/authorization.js";
import authentication from "../../middlewares/authentication.js";
import { upload } from '../../utils/multer.js';
import { uploadImages } from '../../controllers/uploads/uploadController.js'

const router = express.Router();

router.post('/media', upload.array('image'), uploadImages)

export default router;