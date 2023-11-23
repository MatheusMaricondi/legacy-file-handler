import { IDiffAllList, IOrderList, IOrderProductList, IProductList, IUpdateOrder, IUpdateOrderProduct, IUserList } from "../types/client";

interface IDataRepository {
    insertData(data: IDiffAllList): Promise<any>;
}

export default IDataRepository