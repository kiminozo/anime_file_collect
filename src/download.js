const fs = require("fs");
const request = require("request");

function downImage(url,path){
    return new Promise((resolve,reject) =>    {
         let file = fs.createWriteStream(path);
         request.get({
             url:url
          }).on('reponse', reponse => {
               console.debug(reponse)
          }).pipe(file)
          .on('finish',() => {
            resolve('ok');
          }).on('error',(e) => {
            reject(e);
          })
    });
}

class Downloader{
    static down(info, path) {
    

    }
};

module.exports = Downloader