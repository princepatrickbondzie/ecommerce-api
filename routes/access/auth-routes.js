import express from 'express';
import validator from '../../middlewares/validator.js';
import schema from './schema.js';
import _ from 'lodash';
import { signUp, signin } from '../../controllers/access/auth-controller.js';

const router = express.Router();

router.post('/login', validator(schema.userCredential), signin);
router.post('/signup', validator(schema.signup), signUp);

export default router;