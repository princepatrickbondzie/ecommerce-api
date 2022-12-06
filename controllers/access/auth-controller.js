import bcrypt from 'bcrypt';
import _ from 'lodash';
import { AuthFailureError, BadRequestError } from "../../core/ApiError.js";
import { SuccessResponse } from "../../core/ApiResponse.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
// import UserRepo from '../../repository/UserRepo.js';
import { createTokens } from '../../core/authUtils.js';
import { RoleCode } from '../../common/enums.js';
import User from '../../models/User.js';
import Role from '../../models/Role.js';
import { randomGenerator } from '../../common/auth.js';

const signin = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email, active: true })
        .select('+email +password +roles')
        .populate({
            path: 'roles',
            select: '+code +status -_id'
        }).populate({ path: 'address' }).lean().exec();
    // .populate({ path: 'orders' })

    if (!user)
        throw new Error('User not registered')

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
        throw new Error('Authentication failure')

    const tokens = await createTokens(user);

    res.status(200).json({
        message: 'Login Successful',
        user: _.pick(user, ['_id', 'firstName', 'lastName', 'contact', 'dateOfBirth', 'roles', 'address']),
        tokens: tokens
    });

    // new SuccessResponse('Login Success', {
    //     user: _.pick(user, ['_id', 'firstName', 'lastName', 'contact', 'dateOfBirth', 'roles', 'address']),
    //     tokens: tokens
    // }).send(res);
});

const signUp = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user)
        throw new Error('User already registered');

    const userContact = await User.findOne({ contact: req.body.contact })
    if (userContact)
        throw new Error('User already registered')

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const role = await Role.findOne({ code: RoleCode.USER });
    // console.log(role)
    const createdUser = await User.create({
        clientId: randomGenerator(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contact: req.body.contact,
        dateOfBirth: req.body.dateOfBirth,
        password: passwordHash,
        roles: [role._id]
    });
    // console.log(createdUser)
    const tokens = await createTokens(createdUser);

    res.status(200).json({
        message: 'Signup Successful',
        user: _.pick(createdUser, ['_id', 'firstName', 'lastName', 'email', 'contact', 'dateOfBirth', 'roles', 'address']),
        tokens: tokens
    });

    // new SuccessResponse('Signup Successful', {
    //     user: _.pick(createdUser, ['_id', 'firstName', 'lastName', 'email', 'contact', 'dateOfBirth', 'roles', 'address']),
    //     tokens: tokens
    // }).send(res);
});

export { signin, signUp };