import express from 'express';
// import { ProtectedRequest } from 'app-request';
import { AuthFailureError } from '../core/ApiError.js';
import Role from '../models/Role.js'
import asyncHandler from './asyncHandler.js';

const router = express.Router();

export default router.use(
    asyncHandler(async (req, res, next) => {
        if (!req.user || !req.user.roles || !req.currentRoleCode)
            throw new Error('Permission denied');

        const role = await Role.findOne({ code: req.currentRoleCode }).lean().exec();

        if (!role)
            throw new Error('Permission denied')

        if (role === null || role._id === undefined)
            throw new Error('Role must be defined');

        const validRoles = req.user.roles.filter(
            (userRole) => userRole._id.toHexString() === role._id.toHexString(),
        );

        if (!validRoles || validRoles.length == 0)
            throw new Error('Permission denied - The user is not ' + role.code);

        return next();
    })
)