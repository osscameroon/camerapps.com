const constructUrl = (url, param) => {
    let data = url.includes("&") ? url.split("&") : url.split("?");
    for(let i = 0; i< data.length;i++){
      if(data[i].includes("page")){
        data[i] = "page="+param;
      }
    }
    return url.includes("&") ? data.join("&") : data.join("?");
}

/**
 * 
 * @param {*} interval 
 * @param {*} current 
 * @param {*} pages 
 * @returns 
 */
const getPagesNumber = (interval, current, pages ) => {
    let result = [];
    for (; interval <= (current+ 4) && interval <= pages; interval++){
      result.push(interval);
    }
    return result;
};

/**
 * 
 * @param {*} queryResult 
 * @returns 
 */
const displayPagesNumbers = (queryResult) => {
    let pageNumbersHtml = "";
    getPagesNumber(queryResult.interval, queryResult.current, queryResult.pages)
    .map((index) => {
        if (queryResult.current == 0)
            pageNumbersHtml += `<li class="active page-item"><a class="page-link">${index}</a></li>`
        else{
            if (queryResult.hasParams){
                if (queryResult.fullUrl.includes("page"))
                    pageNumbersHtml += `<li class="page-item"><a href="${constructUrl(queryResult.fullUrl, index)}" class="page-link" onclick="event.preventDefault()">${index}</a></li>`;
                else
                    pageNumbersHtml += `<li class="page-item"><a href="${queryResult.fullUrl}&page=${index}" class="page-link" onclick="event.preventDefault()">${index}</a></li>`;
            }else
                pageNumbersHtml += `<li class="page-item"><a href="${queryResult.fullUrl}?page=${index}" class="page-link" onclick="event.preventDefault()">${index}</a></li>`
        }
        if (queryResult.current == 4 && queryResult.current < queryResult.pages)
            pageNumbersHtml += `<span>ici</span><li class="disabled page-item"><a class="page-link">...</a></li>`
    });
    return pageNumbersHtml;
}

/**
 * 
 * @param {*} queryResult 
 * @returns 
 */
const buildPagination = (queryResult) => {
    let htmlPagination = "";
    
    htmlPagination += `
    <nav aria-label="Page navigation example" class="d-flex justify-content-center">
        <ul class="pagination">
            ${queryResult.current == 1 ? 
                    `<li class="disabled page-item"><a class="page-link disabled" onclick="event.preventDefault()" >First</a></li>`
                :
                    queryResult.hasParams ?
                        queryResult.fullUrl.includes("page") ?
                            `<li class="page-item"><a href="${constructUrl(queryResult.fullUrl, 1)}" class="page-link" onclick="event.preventDefault()">First</a></li>`
                        :
                            `<li class="page-item"><a href="${queryResult.fullUrl}&page=1" class="page-link" onclick="event.preventDefault()">First</a></li>`
                    :
                        `<li class="page-item"><a href="?page=1" class="page-link" onclick="event.preventDefault()" >First</a></li>`
            }
            ${queryResult.interval != 1 ? `<li class="disabled page-item"><a class="page-link" onclick="event.preventDefault()">...</a></li>`: ``}
            
            ${displayPagesNumbers(queryResult)}
            
            ${queryResult.current == queryResult.pages ? 
                `<li class="disabled page-item"><a class="page-link">Last</a></li>`
                :
                queryResult.hasParams ?
                    queryResult.fullUrl.includes("page") ?
                        `<li class="page-item"><a href="${constructUrl(queryResult.fullUrl, queryResult.pages)}" class="page-link" onclick="event.preventDefault()">Last</a></li>`
                        :
                        `<li class="page-item"><a href="${queryResult.fullUrl}&page=${queryResult.pages}" class="page-link" onclick="event.preventDefault()">Last</a></li>`
                    :
                    `<li class="page-item"><a href="?page=${queryResult.pages}" class="page-link" onclick="event.preventDefault()">Last</a></li>`
            }
        </ul>
    </nav>`;

    return htmlPagination;
}
