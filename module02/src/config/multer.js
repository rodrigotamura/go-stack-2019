import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  // how does Multer will store our files
  // we can set a CDN, but we will use local storage
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // __dirname => current path (/src/config/)
    // '..' => file up (/src/)
    // '..' => file up (/)
    // 'tmp' => go to tmp folder (/tmp)
    // 'uploads' => go to uploads folder (/tmp/uploads)
    filename: (req, file, callback) => {
      // req: same req from traditional requests
      // file: come with file`s name, size, format, etc.
      // here we will set the file's name
      // generating unique code for name using crypto
      crypto.randomBytes(16, (err, res) => {
        if (err) return callback(err); // if error

        // if no error:
        // is null because is not an error (err, res)
        // res.toString('hex) is receiving the reult of crypto and converting to hexadecimal
        // and is concatenating with original file coming from user
        // extname (from path lib) will extract the extension
        // final result: u1u11u23uuu412u3.png
        return callback(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
