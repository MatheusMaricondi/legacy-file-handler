import IClient from "../types"
import OrderService from "../services/order.service"

class OrdersController {
   fetchOrders = (): IClient[] => {
         const orderService = new OrderService()
         const ordersList = orderService.fetchOrders()
         return ordersList
   }
}

export default OrdersController