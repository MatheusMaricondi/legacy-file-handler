const readUploadedData = require('../helpers/file')
import { IDiffAllList } from "../types/client"
import IFile from "../types/file"

class UploadService {

    onCreate = async (file: IFile): Promise<IDiffAllList> => {
        try {
            const jsonFile: IDiffAllList = await readUploadedData(file)
            return jsonFile
        }catch(err) {
            throw err
        }
    }
}

export default UploadService