const Axios = require("axios").default;
const queryString = require("query-string");

/**
 * @namespace
 */
const Api = function () {};

/**
 * @memberof {Api}
 * @constant
 */
Api.authApiBasePath = "/auth";

/**
 * @memberof {Api}
 * @constant
 */
Api.postApiBasePath = "/posts";

/**
 * 
 */
Api.prototype.isSignedIn = function () {
    return Axios.get(`${Api.authApiBasePath}/isSignedIn`);
};

/**
 * 
 * @param {string} plainPassword
 */
Api.prototype.signIn = function (plainPassword) {
    return Axios.post(`${Api.authApiBasePath}/signIn`, {plainPassword : plainPassword});
};

/**
 * 
 */
Api.prototype.signOut = function () {
    return Axios.post(`${Api.authApiBasePath}/signOut`);
};

/**
 * 
 * @param {string} postId
 */
Api.prototype.removePost = function (postId) {
    return Axios.delete(`${Api.postApiBasePath}/${postId}`);
};

/**
 * 
 * @param {object} post
 */
Api.prototype.updatePost = function (post) {
    return Axios.patch(`${Api.postApiBasePath}/${post.postId}`, post);
};

/**
 * 
 * @param {object} post
 */
Api.prototype.writePost = function (post) {
    return Axios.post(`${Api.postApiBasePath}`, post);
};

/**
 * 
 * @param {string} postId
 */
Api.prototype.readPostById = function (postId) {
    return Axios.get(`${Api.postApiBasePath}/${postId}`);
};

/**
 * 
 * @param {number} page
 * @param {number} pageCount
 * @param {number} contentLength
 * @param {Array.<string>} tags
 */
Api.prototype.getPostList = function (page, pageCount, contentLength, tags) {
    pageCount = Number.parseInt(pageCount);
    if(!Number.isSafeInteger(pageCount) || pageCount < 0) {
        pageCount = 0;
    }
    
    contentLength = Number.parseInt(contentLength);
    if(!Number.isSafeInteger(contentLength) || contentLength < 0) {
        contentLength = 0;
    }
    
    const queryParams = {
        page : page,
        pageCount : pageCount,
        contentLength : contentLength,
        tags : Array.from(new Set(tags.map((tag) => tag.trim()))).join(",")
    };

    return Axios.get(`${Api.postApiBasePath}?${queryString.stringify(queryParams)}`);
};

module.exports = new Api();
