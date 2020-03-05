const fs = require("fs");
const request = require("request");

function downImage(url, path) {
  return new Promise((resolve, reject) => {
    let file = fs.createWriteStream(path, {
      flags: 'w'
    });
    request.get({
        url: url
      }).on('response', response => {
        //console.debug(response)
      }).pipe(file)
      .on('finish', () => {
        resolve('ok');
      }).on('error', (e) => {
        reject(e);
      })
  });
}

async function down(info, path) {
  await downImage(info.image, `${path}${info.title}.png`)
};

module.exports = {
  down
}