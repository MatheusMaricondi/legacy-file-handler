import { IOrderList, IOrderProductList, IProductList, IUpdateOrder, IUpdateOrderProduct, IUserList } from "../types/client";

interface IDataRepository {
    createUser(data: IUserList[]): Promise<any>;
    createOrder(data: IOrderList[]): Promise<any>;
    createProduct(data: IProductList[]): Promise<any>;
    createOrderProduct(data: IOrderProductList[]): Promise<any>;
    updateOrder(data: IUpdateOrder[]): Promise<any>;
    updateOrderProduct(data: IUpdateOrderProduct[]): Promise<any>;
}

export default IDataRepository