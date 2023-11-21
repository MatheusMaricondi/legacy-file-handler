import { Prisma } from "@prisma/client";
import prisma from "../services/prisma.service";
import { IFilterDate } from "../types/filters";

class QueriesRepository {
    async fetchOrderById(_id: number) {
        return await prisma.order.findMany({
            where: {id: _id},
            select: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        order: {
                            where: {id:_id},
                            select: {
                                id: true,
                                total: true,
                                date: true,
                                products: {
                                    where: {
                                        order_id: _id
                                    },
                                    select: {
                                        product_id: true,
                                        value: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }

    async fetchOrderByDate(data: IFilterDate) {
        const { initDate, endDate, order } = data

        return await prisma.order.findMany({
            where: {
                AND: [{date: {gte: initDate}},{date: {lte: endDate}}]
            },
            select: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        order: {
                            select: {
                                id: true,
                                total: true,
                                date: true,
                                products: {
                                    select: {
                                        product_id: true,
                                        value: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                date: order
            } as any
        })
       
    }
}   

export default QueriesRepository