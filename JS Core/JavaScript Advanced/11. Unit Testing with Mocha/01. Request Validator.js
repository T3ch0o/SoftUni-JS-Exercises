function validateRequest(obj) {
    const validMethods = ['GET', 'POST', 'DELETE', 'CONNECT'];

    if (! (obj.method && validMethods.includes(obj.method))) {
        throw new Error('Invalid request header: Invalid Method');
    }

    let uriRegex = /^[\w.]+$/;

    if (!(obj.uri && ( uriRegex.test(obj.uri) || obj.uri === '*'))) {
        throw new Error('Invalid request header: Invalid URI');
    }

    const validVerisons = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];

    if (!(obj.version && validVerisons.includes(obj.version))) {
        throw new Error('Invalid request header: Invalid Version');
    }

    let messageRegex = /^[^<>\\&'"]*$/;

    if (!(obj.hasOwnProperty('message') && (messageRegex.test(obj.message) || obj.message === ''))) {
        throw new Error('Invalid request header: Invalid Message');
    }

    return obj;
}

validateRequest({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
});
