var queryString = require("query-string");

var AppUtils = function () {}

AppUtils.prototype.toCssRgbaColorText = function (arg) {
    let rgbaColor = 0xFF;

    switch(typeof arg) {
    case "number":
        if(Number.isSafeInteger(arg)) {
            rgbaColor = arg & 0xFFFFFFFF;
        }
    break;
    case "object":
    {
        let colorObj = {
            red : 0,
            green : 0,
            blue : 0,
            alpha : 1
        };
        if(Array.isArray(arg)) {
            for(let i = (arg.length > 4 ? 4 : arg.length); i > 0; ) {
                --i;

                switch(i) {
                    case 0:
                        colorObj.red = arg[0];
                    break;
                    case 1:
                        colorObj.green = arg[1];
                    break;
                    case 2:
                        colorObj.blue = arg[2];
                    break;
                    case 3:
                        colorObj.alpha = arg[3];
                    break;
                    default:

                }
            }
        }
        else {
            colorObj = Object.assign(colorObj, arg);
        }
        
        rgbaColor |= ((colorObj.red || 0) & 0xFF);
        rgbaColor <<= 8;
        rgbaColor |= ((colorObj.green || 0) & 0xFF);
        rgbaColor <<= 8;
        rgbaColor |= ((colorObj.blue || 0) & 0xFF);
        rgbaColor <<= 8;
        rgbaColor |= ((colorObj.alpha || 1) & 0xFF);
        rgbaColor <<= 8;
    }
    break;
    default:

    }
    
    return `rgba(${(rgbaColor & 0xFF000000) >> 24}, ${(rgbaColor & 0xFF0000) >> 16}, ${(rgbaColor & 0xFF00) >> 8}, ${(rgbaColor & 0xFF) / 255.0})`;
};

AppUtils.prototype.getPagePath = function (postId, page, pageCount, contentLength, tags) {
    return `/post/${postId}`;

    // const basePath = `/post/${postId}`;
    
    // let tagsStr = "";
    // if(Array.isArray(tags)) {
    //     tagsStr = tags.join(",");
    // }
    // else if("string" === typeof tags) {
    //     tagsStr = tags;
    // }

    // const queryParams = {
    //     page : page,
    //     pageCount : pageCount,
    //     contentLength : contentLength,
    //     tags : tagsStr
    // };
    
    // return `${basePath}?${queryString.stringify(queryParams)}`;
};

AppUtils.prototype.getPageListPath = function (page, pageCount, contentLength, tags) {
    const basePath = "/posts";

    let tagsStr = "";
    if(Array.isArray(tags)) {
        tagsStr = tags.join(",");
    }
    else if("string" === typeof tags) {
        tagsStr = tags;
    }

    const queryParams = {
        page : page,
        pageCount : pageCount,
        contentLength : contentLength,
        tags : tagsStr
    };

    return `${basePath}?${queryString.stringify(queryParams)}`;
};

/**
 * @param {string} [postId]
 */
AppUtils.prototype.getEditorPath = function () {
    const basePath = "/editor";
    const postId = arguments[0];
    
    let path = "";
    if("string" === typeof postId) {
        path = `${basePath}/${postId}`;
    }
    else {
        path = `${basePath}`;
    }

    return path;
};

AppUtils.prototype.parsePageListQueryString = function (str) {
    let {
        page = "",
        pageCount = "",
        contentLength = "",
        tags = ""
    } = queryString.parse(str);

    page = Number.parseInt(page);
    if(!Number.isSafeInteger(page)) {
        page = 1;
    }

    pageCount = Number.parseInt(pageCount);
    if(!Number.isSafeInteger(pageCount)) {
        pageCount = 10;
    }

    contentLength = Number.parseInt(contentLength);
    if(!Number.isSafeInteger(contentLength)) {
        contentLength = 200;
    }

    let tagsArray = [];
    if("string" === typeof tags) {
        tagsArray = Array.from(new Set(tags.split(",").map((tag) => tag.trim())));
    }
    
    return ({
        page : page,
        pageCount : pageCount,
        contentLength : contentLength,
        tags : tagsArray
    })
};

AppUtils.prototype.parseUrlQueryString = function (str) {
    return queryString.parse(str);
};

module.exports = new AppUtils();
