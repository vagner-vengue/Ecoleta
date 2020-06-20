import multer from 'multer';
import path from 'path';
import cryto from 'crypto'   // Lib to generate hash codes

// This contains settings for multer, defining how files should be updaloed.

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback) {
            const hash = cryto.randomBytes(6).toString('hex');    // Hash of 6 bytes, in Hex.
            const fileName = `${hash}-${file.originalname}`;

            callback(null, fileName);
        }
    }),
}
