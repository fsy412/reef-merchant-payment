function parseQueryStr(queryStr) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}

export function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let recv = "";
            ctx.req.addListener('data', (data) => {
                recv += data
            })
            ctx.req.addListener("end", function () {
                resolve(recv)
            })
        } catch (err) {
            reject(err)
        }
    })
}

export function getBody(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let recv = "";
            ctx.req.addListener('data', (data) => {
                recv += data
            })
            ctx.req.addListener("end", function () {
                resolve(recv)
            })
        } catch (err) {
            reject(err)
        }
    })
}