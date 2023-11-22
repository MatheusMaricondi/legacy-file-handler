const readline = require('readline');
import fs from 'fs'
import { IAllList, IDiffAllList, IOrderList, IOrderProductList, IProductList, IUserList } from '../types/client';
import { updateCacheUser, getCacheUser } from '../services/update-cache.service'
import userJsonCache from '../../user-cache/userList.json'

import { join } from 'node:path'
import IFile from '../types/file';

const readUploadedData = async (file: IFile) => {
    try {
        const path = join(__dirname, '../', '../', file.path);
        let userTotalList = await getCacheUser()
        const response = await convertFileToJson(path, userTotalList)
        return response
    } catch (err) {
        throw err
    } 
}

const convertFileToJson = async (path: string, userTotalList: any ) => {
    return new Promise((resolve, reject) => {
        try {
            const userDiffList: IDiffAllList = {
                orderList: [],
                orderProductList: [],
                productList: [],
                userList: [],
                updateList: {
                    updateOrderProduct: [],
                    updateOrder: []
                }
            }
            // let userTotalList: any = {
            //     "orderList": [ ],
            //     "orderProductList": [],
            //     "productList": [],
            //     "userList": []
            // }

                

                const stream = fs.createReadStream(path);
                stream.on('error', (err) => {
                   reject(err)
                });
                const reader = readline.createInterface({
                    input: stream
                });
            
                reader.on('line', async (user: String) => {
                    lineToJson(user, userTotalList, userDiffList)
                });
                
                reader.on('close', async () => {
                    await updateCacheUser(userTotalList)
                    resolve(userDiffList) 
                });
            }catch(err) {
                reject(err)
            }
        })
    
  
}

const lineToJson = (line: String, allUserCache: IAllList, userDiffList: IDiffAllList) => {
    const user_id = parseInt(line.substring(0, 10)) 
    const name = line.substring(10, 55).trim() 
    const order_id = parseInt(line.substring(55, 65))
    const product_id = parseInt(line.substring(65, 75))
    const value = line.substring(75, 87).trim()
    const unFormattedDate = line.substring(87, 95)
    const date = new Date(`${unFormattedDate.substring(0, 4)}-${unFormattedDate.substring(4, 6)}-${unFormattedDate.substring(6, 8)}`)
    
    const userExist = allUserCache.userList.some((user: IUserList) => user.id == user_id);
    const orderExist = allUserCache.orderList.find((order: IOrderList) => order.id == order_id);
    const productExist = allUserCache.productList.some((product: IProductList) => product.id == product_id);
    const orderProductExist = allUserCache.orderProductList.find((ordProd: IOrderProductList) => (ordProd.order_id == order_id && ordProd.product_id == product_id));

    if (!orderProductExist) { 
        allUserCache.orderProductList.push({order_id, product_id, value: value})
        userDiffList.orderProductList.push({order_id, product_id, value: value})
    }else {
        const newValue = (parseFloat(orderProductExist.value) + parseFloat(value)).toFixed(2)
        orderProductExist.value = newValue
        const updateOrderProductExist = userDiffList.updateList.updateOrderProduct.find(updateOrdProd => (updateOrdProd.order_id == orderProductExist.order_id) && (updateOrdProd.product_id == orderProductExist.product_id))
        if(updateOrderProductExist) updateOrderProductExist.value = newValue
        else userDiffList.updateList.updateOrderProduct.push({order_id: orderProductExist.order_id, product_id: orderProductExist.product_id, value: newValue})
    }
    if (!userExist) {
        allUserCache.userList.push({id: user_id, name})
        userDiffList.userList.push({id: user_id, name})
    }
    if (!orderExist) {
        allUserCache.orderList.push({id: order_id, date, user_id, total: value})
        userDiffList.orderList.push({id: order_id, date, user_id, total: value})
    }else {
        const newTotal = (parseFloat(orderExist.total) + parseFloat(value)).toFixed(2)
        orderExist.total = newTotal
        const updateOrderExist = userDiffList.updateList.updateOrder.find(updateOrder => updateOrder.id == orderExist.id)
        if(updateOrderExist) updateOrderExist.total = newTotal
        else userDiffList.updateList.updateOrder.push({id: orderExist.id, total: newTotal})
        
    }
    if (!productExist) {
        allUserCache.productList.push({id: product_id})
        userDiffList.productList.push({id: product_id})
    }

}

module.exports = readUploadedData