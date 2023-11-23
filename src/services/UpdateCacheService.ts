const fs = require('fs')
const path = require('node:path'); 
import initialCacheDocument from "../constants"; '../constants/index'

const updateDataCache = async (data: any)  => {
    const uri = path.join(__dirname,'../','../','/data-cache/','dataCache.json')
    await fs.writeFileSync(uri, JSON.stringify(data))
}

const getDataCache = async () => {
    const uri = path.join(__dirname,'../','../','/data-cache/','dataCache.json')
    const directory = path.join(__dirname,'../','../','/data-cache/')

    const fileExist = fs.existsSync(uri)
    if(!fileExist) {
        const jsonCacheDocument = JSON.stringify(initialCacheDocument)
        fs.mkdirSync(directory)
        await fs.writeFileSync(uri, jsonCacheDocument);
    }
    let bufferFile = await fs.readFileSync(uri)
    let file = JSON.parse(bufferFile.toString())
    
    return file
} 


export { 
    updateDataCache,
    getDataCache
}