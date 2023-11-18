const readUploadedData = require('../helpers/file')
import IClient from "../types/client"
import User from "../repositories/user.repositorie"

class UploadService {

    onCreate = async () => {
        const jsonFile: IClient[] = await readUploadedData()
        const userInstance = new User()
        userInstance.createUser(jsonFile)

    }
}

export default UploadService