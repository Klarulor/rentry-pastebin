import { RentryClient } from "./RentryClient";
export declare class Paste {
    private link;
    private editCode;
    private content;
    private client;
    constructor(link: string, editCode: string, content?: string, client?: RentryClient);
    getLink: () => string;
    getEditCode: () => string;
    getContent: () => string;
    setContent(newContent: string): void;
    editEditCode(id: string, password: string, newEditCode: string): void;
    editUrl(id: string, password: string, newUrl: string): void;
    delete(id: string, password: string): void;
    pull(): Promise<void>;
    static fetch(client: RentryClient, link: string, editCode?: string): Promise<Paste>;
}
