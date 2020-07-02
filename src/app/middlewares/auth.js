import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authconfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders)
    return res.status(401).json({ errors: 'Token not provider.' });

  const [, token] = authHeaders.split(' ');
  try {
    const decoded = await await promisify(jwt.verify)(token, authconfig.secret);
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid.' });
  }
};
