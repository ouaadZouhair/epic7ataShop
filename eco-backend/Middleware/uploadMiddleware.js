import multer from 'multer';

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => { 
        cb(null, Date.now() + path.extname(file.originalname));
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
