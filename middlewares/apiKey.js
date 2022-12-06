import express from 'express';
import asyncHandler from './asyncHandler.js';
import validator from './validator.js';
// import ApiKeyRepo from '../database/repository/ApiKeyRepo.js';
import schema from './schema.js';
import ApiKey from '../models/ApiKey.js'
// import { PublicRequest } from 'app-request';
import { ForbiddenError } from '../core/ApiError.js';
import { ValidationSource } from '../common/enums.js';


const router = express.Router();

export default router.use(
    validator(schema.apiKey, ValidationSource.HEADER),
    asyncHandler(async (req, res, next) => {
        // @ts-ignore
        req.apiKey = req.headers['x-api-key'].toString();

        const apikey = await ApiKey.findByKey(req.apiKey);

        if (!apikey) throw new Error('Permission denied');

        return next();
    })
)