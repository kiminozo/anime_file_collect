const fs = require('promise-fs');

async function scan(path){
    let dirs = await fs.readdir(path)
    for (const dir of dirs) {
        console.log(dir);
    }
    return dirs;

}



module.exports ={
    scan
}