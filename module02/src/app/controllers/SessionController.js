import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';

import User from '../models/User';
import File from '../models/File';

class SessionController {
  async store(req, res) {
    // validating
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // it will sotre our session
    const { email, password } = req.body;

    // verifying if user exists
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // verifying password
    // this matter we will implement in User Model
    // because this is not a business rules

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Passsword does not match.' });
    }

    const { id, name, avatar, provider } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
        provider,
      },
      // inside sign() we will send:
      // 1st arg: the payload (some infos from User)
      // 2nd arg: it would be a unique string that we
      //          will use in while application
      //          (it's a secure phrase)
      //          we will access www.md5online.org to generate this key
      // 3rd arg: some param of token. Every token has an expiration date.
      //          Token without expiration is very UNSECURE!
      //
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
