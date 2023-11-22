import IDataRepository from "../repositories/IDataRepository";
import { IDiffAllList } from "../types/client";


class InsertService {
    constructor(private insertRepository: IDataRepository) {}

    async execute(data: IDiffAllList) {
        await this.insertRepository.createUser(data.userList)
        await this.insertRepository.createOrder(data.orderList)
        await this.insertRepository.createProduct(data.productList)
        await this.insertRepository.createOrderProduct(data.orderProductList)
        await this.insertRepository.updateOrder(data.updateList.updateOrder)
        await this.insertRepository.updateOrderProduct(data.updateList.updateOrderProduct)
    }
}

export default InsertService