const readUploadedData = require('../helpers/file')
import { IDiffAllList } from "../types/client"
import IFile from "../types/file"
const insertRepository = require("../repositories/insert.repository")

class UploadService {

    onCreate = async (file: IFile) => {
        try {
            const jsonFile: IDiffAllList = await readUploadedData(file)
            await insertRepository(jsonFile)
        }catch(err) {
            throw err
        }
    }
}

export default UploadService