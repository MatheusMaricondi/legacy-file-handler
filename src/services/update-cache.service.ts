const userJsonCache = require('../../user-list-cache/userList.json')
import { IAllList } from "../types/client"
const fs = require('fs')
const path = require('node:path'); 

const updateCacheUser = (data: IAllList)  => {
    const uri = path.join(__dirname, '../', '../', '/user-list-cache', '/userList.json')
    fs.writeFileSync(uri, JSON.stringify(data))
}

const getCacheUser = (): IAllList => userJsonCache 


export { 
    updateCacheUser,
    getCacheUser
}