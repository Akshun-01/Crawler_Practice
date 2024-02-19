function generateReport(pages){
    console.log("==========");
    console.log("REPORT");
    console.log("==========");
    
    const sortedPages = sortPages(pages);
    for(const page of sortedPages){
        const url = page[0];
        const hits = page[1];
        console.log(`Found ${hits} links to page : ${url}`);
    }

    console.log("==========");
    console.log("END OF REPORT");
    console.log("==========");
}

function sortPages(pages){
    const pagesArray = Object.entries(pages);
    pagesArray.sort((a,b)=>{
        countA = a[1];
        countB = b[1];

        return countB - countA;
    })
    return pagesArray;
}

module.exports = {
    generateReport,
    sortPages
}