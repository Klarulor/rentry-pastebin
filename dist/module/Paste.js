"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paste = void 0;
const RentryGateway_1 = require("./RentryGateway");
class Paste {
    constructor(link, editCode, content, client) {
        this.getLink = () => this.link;
        this.getEditCode = () => this.editCode;
        this.getContent = () => this.content;
        this.link = link;
        this.editCode = editCode;
        this.content = content;
        this.client = client;
    }
    setContent(newContent) {
        this.client.editPasteContent(this.link, this.editCode, newContent);
    }
    setContentAsync(newContent) {
        return new Promise((res) => __awaiter(this, void 0, void 0, function* () {
            yield this.client.editPasteContentAsync(this.link, this.editCode, newContent);
            res();
        }));
    }
    editEditCode(id, password, newEditCode) {
        this.client.editPasteEditCode(this.link, this.editCode, newEditCode);
    }
    editUrl(id, password, newUrl) {
        this.client.editPasteUrl(this.link, this.editCode, newUrl);
    }
    delete(id, password) {
        this.client.deletePaste(this.link, this.editCode);
    }
    pull() {
        return __awaiter(this, void 0, void 0, function* () {
            this.content = yield (0, RentryGateway_1.getPaste)(this.link);
        });
    }
    static fetch(client, link, editCode) {
        return new Promise((res) => __awaiter(this, void 0, void 0, function* () {
            const body = yield (0, RentryGateway_1.getPaste)(link);
            const paste = new Paste(link, editCode, body, client);
        }));
    }
}
exports.Paste = Paste;
//# sourceMappingURL=Paste.js.map