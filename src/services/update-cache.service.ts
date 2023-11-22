const fs = require('fs')
const path = require('node:path'); 
import initialCacheDocument from "../constants"; '../constants/index'

const updateCacheUser = async (data: any)  => {
    const uri = path.join(__dirname,'../','../','/data-cache/','dataCache.json')
    await fs.writeFileSync(uri, JSON.stringify(data))
}

const getCacheUser = async () => {
    const uri = path.join(__dirname,'../','../','/data-cache/','dataCache.json')
    const fileExist = fs.existsSync(uri)
    const jsonCacheDocument = JSON.stringify(initialCacheDocument)
    if(!fileExist) {
        await fs.writeFileSync(uri, jsonCacheDocument);
    }
    let bufferFile = await fs.readFileSync(uri)
    let file = JSON.parse(bufferFile.toString())
    
    return file
} 


export { 
    updateCacheUser,
    getCacheUser
}