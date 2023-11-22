// import { IAllList } from '../types/client';
const fs = require('fs')
const path = require('node:path'); 

const updateCacheUser = async (data: any)  => {
    const uri = path.join(__dirname,'../','../','/user-cache/','userList.json')
    await fs.writeFileSync(uri, JSON.stringify(data))
}

const getCacheUser = async () => {
    const uri = path.join(__dirname,'../','../','/user-cache/','userList.json')
    let bufferFile = await fs.readFileSync(uri)
    let file = JSON.parse(bufferFile.toString())
    
    return file
} 


export { 
    updateCacheUser,
    getCacheUser
}