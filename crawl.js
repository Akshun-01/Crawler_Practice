const { log } = require("console");
const { JSDOM } = require("jsdom");

function getURLfromHTML(htmlBody, baseURL){
    let urlArray=[];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll("a");

    for( const linkElement of linkElements){
        if(linkElement.href.slice(0,1) === '/'){
            // relative
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urlArray.push(urlObj.href);
            }catch (err){
                console.log(`Exited with the error : ${err.message}`);
            }
        }else{
            // absolute
            try{
                const urlObj = new URL(linkElement.href);
                urlArray.push(urlObj.href);
            }catch (err){
                console.log(`Exited with the error : ${err.message}`);
            }
        }
    }

    return urlArray;
}

function normalizeURL(urlString){
    const url = new URL(urlString);
    let normalizedURL = url.hostname + url.pathname;

    if(normalizedURL.length>0  && normalizedURL.slice(-1)==='/'){
        normalizedURL = normalizedURL.slice(0,-1);
    }
    return normalizedURL;
}

module.exports = {
    normalizeURL,
    getURLfromHTML
}