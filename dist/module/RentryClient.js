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
exports.RentryClient = void 0;
const RentryGateway_1 = require("./RentryGateway");
const Paste_1 = require("./Paste");
const url = 'https://rentry.co/';
const request = require('request');
class RentryClient {
    constructor() {
        this.jar = request.jar();
    }
    createToken() {
        return __awaiter(this, void 0, void 0, function* () {
            this.token = yield (0, RentryGateway_1.generateToken)(this.jar);
        });
    }
    useToken(token) {
        this.token = token;
    }
    getToken() {
        return this.token;
    }
    createPaste(options) {
        return new Promise((res) => __awaiter(this, void 0, void 0, function* () {
            const pair = yield (0, RentryGateway_1.createPaste)(this.jar, this.token, options);
            pair.paste = new Paste_1.Paste(pair.url, pair.editCode, options.content || "", this);
            res(pair);
        }));
    }
    getPaste(id) {
        return (0, RentryGateway_1.getPaste)(id);
    }
    editPasteContent(id, password, newContent) {
        (0, RentryGateway_1.editPasteContent)(this.jar, this.token, id, password, newContent);
    }
    editPasteEditCode(id, password, newEditCode) {
        (0, RentryGateway_1.editPasteEditCode)(this.jar, this.token, id, password, newEditCode);
    }
    editPasteUrl(id, password, newUrl) {
        (0, RentryGateway_1.editPasteUrl)(this.jar, this.token, id, password, newUrl);
    }
    deletePaste(id, password) {
        (0, RentryGateway_1.deletePaste)(this.jar, this.token, id, password);
    }
}
exports.RentryClient = RentryClient;
//# sourceMappingURL=RentryClient.js.map