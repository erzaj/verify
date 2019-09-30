const fetch = require('node-fetch');
const readline = require('readline-sync');
const uuid = require('uuid/v4');
const cheerio = require('cheerio');
const moment = require('moment');
const chalk = require('chalk');
const delay = require('delay');
const replaceString = require("replace-string")
const fs = require('async-file');


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
    try{
      
    const domain = "aminudin.me ";
    const fuck = readline.question("Your link: ");
    const emailUname = replaceString(fuck, "https://generator.email/flickshot.id/", "");
    const getmsg = await functionGetMessages(domain, emailUname);
    console.log(getmsg);
    const verif = await functionVeryf(getmsg)
    console.log(verif);
    
    
    }catch(e){
        console.log(e) 
    }

})();
