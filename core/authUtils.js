import { Types } from 'mongoose';
import JWT, { JwtPayload } from './JWT.js';
// import { AuthFailureError, InternalError } from './ApiError.js';
import * as dotenv from 'dotenv';
dotenv.config();

export const tokenInfo = {
  accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS || '0'),
  refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_DAYS || '0'),
  issuer: process.env.TOKEN_ISSUER || '',
  audience: process.env.TOKEN_AUDIENCE || '',
};

export const getAccessToken = (authorization) => {
  if (!authorization) throw new Error('Invalid Authorization');
  if (!authorization.startsWith('Bearer '))
    throw new Error('Invalid Authorization');

  return authorization.split(' ')[1];
};

export const validateTokenData = (payload) => {
  console.log(payload);
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    payload.iss !== process.env.TOKEN_ISSUER ||
    payload.aud !== process.env.TOKEN_AUDIENCE ||
    !Types.ObjectId.isValid(payload.sub)
  )
    throw new Error('Invalid Access Token');

  return true;
};

export const createTokens = async (user) => {
  try {
    const accessToken = await JWT.encode(
      new JwtPayload(
        process.env.TOKEN_ISSUER || '',
        process.env.TOKEN_AUDIENCE || '',
        user._id.toString(),
        parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS || '0'),
      ),
    );

    if (!accessToken)
      throw new Error('Access token not created.');

    const refreshToken = await JWT.encode(
      new JwtPayload(
        process.env.TOKEN_ISSUER || '',
        process.env.TOKEN_AUDIENCE || '',
        user._id.toString(),
        process.env.TOKEN_AUDIENCE || '',
      ),
    );

    if (!refreshToken)
      throw new Error('Refresh token not created');

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (err) {
    throw new Error(err)
  }

};
