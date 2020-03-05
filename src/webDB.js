const axios = require('axios');

async function test(name) {
    name = name.replace("_", " ")
    let text = encodeURI(name)
    let result = await axios.get("https://kitsu.io/api/edge/anime?filter[text]=" + text)
    if (result.data.data[0]) {
        console.log(result.data.data[0].attributes.titles.ja_jp);
    } else {
        console.log("no find")
    }
}

module.exports = {
    test
};