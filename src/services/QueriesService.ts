import QueriesRepository from "../repositories/QueriesRepository"
import { IFilterDate } from "../types/filters"

class QueriesService {
    queriesRepository: QueriesRepository
    constructor() {
        const queriesRepositoryInstance = new QueriesRepository()
        this.queriesRepository = queriesRepositoryInstance
    }

    fetchOrdersById = async (id: number) => await this.queriesRepository.fetchOrderById(id)
    fetchOrdersByDateRange = async (data: IFilterDate) => {
        data.initDate = new Date(data.initDate)
        data.endDate = new Date(data.endDate)
        return await this.queriesRepository.fetchOrderByDate(data)
    }

}
export default QueriesService