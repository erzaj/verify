const fetch = require("node-fetch");
const cheerio = require("cheerio");
const delay = require("delay");
const readline = require("readline-sync");
const { URLSearchParams } = require("url");
const moment = require("moment");
const ua = require("useragent-generator");
const fs = require("fs");

const DelaY = "1000";
const file = readline.question("Input your file (Ex: x.txt): ")

console.log("");
console.log("");

function randstr(length) {
    result = '';
    const characters = '012345678910abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const functionGetMessages = (domain, emailUname) =>
  new Promise((resolve, reject) => {
    fetch(`https://generator.email/${domain}/${emailUname}`, {
      method: "GET",
      headers: {
            accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            "accept-encoding": "gzip, deflate, br",
            cookie: `_ga=GA1.2.659238676.1567004853; _gid=GA1.2.273162863.1569757277; embx=%5B%22${emailUname}%40${domain}%22%2C%22hcycl%40nongzaa.tk%22%5D; _gat=1; io=io=tIcarRGNgwqgtn40O${randstr(3)}; surl=${domain}%2F${emailUname}`,
            "upgrade-insecure-requests": 1,
            "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
        }
    })
    .then(res => res.text())
        .then(text => {
            const $ = cheerio.load(text);
            const src = $("a[name=staging_marlboro_id_auth_verify_ema]").attr('href');
            resolve(src);
        })
        .catch(err => reject(err));
});

const functionVeryf = (url) => new Promise((resolve, reject) => {
    fetch(url, {
        method: "get"
    })
        .then(res => res.text())
        .then(text => {
            const $ = cheerio.load(text);
            const src = $("p.staticp__text.mb50").text();
            resolve(src);
        })
        .catch(err => reject(err));
});

(async () => {
  console.log(
    "[" + " " + moment().format("HH:mm:ss") + " " + "]" + " " + "Starting ...."
  );


  await delay(1000);
  await fs.readFile(file, async function(err, data) {
    if (err) throw err;
    const array = data
      .toString()
      .replace(/\r\n|\r|\n/g, " ")
      .split(" ");
      //console.log(array);

    for (let ury in array) {
      if (array[ury].length !== 0 && array[ury].length > 11) {
        try {
          await delay(DelaY);
          // console.log("ASU");
          const domain = "aminudin.me";
          const emailUname = array[ury];





          // console.log(emailUname);
          // const emailUname = await replaceString(array[ury], "https://generator.email/flickshot.id/", "");
          // console.log(emailUname);
          console.log(`Mencoba verifikasi dengan email: ${emailUname}@${domain}`)
          const getmsg = await functionGetMessages(domain, emailUname);
          // console.log(getmsg);
          //const regist = await functionRegister(array[ury]);
          const verif = await functionVeryf(getmsg)
          console.log(verif);
          // await delay(5000);

        } catch (e) {
          
        }
      }
    }
  });
})();
