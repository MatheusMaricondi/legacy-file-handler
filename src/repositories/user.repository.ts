import prisma from "../services/prisma.service";
import { IDiffAllList } from "../types/client";

class UserRepository {
    async createUser(userDataList: IDiffAllList) {
        const { userList, } = userDataList
        console.log(JSON.stringify(userDataList, null, 3))
       
        // const userPersistence = await prisma.user.createMany({
        //     data: [{
        //         id: 1,
        //         name: '222'
        //     }]
        // })
        // console.log(userPersistence)
        // await prisma.order.createMany({
        //     data: [{
        //         id: 12,
        //         date: '2023',
        //         total: '',
        //         user_id: 2
        //     }]
        // })
        // await prisma.product.createMany({
        //     data:[{
        //         id: 102
        //     }]
        // })
        // await prisma.orderProduct.createMany({
        //     data:[{
        //         value: '',
        //         order_id: 12,
        //         product_id: 102
        //     }]
        // })

        
              
    }
}

export default UserRepository