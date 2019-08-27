import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const provider = await User.findAll({
      where: { provider: true }, // only providers
      attributes: ['id', 'name', 'email', 'avatar_id'], // only these fields
      // We don't want only avatar_id, we want to receive details of this avatar,
      // that is in another table
      include: [
        {
          model: File,
          as: 'avatar', // naming to 'avatar', instead only 'File'
          attributes: ['name', 'path', 'url'], // only these values
          // it's very important to send to front-end the full URL
          // of this file. So we will go to Model File (go there for more details)
          // and create a VIRTUAL field called 'url'.
          // After this, if you try to click on generated url, you cannot see
          // any image. We need go to app.js (see there on line that mention express.static)
        },
      ],
    });

    return res.json(provider);
  }
}

export default new ProviderController();
