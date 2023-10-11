import jwt from 'jsonwebtoken';

const { ADMIN_USERNAME, JWT_SECRET, NODE_ENV } = process.env;

export const generateToken = () => {
  const token = jwt.sign({ username: ADMIN_USERNAME }, JWT_SECRET, {
    expiresIn: '1d',
  });
  return token;
};

export const generateCookieOptions = () => {
  const maxAge = { maxAge: 1000 * 60 * 60 * 24 * 7 };
  const cors = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    domain: '.stlee.kr',
  };
  const options =
    NODE_ENV === 'production' ? { ...maxAge, ...cors } : { ...maxAge };
  return options;
};

export const jwtMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.locals.user = { username: decoded.username };

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const token = generateToken();
      res.cookie('access_token', token, generateCookieOptions());
    }
    return next();
  } catch (e) {
    return next();
  }
};
