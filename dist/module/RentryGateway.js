"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaste = exports.getPaste = exports.editPasteUrl = exports.editPasteEditCode = exports.editPasteContentAsync = exports.editPasteContent = exports.createPaste = exports.generateToken = void 0;
const request = require('request');
const url = 'https://rentry.co/';
function generateToken(jar) {
    return new Promise(res => {
        request({ url, jar }, function () {
            const token = (jar._jar.store.idx["rentry.co"]["/"].csrftoken.toString().split('csrftoken=')[1].split('; Expires=')[0]);
            res(token);
        });
    });
}
exports.generateToken = generateToken;
function createPaste(jar, token, options) {
    const editCode = options.customEditCode, customUrl = options.customUrl, content = options.content;
    return new Promise(res => {
        const headers = {
            "content-type": "application/x-www-form-urlencoded",
            "cookie": `csrftoken=${token}`,
            "Referer": "https://rentry.co/",
        };
        const body = `csrfmiddlewaretoken=${token}&text=${content !== null && content !== void 0 ? content : ""}&edit_code=${editCode || ""}&url=${customUrl || ""}`;
        request.post({ url, headers, body, jar }, function (err, httpResponse, body) {
            const struct = {
                url: httpResponse.headers.location.split('/')[1],
                editCode: jar._jar.store.idx["rentry.co"]["/"].messages.toString().split('Your edit code: \\"\\054\\"')[1].split('\\"]]"; Path=/;')[0]
            };
            res(struct);
        });
    });
}
exports.createPaste = createPaste;
function editPasteContent(jar, token, id, password, newContent) {
    editField(jar, token, id, password, newContent, null, null);
}
exports.editPasteContent = editPasteContent;
function editPasteContentAsync(jar, token, id, password, newContent) {
    return editFieldAsync(jar, token, id, password, newContent, null, null);
}
exports.editPasteContentAsync = editPasteContentAsync;
function editPasteEditCode(jar, token, id, password, newEditCode) {
    editField(jar, token, id, password, null, newEditCode, null);
}
exports.editPasteEditCode = editPasteEditCode;
function editPasteUrl(jar, token, id, password, newUrl) {
    editField(jar, token, id, password, null, null, newUrl);
}
exports.editPasteUrl = editPasteUrl;
function getPaste(id) {
    return new Promise(res => {
        request.get({ url: `${url}/${id}` }, function (err, httpResponse, body) {
            res(body.split('<p>')[1].split(`</p>`)[body.split('<p>')[1].split(`</p>`).length - 1]);
        });
    });
}
exports.getPaste = getPaste;
function editField(jar, token, id, password, newContent, newEditCode, newUrl) {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
        "cookie": `csrftoken=${token}`,
        "Referer": "https://rentry.co/",
    };
    const body = `csrfmiddlewaretoken=${token}&text=${encodeURIComponent(newContent || "")}&edit_code=${encodeURIComponent(password || "")}&new_edit_code=${encodeURIComponent(newEditCode || "")}&new_url=${encodeURIComponent(newUrl || "")}`;
    request.post({ url: `${url}/${id}/edit`, headers, body, jar }, () => { });
}
function editFieldAsync(jar, token, id, password, newContent, newEditCode, newUrl) {
    return new Promise(res => {
        const headers = {
            "content-type": "application/x-www-form-urlencoded",
            "cookie": `csrftoken=${token}`,
            "Referer": "https://rentry.co/",
        };
        const body = `csrfmiddlewaretoken=${token}&text=${encodeURIComponent(newContent || "")}&edit_code=${encodeURIComponent(password || "")}&new_edit_code=${encodeURIComponent(newEditCode || "")}&new_url=${encodeURIComponent(newUrl || "")}`;
        request.post({ url: `${url}/${id}/edit`, headers, body, jar }, res);
    });
}
function deletePaste(jar, token, id, password) {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
        "cookie": `csrftoken=${token}`,
        "Referer": "https://rentry.co/",
    };
    const body = `csrfmiddlewaretoken=${token}&text=&edit_code=&new_edit_code=&new_url=&delete=delete`;
    request.post({ url: `${url}/${id}/edit`, headers, body, jar }, () => { });
}
exports.deletePaste = deletePaste;
//# sourceMappingURL=RentryGateway.js.map