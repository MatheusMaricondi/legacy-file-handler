
type IOrder = {
    order_id: Number,
    total: String,
    date: String,
    products: IProduct[]
}

type IProduct = {
    product_id: Number,
    value: String
}

type IClient = {
    user_id: Number,
    name: String,
    orders: IOrder[]
}

export default IClient