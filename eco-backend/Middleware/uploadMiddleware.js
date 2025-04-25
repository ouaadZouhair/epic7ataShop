import fs from 'fs';
import path from 'path';
import multer from 'multer';

// Ensure the uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => { 
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploads = multer({ storage });

export const uploadMiddleware = (req, res, next) => {
    uploads.fields([
        { name: 'frontMockups', maxCount: 1 },
        { name: 'backMockups', maxCount: 1 }
    ])(req, res, (err) => {
        if (err) {
            return res.status(400).json({ msg: "Image upload failed", error: err.message });
        }
        next();
    });
};
