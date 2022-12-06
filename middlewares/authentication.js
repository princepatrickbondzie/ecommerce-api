import express from 'express';
import User from '../models/User.js'
import JWT from '../core/JWT.js';
import asyncHandler from './asyncHandler.js';
import validator from './validator.js';
import { getAccessToken, validateTokenData } from '../core/authUtils.js';
import schema from './schema.js';
import { Types } from 'mongoose';
import { AccessTokenError, AuthFailureError, TokenExpiredError } from '../core/ApiError.js';
import { ValidationSource } from '../common/enums.js';

const router = express.Router();

export default router.use(
    validator(schema.auth, ValidationSource.HEADER),
    asyncHandler(async (req, res, next) => {
        req.accessToken = getAccessToken(req.headers.authorization);

        try {
            const payload = await JWT.validate(req.accessToken);
            validateTokenData(payload);

            const user = await User.findOne({ _id: new Types.ObjectId(payload.sub) })
            if (!user)
                throw new Error('User not registered');

            req.user = user;

            return next();
        }
        catch (e) {
            if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
            throw e;
        }

    }))