const axios = require('axios');

async function test(name) {
    name = name.replace("_", " ")
    let text = encodeURI(name)
    let result = await axios.get("https://kitsu.io/api/edge/anime?filter[text]=" + text);
    let data = result.data.data[0];
    if (data) {
        //console.log(data);

        let info = {
            dirName: name,
            title: data.attributes.titles.ja_jp,
            image: data.attributes.posterImage.medium,
            startDate: data.attributes.startDate,
            endDate: data.attributes.endDate,
            episodeCount: data.attributes.episodeCount
        }
        console.log(info);
        return info;
    } else {
        console.log("no find")
    }
    return null;
}

module.exports = {
    test
};