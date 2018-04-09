let remote = (() => {
    const baseUrl = 'https://baas.kinvey.com';
    const appKey = 'kid_rk3BuBBof';
    const appSecret = '2a646ff79baf4698a4a5ce888b43395a';

    function makeAuth(auth) {
        return auth === 'basic' ? `Basic ${btoa(`${appKey}:${appSecret}`)}` : `Kinvey ${localStorage.getItem('authtoken')}`
    }
    
    function makeRequest(method, module, endpoint, auth) {
        return {
            url: `${baseUrl}/${module}/${appKey}/${endpoint}`,
            method: method,
            headers: {
                'Authorization': makeAuth(auth),
                contentType: 'application/json'
            }
        }
    }

    function get(module, endpoint, auth) {
        return $.ajax(makeRequest('GET', module, endpoint, auth));
    }

    function post(module, endpoint, auth, data) {
        const obj = makeRequest('POST', module, endpoint, auth);
        if (data) {
            obj.data = data;
        }

        return $.ajax(obj);
    }
    
    function update(module, endpoint, auth, data) {
        const obj = makeRequest('PUT', module, endpoint, auth);
        if (data) {
            obj.data = data;
        }
        return $.ajax(obj);
    }

    function remove(module, endpoint, auth) {
        return $.ajax(makeRequest('DELETE', module, endpoint, auth));
    }

    return {
        get,
        post,
        update,
        remove
    }
})();