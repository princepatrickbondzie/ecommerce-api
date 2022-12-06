import multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
        // cb(null, path.join(__dirname, '/uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + ' - ' + file.originalname)
    }
});

// const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        cb({ message: 'Unsupported file type' }, false)
    } else { cb(null, true) }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter,
})

export { upload }