import QueriesService from "../services/QueriesService"
import { IFilterDate } from "../types/filters"

class QueriesController {
    serviceInstance: QueriesService
    constructor() {
        const queriesService = new QueriesService()
        this.serviceInstance = queriesService
    }
    getOrderById = async (id: number) => await this.serviceInstance.fetchOrdersById(id)
    getOrderByDate = async (data: IFilterDate) => await this.serviceInstance.fetchOrdersByDateRange(data)

}

export default QueriesController