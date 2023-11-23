import IDataRepository from "../IDataRepository";
import { IDiffAllList, IOrderList, IOrderProductList, IProductList, IUpdateOrder, IUpdateOrderProduct, IUserList } from "../../types/client";

class InsertRepositoryMock implements IDataRepository { 
    databaseMock: IDiffAllList = {
        userList: [],
        orderList: [],
        productList: [],
        orderProductList: [],
        updateList: {
            updateOrder: [],
            updateOrderProduct: []
        }
    }

    async insertData(data: IDiffAllList): Promise<any> {
        this.createUser(data.userList)
        this.createOrder(data.orderList)
        this.createProduct(data.productList)
        this.createOrderProduct(data.orderProductList)
        this.updateOrder(data.updateList.updateOrder)
        this.updateOrderProduct(data.updateList.updateOrderProduct)

        return this.databaseMock
    }

    createUser(user: IUserList[]): any {
        if(user.length > 0) {
            user.forEach(it => {
                this.databaseMock.userList.push(it)
            });
        }
    }
    createOrder(order: IOrderList[]): any {
        if(order.length > 0) {
            order.forEach(it => {
                this.databaseMock.orderList.push(it)
            });
        }
    }
    createProduct(product: IProductList[]): any{
        if(product.length > 0) {
            product.forEach(it => {
                this.databaseMock.productList.push(it)
            });
        }
    }
    createOrderProduct(orderProduct: IOrderProductList[]): any {
        if(orderProduct.length > 0) {
            orderProduct.forEach(it => {
                this.databaseMock.orderProductList.push(it)
            });
        }
    }
    updateOrder(updateOrder: IUpdateOrder[]): any {
        if(updateOrder.length > 0) {
            for(let order of updateOrder) {
                this.databaseMock.updateList.updateOrder.push({ id: order.id, total: order.total })
            }
        }
    }
    updateOrderProduct(updateOrderProduct: IUpdateOrderProduct[]): any {
        if(updateOrderProduct.length > 0) {
            for(let orderProduct of updateOrderProduct) {
                const orderProductData = this.databaseMock.orderProductList.find(it => (it.order_id == orderProduct.order_id) && (it.product_id == orderProduct.product_id))
               
                if(orderProductData) {
                    this.databaseMock.updateList.updateOrderProduct.push({ order_id: orderProductData.order_id, product_id: orderProductData.product_id, value: orderProductData.value })
                }
            }
        }
    }
}


    export default InsertRepositoryMock
