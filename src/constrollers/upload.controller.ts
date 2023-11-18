import UploadService from "../services/upload.service"

class UploadController {
   onCreate = async () => {
         const uploadServiceInstance = new UploadService()
         const uploadResponse = await uploadServiceInstance.onCreate()
         return uploadResponse
   }
}

export default UploadController