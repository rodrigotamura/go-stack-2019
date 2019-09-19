import * as Yup from 'yup'; // importing validator
import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    // validation - schema preparation
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    // validation - checking
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // checking if email exists in DB
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // creating on DB
    const { id, name, email, provider } = await User.create(req.body);

    // returning only relevant fields
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    // validation - schema preparation
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      // 'password' field will be required when oldPassword is given
      // if oldPassword is not given 'password' will not be required
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      // confirmPassword must be equals (oneOf) to password field (Yup.ref('password'))
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    // validation - checking
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    // instantiating user by ID
    // This ID was got in middlewares/auth.js
    const user = await User.findByPk(req.userId);

    // we need ckeck if email will not repeat with another user
    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    // we will check if oldPAssword is the same of its password
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // updating user
    await user.update(req.body);

    // getting user infos and updated avatar
    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new UserController();
