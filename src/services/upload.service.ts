import IFile from "../types/file"
const readClientFile = require('../helpers/file')

class UploadService {

    onCreate = (file: IFile) => {
        const openedFile = readClientFile(file)
        return openedFile
    }
}

export default UploadService