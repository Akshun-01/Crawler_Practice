const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages){
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);

    if(currentURLObj.hostname !== baseURLObj.hostname){
        return pages;
    }

    const normalizedURL = normalizeURL(currentURL);
    if(pages[normalizedURL] > 0){
        pages[normalizedURL]++;
        return pages;
    }

    pages[normalizedURL]=1;
    console.log(`actively crawling : ${currentURL}`);
    let currentHtml = '';
    try{
        const resp = await fetch(currentURL);
        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status}, on page: ${currentURL}`);
            return pages;
        }

        const contentType = resp.headers.get('content-type');
        if(!contentType.includes("text/html")){
            console.log(`Non-Html repsone, content-type: ${contentType}, on page: ${currentURL}`);
            return pages;
        }

        currentHtml = await resp.text();
        
    }catch(err){
        console.log(`Error: ${err.message}, on page: ${currentURL}`);
    }

    const nextURLs = getURLfromHTML(currentHtml, currentURL);
    for(nextURL of nextURLs){
        pages = await crawlPage(baseURL, nextURL, pages);
    }

    return pages;   
}

function getURLfromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const aElements = dom.window.document.querySelectorAll('a')
    for (const aElement of aElements){
      if (aElement.href.slice(0,1) === '/'){
        try {
          urls.push(new URL(aElement.href, baseURL).href)
        } catch (err){
          console.log(`${err.message}: ${aElement.href}`)
        }
      } else {
        try {
          urls.push(new URL(aElement.href).href)
        } catch (err){
          console.log(`${err.message}: ${aElement.href}`)
        }
      }
    }
    return urls
  }

function normalizeURL(urlString){
    const url = new URL(urlString);
    let fullPath = `${url.host}${url.pathname}`;

    if(fullPath.length>0  && fullPath.slice(-1)==='/'){
        fullPath = fullPath.slice(0,-1);
    }
    return fullPath;
}

module.exports = {
    crawlPage,
    normalizeURL,
    getURLfromHTML
}