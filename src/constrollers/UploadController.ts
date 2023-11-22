import UploadService from "../services/UploadService"
import { IDiffAllList } from "../types/client"
import IFile from "../types/file"

class UploadController {
   onCreate = async (file: IFile): Promise<IDiffAllList> => {
      try {
            const uploadServiceInstance = new UploadService()
            return uploadServiceInstance.onCreate(file)
      }catch(err) {
            throw {status: 500, error: {error: err}}
      }
   }
}

export default UploadController