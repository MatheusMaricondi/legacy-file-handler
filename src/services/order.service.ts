import IClient from "../types"

const list = [{
    "user_id": 1,
    "name": "Zarelli",
    "orders": [{
        "order_id": 123,
        "total": "1024.48",
        "date": "2021-12-01",
        "products": [{
            "product_id": 111,
            "value": "512.24"
        },
        {
            "product_id": 122,
            "value": "512.24"
        }]
    }]
}]
class OrderService {

    fetchOrders = (): IClient[] => {

        return list
    }
}

export default OrderService