var Data = /** @class */ (function () {
    function Data(method, uri, version, message) {
        this.response = undefined;
        this.fulfielled = false;
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;
    }
    return Data;
}());
var myData = new Data('GET', 'http://google.com', 'HTTP/1.1', '');
console.log(myData);
