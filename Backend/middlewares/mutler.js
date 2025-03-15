import multer from "multer";

// Configure storage
const storage = multer.memoryStorage();

// File filter to validate file types
const fileFilter = (req, file, cb) => {
  // Accept images and PDF files
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
    return cb(new Error('Only image files and PDFs are allowed!'), false);
  }
  cb(null, true);
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: fileFilter
});

// Middleware with error handling
export const singleUpload = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          message: 'File size too large. Max size is 5MB',
          success: false
        });
      }
      return res.status(400).json({
        message: err.message,
        success: false
      });
    } else if (err) {
      // An unknown error occurred
      return res.status(400).json({
        message: err.message,
        success: false
      });
    }
    
    // Everything went fine
    next();
  });
};