import {getPaste} from "./RentryGateway";
import {RentryClient} from "./RentryClient";
import {editPasteEditCode} from "rentry-pastebin";

export class Paste{
    private link: string;
    private editCode: string;
    private content: string;
    private client: RentryClient;
    constructor(link: string, editCode: string, content?: string, client?: RentryClient) {
        this.link = link;
        this.editCode = editCode;
        this.content = content;
        this.client = client;
    }

    public getLink = () => this.link;
    public getEditCode = () => this.editCode;
    public getContent = () => this.content;
    public setContent(newContent: string): void{
        this.client.editPasteContent(this.link, this.editCode, newContent);
    }
    public editEditCode(id: string, password: string, newEditCode: string): void{
        this.client.editPasteEditCode(this.link, this.editCode, newEditCode);
    }
    public editUrl(id: string, password: string, newUrl: string): void{
        this.client.editPasteUrl(this.link, this.editCode, newUrl);
    }
    public delete(id: string, password: string): void{
        this.client.deletePaste(this.link, this.editCode);
    }

    public async pull(): Promise<void>{
        this.content = await getPaste(this.link);
    }
    public static fetch(client: RentryClient, link: string, editCode?: string): Promise<Paste>{
        return new Promise(async res => {
           const body = await getPaste(link);
           const paste = new Paste(link, editCode, body, client);
        });
    }
}

