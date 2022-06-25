import {CookieJar} from "request";
import {IPasteCreatingOptions} from "./features/IPasteCreatingOptions";
import {IPasteStruct} from "./features/IPasteStruct";
const request = require('request');
const url = 'https://rentry.co/';

export function generateToken(jar: CookieJar): Promise<string>{
    return new Promise(res => {
        request({url, jar}, function () {
            const token = ((jar as any)._jar.store.idx["rentry.co"]["/"].csrftoken.toString().split('csrftoken=')[1].split('; Expires=')[0]);
            res(token);
        });
    })
}


    export function createPaste(jar: CookieJar, token: string, options: IPasteCreatingOptions): Promise<IPasteStruct>{
    const editCode = options.customEditCode,
          customUrl = options.customUrl,
          content = options.content;

    return new Promise(res => {
        const headers = {
            "content-type": "application/x-www-form-urlencoded",
            "cookie": `csrftoken=${token}`,
            "Referer": "https://rentry.co/",
        };
        const body = `csrfmiddlewaretoken=${token}&text=${content ?? ""}&edit_code=${editCode || ""}&url=${customUrl || ""}`;
        request.post({url, headers, body, jar}, function(err: any, httpResponse: any, body: any){
            const struct = {
                url: httpResponse.headers.location.split('/')[1],
                editCode: (jar as any)._jar.store.idx["rentry.co"]["/"].messages.toString().split('Your edit code: \\"\\054\\"')[1].split('\\"]]"; Path=/;')[0]
            };
            res(struct);
        })
    })
}


export function editPasteContent(jar: CookieJar, token: string, id: string, password: string, newContent: string): void{
    editField(jar, token, id, password, newContent, null, null);
}
export function editPasteContentAsync(jar: CookieJar, token: string, id: string, password: string, newContent: string): Promise<void>{
    return editFieldAsync(jar, token, id, password, newContent, null, null);
}
export function editPasteEditCode(jar: CookieJar, token: string, id: string, password: string, newEditCode: string): void{
    editField(jar, token, id, password, null, newEditCode, null);
}
export function editPasteUrl(jar: CookieJar, token: string, id: string, password: string, newUrl: string): void{
    editField(jar, token, id, password, null, null, newUrl);
}

export function getPaste(id: string): Promise<string>{
    return new Promise(res => {
        console.log(`${url}/${id}`);
        request.get({url: `${url}/${id}/raw`}, function(err: any, httpResponse: any, body: string){
            //console.log(body);
            res(body.split('<p>')[1].split(`</p>`)[body.split('<p>')[1].split(`</p>`).length - 2])
        })
    })
}
function editField(jar: CookieJar, token: string, id: string, password: string, newContent: string, newEditCode: string, newUrl: string): void{
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
        "cookie": `csrftoken=${token}`,
        "Referer": "https://rentry.co/",
    };

    const body = `csrfmiddlewaretoken=${token}&text=${encodeURIComponent(newContent || "")}&edit_code=${encodeURIComponent(password || "")}&new_edit_code=${encodeURIComponent(newEditCode || "")}&new_url=${encodeURIComponent(newUrl || "")}`;
    request.post({url: `${url}/${id}/edit`, headers, body, jar}, () => {});
}

function editFieldAsync(jar: CookieJar, token: string, id: string, password: string, newContent: string, newEditCode: string, newUrl: string): Promise<void>{
    return new Promise(res => {
        const headers = {
            "content-type": "application/x-www-form-urlencoded",
            "cookie": `csrftoken=${token}`,
            "Referer": "https://rentry.co/",
        };

        const body = `csrfmiddlewaretoken=${token}&text=${encodeURIComponent(newContent || "")}&edit_code=${encodeURIComponent(password || "")}&new_edit_code=${encodeURIComponent(newEditCode || "")}&new_url=${encodeURIComponent(newUrl || "")}`;
        request.post({url: `${url}/${id}/edit`, headers, body, jar}, res);
    });
}


export function deletePaste(jar: CookieJar, token: string, id: string, password: string): void{
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
        "cookie": `csrftoken=${token}`,
        "Referer": "https://rentry.co/",
    };
    const body = `csrfmiddlewaretoken=${token}&text=&edit_code=&new_edit_code=&new_url=&delete=delete`;
    request.post({url: `${url}/${id}/edit`, headers, body, jar}, () => {});
}