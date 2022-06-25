import { CookieJar } from "request";
import { IPasteCreatingOptions } from "./features/IPasteCreatingOptions";
import { IPasteStruct } from "./features/IPasteStruct";
export declare function generateToken(jar: CookieJar): Promise<string>;
export declare function createPaste(jar: CookieJar, token: string, options: IPasteCreatingOptions): Promise<IPasteStruct>;
export declare function editPasteContent(jar: CookieJar, token: string, id: string, password: string, newContent: string): void;
export declare function editPasteContentAsync(jar: CookieJar, token: string, id: string, password: string, newContent: string): Promise<void>;
export declare function editPasteEditCode(jar: CookieJar, token: string, id: string, password: string, newEditCode: string): void;
export declare function editPasteUrl(jar: CookieJar, token: string, id: string, password: string, newUrl: string): void;
export declare function getPaste(id: string): Promise<string>;
export declare function deletePaste(jar: CookieJar, token: string, id: string, password: string): void;
