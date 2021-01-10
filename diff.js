const { promises: fs, constants } = require("fs");
const path = require('path');

async function findAll(root) {
    let pathStack = [];
    let result = [];
    pathStack.push(root);
    while (pathStack.length > 0) {
        let filePath = pathStack.shift();
        let stat = await fs.stat(filePath);
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

function getMap(paths) {
    let map = new Map();
    paths.forEach(p => {
        let name = path.basename(p);
        map.set(name, p);
    })
    return map;
}

async function diff() {

    let src = await findAll('../node_modules');
    let desc = await findAll('node_modules');
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