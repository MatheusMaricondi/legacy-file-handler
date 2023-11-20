import UploadService from "../services/upload.service"
import IFile from "../types/file"

class UploadController {
   onCreate = async (file: IFile) => {
         const uploadServiceInstance = new UploadService()
         const uploadResponse = await uploadServiceInstance.onCreate(file)
         return uploadResponse
   }
}

export default UploadController