/**
 * This middleware is responsible of authentication
 * such as protect routes for not logged users.
 *
 * The main knowledge is that we need the token the app send to the user.
 * This token is stored in the head of each request.
 *
 * For example, each request from user will pass 'Authorization' param in the head.
 * This 'Authorization' will have the token with 'Bearer ' before it:
 * Ex.: "Bearer v4vv3hv45g23j4h5h3g2h2h34g524g23g452345j235v2g354"
 *
 * Or, if we don't want to use the authentication in the head of request, ew can use
 * at "Auth" tab - we are using Insomnia - and select 'Bearer token', and we paste the token
 * at 'token' field. It's the same we declare in head.
 */

import jwt from 'jsonwebtoken';
// with promisify we will convert callback functions
// into promises functions
// jwt.verify uses callback. But we will convert it
// to use with async/await
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // if token is empty
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // taking off the word 'Bearer'
  const [, token] = authHeader.split(' ');

  try {
    // the command bellow will return informations of user
    // based on token decoded. Remember that, when the user logged in
    // the payload of generated token was ID.
    // the follow decoded object has ID and the expiration date (UNIX timestamp).
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id; // we will send this ID into called controller

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
