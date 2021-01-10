const { promises: fs, constants } = require("fs");
const path = require('path');

async function findAll(root) {
    let pathStack = [];
    let result = [];
    pathStack.push(root);
    while (pathStack.length > 0) {
        let filePath = pathStack.shift();
        let stat;
        try{
            stat = await fs.stat(filePath);
        }catch(err){
            continue;
        }
        if (stat.isDirectory()) {
            result.push(filePath);
            let filePaths;
            try{
                filePaths = await fs.readdir(filePath);
            }catch(err){
                continue;
            }
            filePaths.forEach(p => {
                if (p.startsWith('.')) {
                    return;
                }
                if (p.startsWith('@')) {
                    return;
                }
                pathStack.push(path.join(filePath, p));
            });
        }
    }
    return result;
}

async function findAlls(...roots) {
    let result = [];
    let results = await Promise.all(roots.map(root => findAll(root)));
    results.forEach(p => {
        p.forEach(item => result.push(item));
    });
    return result;
}


function getMap(paths) {
    let map = new Map();
    paths.forEach(p => {
        let name = path.basename(p);
        map.set(name, p);
    })
    return map;
}

async function diff() {

   let src = await findAlls('S:/download','S:/amine','S:\movies','S:\已备份','S:\剧场版','S:\HD',
   "S:/2020-10","S:/2020-04","S:/2019-10","S:/2018-10","S:/2018-04","S:/2018-01","S:/2017-10");
  // let src = await findAll('S:');
    let desc = await findAlls('I:','N:','P:');
    let srcMap = getMap(src);
    let descMap = getMap(desc);
    console.log("多余的文件夹:\n");
    for (let [key, value] of descMap) {
        if (srcMap.delete(key)) {
            continue;
        }
        console.log(value);
    }
    console.log("\n\n未拷贝的文件夹");
    for (let [key, value] of srcMap) {
        console.log(value);
    }

}

diff();