
/// <reference path="typings/main.d.ts"/>

import * as crypto from 'crypto';
import * as Promise from 'bluebird';
import request = require('request-promise');

class WebResource {

    private data: string;

    constructor(private url: string) {
    }

    private async initialize() {
        if (!this.data) {
            this.data = await request(this.url);
        }
    }

    async hash(): Promise<string> {
        await this.initialize();
        var hash = crypto.createHash('sha256');
        hash.update(this.data);
        return hash.digest('hex');
    }

    async contents(): Promise<string> {
        await this.initialize();
        return this.data;
    }
}

(async function () {

    var google = new WebResource('http://google.com');

    var hash = await google.hash();
    var contents = await google.contents();

    console.log(`${hash} ${contents.substring(0, 50)}...`);

})();
