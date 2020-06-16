import multer from 'multer';
import path from 'path';
import cryto from 'crypto'   // Lib para gerar hash aleatório.

// Configuração de upload

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback) {
            const hash = cryto.randomBytes(6).toString('hex');    // Hash de 6 bytes, em Hex
            const fileName = `${hash}-${file.originalname}`;

            callback(null, fileName);
        }
    }),
}