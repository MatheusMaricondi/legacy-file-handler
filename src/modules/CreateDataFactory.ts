import InsertRepository from '../repositories/InsertRepository'
import InsertService from '../services/InsertService'
import InsertController from '../constrollers/InsertController'

export const createInsertFactory = () => {
    const insertRepository = new InsertRepository()
    const createData = new InsertService(insertRepository)
    const createDataController = new InsertController(createData)

    return createDataController
}