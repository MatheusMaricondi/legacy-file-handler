const readUploadedData = require('../helpers/file')
import { IDiffAllList } from "../types/client"
import IFile from "../types/file"
import User from "../repositories/user.repository"

class UploadService {

    onCreate = async (file: IFile) => {
        const jsonFile: IDiffAllList = await readUploadedData(file)
        const userRepositoryInstance = new User()
        await userRepositoryInstance.createUser(jsonFile)
        return jsonFile
    }
}

export default UploadService