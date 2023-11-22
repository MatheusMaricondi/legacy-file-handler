import IDataRepository from "../repositories/IDataRepository";
import { IDiffAllList } from "../types/client";


class InsertService {
    constructor(private insertRepository: IDataRepository) {}

    async execute(data: IDiffAllList) {
        this.insertRepository.createUser(data.userList)
        this.insertRepository.createOrder(data.orderList)
        this.insertRepository.createProduct(data.productList)
        this.insertRepository.createOrderProduct(data.orderProductList)
        this.insertRepository.updateOrder(data.updateList.updateOrder)
        this.insertRepository.updateOrderProduct(data.updateList.updateOrderProduct)
    }
}

export default InsertService