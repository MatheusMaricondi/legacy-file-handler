import prisma from "../services/PrismaService";
import IDataRepository from "./IDataRepository";
import { IDiffAllList, IOrderList, IOrderProductList, IProductList, IUpdateOrder, IUpdateOrderProduct, IUserList } from "../types/client";

class InsertRepository implements IDataRepository { 

    async insertData(data: IDiffAllList): Promise<any> {
        await this.createUser(data.userList)
        await this.createOrder(data.orderList)
        await this.createProduct(data.productList)
        await this.createOrderProduct(data.orderProductList)
        await this.updateOrder(data.updateList.updateOrder)
        await this.updateOrderProduct(data.updateList.updateOrderProduct)
    }
    async createUser(user: IUserList[]): Promise<any> {
        if(user.length > 0) {
            await prisma.user.createMany({
                data: user
            })

        }
    }
    async createOrder(order: IOrderList[]): Promise<any> {
        if(order.length > 0) {
            await prisma.order.createMany({
                data: order
            })

        }
    }
    async createProduct(product: IProductList[]): Promise<any> {
        if(product.length > 0) {
            await prisma.product.createMany({
                data: product
            })

        }
    }
    async createOrderProduct(orderProduct: IOrderProductList[]): Promise<any> {
        if(orderProduct.length > 0) {
            await prisma.orderProduct.createMany({
                data: orderProduct
            })

        }
    }
    async updateOrder(updateOrder: IUpdateOrder[]): Promise<any> {
        if(updateOrder.length > 0) {
            for(let order of updateOrder) {
                await prisma.order.update({
                    data: {
                        total: order.total
                    },
                    where: {id: order.id}
                })
            }
        }
    }
    async updateOrderProduct(updateOrderProduct: IUpdateOrderProduct[]): Promise<any> {
        if(updateOrderProduct.length > 0) {
            for(let orderProduct of updateOrderProduct) {
                const orderProductData = await prisma.orderProduct.findFirst({
                    where: {AND: [{order_id: orderProduct.order_id},{product_id: orderProduct.product_id}]}
                })
                if(orderProductData) {
                    await prisma.orderProduct.update({
                        data: {
                            value: orderProduct.value
                        },
                        where: {id: orderProductData.id}
                    })
                }
            }
        }
    }
}


    export default InsertRepository
