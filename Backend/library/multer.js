import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const name = `${Date.now()}-${Math.round(Math.random() * 30)}.${ext}`;
    cb(null, name); 
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
