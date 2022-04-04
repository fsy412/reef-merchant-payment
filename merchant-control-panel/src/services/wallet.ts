import {CasperClient,CasperServiceByJsonRPC, CLPublicKey,DeployUtil } from "casper-js-sdk";

// Create Casper client and service to interact with Casper node.
const apiUrl = 'http://104.243.40.167:7777';
const casperService = new CasperServiceByJsonRPC(apiUrl);
const casperClient = new CasperClient(apiUrl);

export async function initWallet(){
    return {casperService, casperClient}
}