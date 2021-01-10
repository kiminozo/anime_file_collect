const webDB = require('./src/webDB');
const scanner = require('./src/scan');
const downloader = require('./src/download');


const textJson = {
    dir: [
        "[Array Stars][Orange][01 - 13][720 P][GB & JAP]",
        "[BeanSub & FZSD][Taboo_Tattoo][01 - 12][1080 P_Hi10P][MKV]",
        "[BRB][RWBY][Volume2][1080 P]",
        "[CASO][Tales_of_Zestiria_the_X][00 - 12][GB][720 p]",
        "[Comicat][New Game][1 - 12][GB][720 P]",
        "[DHR & MakariHoshiyume][Ace Attorney][01 - 24][BIG5][720 P][AVC_AAC][MP4]",
        "[DMG][Magi Sinbad no Bouken][01 - 13][CHS][MP4]",
        "[DMG][Rewrite][01 - 13 END][720 P_Hi10P][MKV]",
        "[Hoshioka] planetarian~the reverie of a little planet~[720 p][MKV]",
        "[JyFanSub][danganronpa 3 Despair][01~11][GB_CN][720 p][MP4]",
        "[KissSub & FZSD][Gyakuten_Saiban][01 - 24][720 P_Hi10P][MKV]",
        "[KNA][Momokuri][01 - 13][合集][1280 x720][x264_AAC][BIG5]",
        "[KTXP][Tenku Senki Shurato][01 - 38][GB_CN][576 p][MP4]",
        "[Mmch.sub][91 _Days][01 - 12][GB][X264][720 P]",
        "[Moozzi2] Wake Up, Girls!-Movie 02 - 「Zoku Gekijouban」 - Movie",
        "[Moozzi2] Wake Up, Girls!-Movie 03 - 「Beyond the Bottom」 - Movie +",
        "[Pussub][Little Busters!EX][BIG5][x264_AAC][720 P]",
        "[SHIGURE][konobi][CHS][720 p][Rev]",
        "[SumiSora][Tanakeda][MKV][1080 p]",
        "[异域 - 11 番小队][不死之王 Overlord][01 - 13 + SP][BDRIP][1080 P][X264 - 10 bit_",
        "[Kamigami] Buddha 2 Tezuka Osamu no Buddha - Owarinaki Tabi[BD x264 1 920 x1080 FLAC(5.1 ch) Sub(Chs, Cht, Jap)].mkv",
        "[KNA][Accel_world_Infinite_Burst][1280 x720][x264_AAC][BIG5].mp4"
    ]
}

//webDB.test("Shinchou Yuusha")

let regex = /\[[^\[\]]+\]\S?\[?([^\[\]]+)\]?.+/;

async function scan(path, name) {
    let info = await webDB.getInfo(name);
    await downloader.downPoster(info, path)
}

async function run(root,names) {
    let tasks = [];
    for (const name of names) {
        let result = regex.exec(name);
        if (result) {
            tasks.push(scan(root + "\\" + name, result[1]));
        } else {
            //tasks.push(webDB.test(name));
            console.warn("regex no match:" + name)
        }
    }
    try {
        await Promise.all(tasks);
    } catch (error) {
        console.error(error);
    }
}

async function test() {
    await run(textJson.dir)
}

async function test2() {
    //let root = "H:\\Animation\\2016年4月(剩)"
    let root = "S:\\unwatched"
    let names = await scanner.scan(root);
    await run(root,names)
}

test2();