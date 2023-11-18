import IFile from "../types/file"
import UploadService from "../services/upload.service"

class UploadController {
   onCreate = (file: IFile) => {
         const uploadServiceInstance = new UploadService()
         const uploadResponse = uploadServiceInstance.onCreate(file)
         return uploadResponse
   }
}

export default UploadController