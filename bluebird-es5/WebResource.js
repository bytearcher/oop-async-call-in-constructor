var Promise = require('bluebird');
var request = require('request-promise');
var crypto = require('crypto');

function WebResource(url) {
    this.url = url;
}

WebResource.prototype.initialize = Promise.coroutine(function* () {
    if (!this.data) {
        this.data = yield request(this.url);
    }
});

WebResource.prototype.hash = Promise.coroutine(function* () {
    yield this.initialize();

    var hash = crypto.createHash('sha256');
    hash.update(this.data);
    return hash.digest('hex');
});

WebResource.prototype.contents = Promise.coroutine(function* () {
    yield this.initialize();

    return this.data;
});

Promise.coroutine(function* () {
    var google = new WebResource("http://google.com");

    var hash = yield google.hash();
    var contents = yield google.contents();

    console.log(`${hash} ${contents.substring(0, 50)}...`);
})();
