const readline = require('readline');
import fs from 'fs'
import { IAllList, IDiffAllList, IOrderList, IOrderProductList, IProductList, IUserList } from '../types/client';
import { updateDataCache, getDataCache } from '../services/UpdateCacheService'
import { join } from 'node:path'
import IFile from '../types/file';

const readUploadedData = async (file: IFile) => {
    try {
        const fileData = join(__dirname, '../', '../', file.path);
        let dataCache = await getDataCache()
        const response = await convertFileToJson(fileData, dataCache)
        return response
    } catch (err) {
        throw err
    } 
}

const convertFileToJson = async (fileData: string, dataCache: any ) => {
    return new Promise((resolve, reject) => {
        try {
            const dataDiffList: IDiffAllList = {
                orderList: [],
                orderProductList: [],
                productList: [],
                userList: [],
                updateList: {
                    updateOrderProduct: [],
                    updateOrder: []
                }
            }
                const stream = fs.createReadStream(fileData);
                stream.on('error', (err) => {
                   reject(err)
                });
                const reader = readline.createInterface({
                    input: stream
                });
            
                reader.on('line', async (eachOrder: String) => {
                    compareCacheFile(eachOrder, dataCache, dataDiffList)
                });
                
                reader.on('close', async () => {
                    await updateDataCache(dataCache)
                    resolve(dataDiffList) 
                });
            }catch(err) {
                reject(err)
            }
        })
    
  
}

const compareCacheFile = (lineOrder: String, dataCache: IAllList, dataDiffList: IDiffAllList) => {
    const user_id = parseInt(lineOrder.substring(0, 10)) 
    const name = lineOrder.substring(10, 55).trim() 
    const order_id = parseInt(lineOrder.substring(55, 65))
    const product_id = parseInt(lineOrder.substring(65, 75))
    const value = lineOrder.substring(75, 87).trim()
    const unFormattedDate = lineOrder.substring(87, 95)
    const date = new Date(`${unFormattedDate.substring(0, 4)}-${unFormattedDate.substring(4, 6)}-${unFormattedDate.substring(6, 8)}`)
    
    const userExist = dataCache.userList.some((user: IUserList) => user.id == user_id);
    const orderExist = dataCache.orderList.find((order: IOrderList) => order.id == order_id);
    const productExist = dataCache.productList.some((product: IProductList) => product.id == product_id);
    const orderProductExist = dataCache.orderProductList.find((ordProd: IOrderProductList) => (ordProd.order_id == order_id && ordProd.product_id == product_id));

    if (!orderProductExist) { 
        dataCache.orderProductList.push({order_id, product_id, value: value})
        dataDiffList.orderProductList.push({order_id, product_id, value: value})
    }else {
        const newValue = (parseFloat(orderProductExist.value) + parseFloat(value)).toFixed(2)
        orderProductExist.value = newValue
        const updateOrderProductExist = dataDiffList.updateList.updateOrderProduct.find(updateOrdProd => (updateOrdProd.order_id == orderProductExist.order_id) && (updateOrdProd.product_id == orderProductExist.product_id))
        if(updateOrderProductExist) updateOrderProductExist.value = newValue
        else dataDiffList.updateList.updateOrderProduct.push({order_id: orderProductExist.order_id, product_id: orderProductExist.product_id, value: newValue})
    }
    if (!userExist) {
        dataCache.userList.push({id: user_id, name})
        dataDiffList.userList.push({id: user_id, name})
    }
    if (!orderExist) {
        dataCache.orderList.push({id: order_id, date, user_id, total: value})
        dataDiffList.orderList.push({id: order_id, date, user_id, total: value})
    }else {
        const newTotal = (parseFloat(orderExist.total) + parseFloat(value)).toFixed(2)
        orderExist.total = newTotal
        const updateOrderExist = dataDiffList.updateList.updateOrder.find(updateOrder => updateOrder.id == orderExist.id)
        if(updateOrderExist) updateOrderExist.total = newTotal
        else dataDiffList.updateList.updateOrder.push({id: orderExist.id, total: newTotal})
        
    }
    if (!productExist) {
        dataCache.productList.push({id: product_id})
        dataDiffList.productList.push({id: product_id})
    }

}

module.exports = readUploadedData