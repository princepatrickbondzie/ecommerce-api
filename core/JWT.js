import path from 'path';
import { readFile } from 'fs';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { InternalError, BadTokenError, TokenExpiredError } from './ApiError.js';

const { sign, verify } = jwt;
const __dirname = path.resolve();
/*
 * issuer 		— Software organization who issues the token.
 * subject 		— Intended user of the token.
 * audience 	— Basically identity of the intended recipient of the token.
 * expiresIn	— Expiration time after which the token will be invalid.
 * algorithm 	— Encryption algorithm to be used to protect the token.
 */

export default class JWT {
  static readPublicKey() {
    return promisify(readFile)(path.join(__dirname, './keys/public.pem'), 'utf8');
  }

  static readPrivateKey() {
    return promisify(readFile)(path.join(__dirname, './keys/private.pem'), 'utf8');
  }

  static async encode(payload) {
    const cert = await this.readPrivateKey();
    if (!cert)
      throw new Error('Token generation failure');
    // @ts-ignore
    return promisify(sign)({ ...payload }, cert, { algorithm: 'RS256' });
  }

  /**
   * This method checks the token and returns the decoded data when token is valid in all respect
   */
  static async validate(token) {
    const cert = await this.readPublicKey();
    try {
      // @ts-ignore
      return (await promisify(verify)(token, cert));
    } catch (e) {
      // @ts-ignore
      if (e && e.name === 'TokenExpiredError')
        throw new Error('Token is expired');
      // throws error if the token has not been encrypted by the private key
      throw new Error('Token is not valid');
    }
  }

  /**
   * Returns the decoded payload if the signature is valid even if it is expired
   */
  static async decode(token) {
    const cert = await this.readPublicKey();
    try {
      // @ts-ignore
      return (await promisify(verify)(token, cert, { ignoreExpiration: true }));
    } catch (e) {
      throw new Error('Token is not valid');
    }
  }
}

export class JwtPayload {
  aud;
  sub;
  iss;
  iat;
  exp;

  constructor(issuer, audience, subject, validity) {
    this.iss = issuer;
    this.aud = audience;
    this.sub = subject;
    this.iat = Math.floor(Date.now() / 1000);
    this.exp = this.iat + validity * 24 * 60 * 60;
  }
}
