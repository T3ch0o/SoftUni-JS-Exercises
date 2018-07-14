const appKey = 'kid_B1vv-Najz';
const appSecret = 'a40b665df0344e759ddeb0ecb1c05cb5';

const requestHandler = {
    login: function(payload) {
        return fetch(`https://baas.kinvey.com/user/${appKey}/login`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    register: function(payload) {
         return fetch(`https://baas.kinvey.com/user/${appKey}`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    logout: function() {
        return fetch(`https://baas.kinvey.com/user/${appKey}/_logout`, {
            method: 'POST',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
    },
    getPosts: function() {
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/posts?query={}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    },
    createPost: function(payload) {
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/posts?query={}&sort={"_kmd.ect": -1}`, {
            method: 'POST',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    getDetails: function(id) {
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/posts/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    },
    getComments: function(id) {
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/comments?query={"postId":"${id}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    },
    createComment: function(payload) {
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/comments`, {
            method: 'POST',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    }
};

export default requestHandler;