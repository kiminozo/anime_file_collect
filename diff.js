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
            let filePaths = await fs.readdir(filePath);
            filePaths.forEach(p => {
                if (p.startsWith('.')) {
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

    let src = await findAlls('S:/已备份', 'S:/download',"S:/2020-10","S:/2020-04");
    let desc = await findAll('N:');
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