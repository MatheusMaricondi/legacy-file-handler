import IFile from '../types/file'
import fs from 'fs'
const readline = require('readline');
import IClient from '../types/client';
import { join } from 'node:path'


const readClientFile = (file: IFile) => {
    try {
        const path = join(__dirname, '../', '../', 'temp-uploads/data.txt');
        fs.readFile(path, 'utf8', function(err: any, data: any) {
            if(err) throw `error when open file, ${err}`
            convertFileToJson(path)
        })
    } catch (err) {
    } 
}

const convertFileToJson = (path: any): any => {
    const stream = fs.createReadStream(path);
    stream.on('error', (err) => {
        return err
    });
    const reader = readline.createInterface({
        input: stream
    });

    let clientList: IClient[] = []

    reader.on('line', (line: String) => {
        const eachClient = lineToJson(line)
        mountClientObject(clientList, eachClient)
    });

    reader.on('close', () => { 
        return clientList 
    });
}

const lineToJson = (line: String): IClient => {
    const user_id = parseInt(line.substring(0, 10)) 
    const name = line.substring(10, 55).trim() 
    const order_id = parseInt(line.substring(55, 65))
    const product_id = parseInt(line.substring(65, 75))
    const value = line.substring(75, 87).trim()
    const unFormattedDate = line.substring(87, 95)
    const date = `${unFormattedDate.substring(0, 4)}-${unFormattedDate.substring(4, 6)}-${unFormattedDate.substring(6, 8)}`;
   
    return {
        user_id,
        name,
        orders: [{
            order_id,
            total: value,
            date,
            products: [{
                product_id,
                value
            }],
          }]
    };
}

const mountClientObject = (clientList: IClient[], eachClient: IClient) => {
    let client = clientList.find((it) => it.user_id == eachClient.user_id);

    if (client) {
        let order = client.orders.find((it) => it.order_id == eachClient.orders[0].order_id);
        if (order) {
            const eachProduct = eachClient.orders[0].products[0];
            const total = (
            parseFloat(order.total) + parseFloat(eachProduct.value)
            ).toFixed(2);
            let product = order.products.find((it) => it.product_id == eachProduct.product_id);

            if (product) {
            product.value = total;
            } else {
            order.products.push(eachProduct);
            }

            order.total = total;
        } else {
            client.orders.push(eachClient.orders[0]);
        }
    } else {
        clientList.push(eachClient);
    }
}

module.exports = readClientFile