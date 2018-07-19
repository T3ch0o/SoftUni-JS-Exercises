class Data {
    private method : string;
    private uri : string;
    private version : string;
    private message : string;
    private response : string = undefined;
    private fulfielled : boolean = false;

    constructor(method, uri, version, message) {
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;
    }
}

let myData = new Data('GET', 'http://google.com', 'HTTP/1.1', '');
console.log(myData);