import File from '../models/File';
import User from '../models/User';

class FileController {
  async store(req, res) {
    /**
     * req.file:
     * {
        "fieldname": "file",
        "originalname": "4.png",
        "encoding": "7bit",
        "mimetype": "image/png",
        "destination": "/home/tamura/projects/gostack/module02/tmp/uploads",
        "filename": "fca70eda13065e9ecf059b61d99f838b.png",
        "path": "/home/tamura/projects/gostack/module02/tmp/uploads/fca70eda13065e9ecf059b61d99f838b.png",
        "size": 27013
      }
     */
    // name / path: according to File's Model
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    // updating user
    await User.update({ avatar_id: file.id }, { where: { id: req.userId } });

    return res.json(file);
  }
}

export default new FileController();
