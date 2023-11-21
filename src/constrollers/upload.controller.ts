import UploadService from "../services/upload.service"
import IFile from "../types/file"

class UploadController {
   onCreate = async (file: IFile) => {
      try {
            const uploadServiceInstance = new UploadService()
            uploadServiceInstance.onCreate(file)
      }catch(err) {
            throw err
      }
   }
}

export default UploadController