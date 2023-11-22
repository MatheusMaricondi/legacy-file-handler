import multer from 'multer'
const fs = require('fs')
const path = require('node:path'); 


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uri = path.join(__dirname,'../','../','/temp-uploads')
      const fileExist = fs.existsSync(uri)
      if(!fileExist)
        fs.mkdirSync(uri)
      cb(null, 'temp-uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, 'data.txt');
    },
  });
  const upload = multer({ storage: storage });

  module.exports = upload