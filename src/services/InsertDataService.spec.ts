import InsertRepositoryMock from "../repositories/memory/InsertRepositoryMock"
import { IDiffAllList, IOrderList, IOrderProductList, IProductList, IUpdateOrder, IUpdateOrderProduct, IUserList } from "../types/client"
import InsertService from "./InsertService"

describe("Insert Order", () => {
    let insertRepository: InsertRepositoryMock
    let insertDataService: InsertService

    beforeAll(() => {
        insertRepository = new InsertRepositoryMock()
        insertDataService = new InsertService(insertRepository)
    })

    let dataMock: IDiffAllList = {
        userList: [],
        orderList: [],
        productList: [],
        orderProductList: [],
        updateList: {
            updateOrder: [],
            updateOrderProduct: []
        }
    }
    it("should be able to create a new user", async () => {  
        const newUser: IUserList = {
            id: 1,
            name: 'user mock test'
        }

        dataMock.userList.push(newUser)

        const response: IDiffAllList = await insertDataService.execute(dataMock)
        expect(response.userList[0].id).toBe(1)
    })
    it("should be able to create a new order", async () => {  
        const newOrder: IOrderList = {
            id: 10,
            date: new Date(),
            total: '100.00',
            user_id: 1
        }

        dataMock.orderList.push(newOrder)

        const response: IDiffAllList = await insertDataService.execute(dataMock)
        expect(response.orderList[0].id).toBe(10)
    })
    it("should be able to create a new product", async () => {  
        const newProduct: IProductList = {
            id: 100
        }

        dataMock.productList.push(newProduct)

        const response: IDiffAllList = await insertDataService.execute(dataMock)
        expect(response.productList[0].id).toBe(100)
    })
    it("should be able to create a new orderProduct", async () => {  
        const newOrderProduct: IOrderProductList = {
            order_id: 10,
            product_id: 100,
            value: '150.00'
        }

        dataMock.orderProductList.push(newOrderProduct)

        const response: IDiffAllList = await insertDataService.execute(dataMock)
        expect(response.orderProductList[0].order_id).toBe(10)
    })
    it("should be able to update a order", async () => {  
        const updateOrder: IUpdateOrder = {
            id: 10,
            total: '150.00'
        }

        dataMock.updateList.updateOrder.push(updateOrder)

        const response: IDiffAllList = await insertDataService.execute(dataMock)
        expect(response.updateList.updateOrder[0].total).toBe('150.00')
    })
    it("should be able to update a orderProduct", async () => {  
        const updateOrderProduct: IUpdateOrderProduct = {
           order_id: 10,
           product_id: 100,
           value: '150.00' 
        }

        dataMock.updateList.updateOrderProduct.push(updateOrderProduct)

        const response: IDiffAllList = await insertDataService.execute(dataMock)
        expect(response.updateList.updateOrderProduct[0].value).toBe('150.00')
    })
})