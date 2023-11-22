import prisma from "../services/PrismaService";
import IDataRepository from "./IDataRepository";
import { IOrderList, IOrderProductList, IProductList, IUpdateOrder, IUpdateOrderProduct, IUserList } from "../types/client";

    class InsertRepository implements IDataRepository { 
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

    // async (data: IDiffAllList) => {
    //     try {
    //         const { userList,orderList,productList,orderProductList,updateList } = data
    //         let response
    //         if(userList.length > 0) {
    //             response = await prisma.user.createMany({
    //                 data: userList
    //             })

    //         }
    //         if(orderList.length > 0) {
    //             await prisma.order.createMany({
    //                 data: orderList
    //             })
    //         }
    //         if(productList.length > 0) {
    //             await prisma.product.createMany({
    //                 data: productList
    //             })
    //         }
    //         if(orderProductList.length > 0) {
    //             await prisma.orderProduct.createMany({
    //                 data: orderProductList
    //             })
    //         }

    //         if(updateList.updateOrder.length > 0) {
    //             for(let order of updateList.updateOrder) {
    //             await prisma.order.update({
    //                     data: {
    //                         total: order.total
    //                     },
    //                     where: {id: order.id}
    //                 })
    //             }
    //         }

    //         if(updateList.updateOrderProduct.length > 0) {
    //             for(let orderProd of updateList.updateOrderProduct) {
    //                 const orderProductData = await prisma.orderProduct.findFirst({
    //                     where: {AND: [{order_id: orderProd.order_id},{product_id: orderProd.product_id}]}
    //                 })
    //                 await prisma.orderProduct.update({
    //                     data: {
    //                         value: orderProd.value
    //                     },
    //                     where: {id: orderProductData?.id}
    //                 })
    //             }
    //         }

    //     console.log('✔️ Insertions database finished')
    //     }catch(err) {
    //         throw err
    //     }
    // }
}


    export default InsertRepository
