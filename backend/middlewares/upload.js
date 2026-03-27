const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import the file system module

// Define the destination directory for uploads
// Updated to use the shared public directory at the project root
const uploadDir = path.join(__dirname, '../../../public/uploads/images');

// Create the upload directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Multer destination callback called.');
        console.log('Attempting to save file to:', uploadDir);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const generatedFilename = file.fieldname + '-' + uniqueSuffix + fileExtension;
        console.log('Multer filename callback called. Generated filename:', generatedFilename);
        cb(null, generatedFilename);
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = upload;
