function normalizeURL(urlString){
    const url = new URL(urlString);
    let normalizedURL = url.hostname + url.pathname;

    if(normalizedURL.length>0  && normalizedURL.slice(-1)==='/'){
        normalizedURL = normalizedURL.slice(0,-1);
    }
    return normalizedURL;
}

module.exports = {
    normalizeURL
}