type IAllList = {
    userList: IUserList[]
    orderList: IOrderList[]
    productList: IProductList[]
    orderProductList: IOrderProductList[]
}
type IDiffAllList = {
    userList: IUserList[]
    orderList: IOrderList[]
    productList: IProductList[]
    orderProductList: IOrderProductList[]
    updateList: IUpdate
}
type IUserList = {
    id: number
    name: string
}
type IOrderList = {
    id: number
    date: Date
    total: string
    user_id: number
}
type IProductList = {
    id: number
}
type IOrderProductList = {
    value: string
    order_id: number
    product_id: number
}

type IUpdate = {
    updateOrder: IUpdateOrder[]
    updateOrderProduct: IUpdateOrderProduct[]
}

type IUpdateOrder = {
    id: number
    total: string
}

type IUpdateOrderProduct = {
    order_id: number
    product_id: number
    value: string
}

export { 
    IAllList, 
    IDiffAllList,
    IUserList, 
    IOrderList,
    IProductList,
    IOrderProductList,
    IUpdate
}







