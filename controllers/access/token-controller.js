import { Types } from 'mongoose';
import _ from 'lodash';
import JWT from '../../core/JWT.js';
import { TokenRefreshResponse } from '../../core/ApiResponse.js';
import { AuthFailureError } from '../../core/ApiError.js';
// import UserRepo from '../../repository/UserRepo.js';
import asyncHandler from '../../middlewares/asyncHandler.js';
import User from '../../models/User.js';
import { validateTokenData, createTokens, getAccessToken } from '../../core/authUtils.js';

const token = asyncHandler(async (req, res) => {
    req.accessToken = getAccessToken(req.headers.authorization);

    const accessTokenPayload = await JWT.decode(req.accessToken);
    validateTokenData(accessTokenPayload);

    const user = await User.findOne({ _id: new Types.ObjectId(accessTokenPayload.sub), active: true }).populate({ path: 'roles' }).populate({ path: 'orders' }).populate({ path: 'address' }).lean().exec();
    if (!user)
        throw new AuthFailureError('User not registered');
    req.user = user;

    const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
    validateTokenData(refreshTokenPayload);

    if (accessTokenPayload.sub !== refreshTokenPayload.sub)
        throw new AuthFailureError('Invalid access token');

    const tokens = await createTokens(req.user);

    new TokenRefreshResponse('Token Issued', tokens.accessToken, tokens.refreshToken).send(res);
});

// const generateTokens = asyncHandler(async (req, res) => {
//     return await createTokens();
// })

export { token };
