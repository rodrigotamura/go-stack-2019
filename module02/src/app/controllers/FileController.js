import File from '../models/File';

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

    return res.json(req.file);
  }
}

export default new FileController();
