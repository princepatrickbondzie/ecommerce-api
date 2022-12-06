import express from 'express';
import schema from './schema.js';
import validator from '../../middlewares/validator.js';
import { token } from '../../controllers/access/token-controller.js';
import { ValidationSource } from '../../common/enums.js';

const router = express.Router();

router.post('/refresh', validator(schema.auth, ValidationSource.HEADER), validator(schema.refreshToken), token);

export default router;
