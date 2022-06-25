import { IPasteCreatingOptions } from "./features/IPasteCreatingOptions";
import { IPasteStruct } from "./features/IPasteStruct";
export declare class RentryClient {
    private token;
    private jar;
    constructor();
    createToken(): Promise<void>;
    useToken(token: string): void;
    getToken(): string;
    createPaste(options: IPasteCreatingOptions): Promise<IPasteStruct>;
    getPaste(id: string): Promise<string>;
    editPasteContent(id: string, password: string, newContent: string): void;
    editPasteEditCode(id: string, password: string, newEditCode: string): void;
    editPasteUrl(id: string, password: string, newUrl: string): void;
    deletePaste(id: string, password: string): void;
}
