import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'temp-uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, 'data.txt');
    },
  });
  const upload = multer({ storage: storage });

  module.exports = upload