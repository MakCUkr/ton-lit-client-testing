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
const ton_lite_client_1 = require("ton-lite-client");
const core_1 = require("@ton/core");
function intToIP(int) {
    var part1 = int & 255;
    var part2 = ((int >> 8) & 255);
    var part3 = ((int >> 16) & 255);
    var part4 = ((int >> 24) & 255);
    return part4 + "." + part3 + "." + part2 + "." + part1;
}
let server = {
    "ip": 1097649206,
    "port": 29296,
    "id": {
        "@type": "pub.ed25519",
        "key": "p2tSiaeSqX978BxE5zLxuTQM06WVDErf5/15QToxMYA="
    }
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const engines = [];
        engines.push(new ton_lite_client_1.LiteSingleEngine({
            host: `tcp://${intToIP(server.ip)}:${server.port}`,
            publicKey: Buffer.from(server.id.key, 'base64'),
        }));
        const engine = new ton_lite_client_1.LiteRoundRobinEngine(engines);
        const client = new ton_lite_client_1.LiteClient({ engine });
        console.log('get master info');
        const master = yield client.getMasterchainInfo();
        console.log('master', master);
        const address = core_1.Address.parse('kQC2sf_Hy34aMM7n9f9_V-ThHDehjH71LWBETy_JrTirPIHa');
        const accountState = yield client.getAccountState(address, master.last);
        console.log('Account state:', accountState);
    });
}
main();
