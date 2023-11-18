type IOrder = {
    order_id: Number,
    total: string,
    date: string,
    products: IProduct[]
}

type IProduct = {
    product_id: Number,
    value: string
}

type IClient = {
    user_id: Number,
    name: string,
    orders: IOrder[]
}


export default IClient







