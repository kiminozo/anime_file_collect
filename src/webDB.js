const axios = require('axios');

async function test(name) {
    let text = encodeURI(name)
    let result = await axios.get("https://kitsu.io/api/edge/anime?filter[text]=" + text)
    console.log(result.data.data[0].attributes.titles.ja_jp);
}

module.exports = {
    test
};