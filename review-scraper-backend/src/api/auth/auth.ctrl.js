import Dotenv from 'dotenv';
Dotenv.config();
import Joi from 'joi';

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

/*
로그인
POST /api/auth/login
{
  "username": "test"
  "password": "password"
}
*/
export const login = (req, res) => {
  const { username, password } = req.body;

  // validation
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(401).json(result.error);
  }

  // admin 계정이 맞는지 확인
  if (username !== ADMIN_USERNAME) {
    return res.status(401).json({ error: 'worng username' });
  }

  // 패스워드 맞는지 확인
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'worng password' });
  }

  const session = req.session;
  session.logingInfo = { username };

  return res.send({ success: true });
};

export const logout = (req, res) => {
  const session = req.session;
  session.destroy((err) => {
    if (err) throw err;
    return res.redirect('/');
  });
};
