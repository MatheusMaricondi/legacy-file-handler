import prisma from "../services/prisma.service";
import { IDiffAllList } from "../types/client";

    const insertRepository = async (data: IDiffAllList) => {
        try {
            const { userList,orderList,productList,orderProductList,updateList } = data
            let response
            if(userList.length > 0) {
                response = await prisma.user.createMany({
                    data: userList
                })

            }
            if(orderList.length > 0) {
                await prisma.order.createMany({
                    data: orderList
                })
            }
            if(productList.length > 0) {
                await prisma.product.createMany({
                    data: productList
                })
            }
            if(orderProductList.length > 0) {
                await prisma.orderProduct.createMany({
                    data: orderProductList
                })
            }

            if(updateList.updateOrder.length > 0) {
                for(let order of updateList.updateOrder) {
                await prisma.order.update({
                        data: {
                            total: order.total
                        },
                        where: {id: order.id}
                    })
                }
            }

            if(updateList.updateOrderProduct.length > 0) {
                for(let orderProd of updateList.updateOrderProduct) {
                    const orderProductData = await prisma.orderProduct.findFirst({
                        where: {AND: [{order_id: orderProd.order_id},{product_id: orderProd.product_id}]}
                    })
                    const resp = await prisma.orderProduct.update({
                        data: {
                            value: orderProd.value
                        },
                        where: {id: orderProductData?.id}
                    })
                }
            }
            console.log('✔️ Insertions database finished')
        }catch(err) {
            throw err
        }
    }
        


    module.exports = insertRepository
