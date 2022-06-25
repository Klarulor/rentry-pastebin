import {CookieJar} from "request";
import {
    createPaste,
    deletePaste,
    editPasteContent, editPasteContentAsync,
    editPasteEditCode,
    editPasteUrl,
    generateToken, getPaste
} from "./RentryGateway";
import {IPasteCreatingOptions} from "./features/IPasteCreatingOptions";
import {IPasteStruct} from "./features/IPasteStruct";
import {Paste} from "./Paste";

const url: string = 'https://rentry.co/';
const request = require('request');

export class RentryClient{
    private token: string;
    private jar: CookieJar;
    constructor() {
        this.jar = request.jar();
    }

    public async createToken(): Promise<void>{
        this.token = await generateToken(this.jar);
    }
    public useToken(token: string): void {
        this.token = token;
    }
    public getToken(): string{
        return this.token;
    }
    public createPaste(options: IPasteCreatingOptions): Promise<IPasteStruct>{
        return new Promise(async res => {
            const pair = await createPaste(this.jar, this.token, options);
            pair.paste = new Paste(pair.url, pair.editCode, options.content || "", this as any);
            res(pair);
        })
    }
    public getPaste(id: string): Promise<string>{
        return getPaste(id);
    }
    public editPasteContent(id: string, password: string, newContent: string): void{
        editPasteContent(this.jar, this.token, id, password, newContent);
    }
    public editPasteContentAsync(id: string, password: string, newContent: string): Promise<void>{
        return editPasteContentAsync(this.jar, this.token, id, password, newContent);
    }
    public editPasteEditCode(id: string, password: string, newEditCode: string): void{
        editPasteEditCode(this.jar, this.token, id, password, newEditCode);
    }
    public editPasteUrl(id: string, password: string, newUrl: string): void{
        editPasteUrl(this.jar, this.token, id, password, newUrl);
    }
    public deletePaste(id: string, password: string): void{
        deletePaste(this.jar, this.token, id, password);
    }
}